// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import "@/lib/secrets/secrets";
import type {
  AudioMetadata,
  MediaUpdateInterchangeVideoClip,
  MediaUpdateInterchangeVideoCreate,
  VideoMetadata,
} from "@superlore/helpers/dist/types/asset-interchange.d.ts";
import { PrismaClient, Prisma } from "@prisma/client";
import { MediaAssetStatus, MediaAssetType } from "@/lib/db/types";
import { SceneDetectBatchBody } from "@/lib/types/scene-detect";
import { encodeImageToBase64, tokenizeWithCLIP } from "@/lib/ai/clip-vit";
import { v4 as uuid } from "uuid";
import { saveToPinecone } from "@/lib/ai/pinecone";

const prisma = new PrismaClient();

interface NextApiRequestProcessScene extends NextApiRequest {
  body: SceneDetectBatchBody;
}
export default async function handler(
  req: NextApiRequestProcessScene,
  res: NextApiResponse
) {
  console.log("Hit the handler");
  const { title, top_folder_level, scenes } = req.body;
  try {
    const groupedScenes: Record<
      string,
      {
        sceneID: string;
        sceneVideo: string;
        frames: { id: string; url: string }[];
        originalVideo: { id: string; url: string };
      }
    > = {};
    scenes.forEach((scene) => {
      if (groupedScenes[scene.scene_asset_id]) {
        groupedScenes[scene.scene_asset_id].frames.push({
          id: scene.frame_asset_id,
          url: scene.frame_url,
        });
      } else {
        groupedScenes[scene.scene_asset_id] = {
          sceneID: scene.scene_asset_id,
          sceneVideo: scene.scene_url,
          frames: [{ id: scene.frame_asset_id, url: scene.frame_url }],
          originalVideo: {
            id: scene.original_asset_id,
            url: scene.original_asset_url,
          },
        };
      }
    });
    // save to postgres
    const updatedMediaAsset = await prisma.media_assets.createMany({
      data: Object.values(groupedScenes).map((gs) => ({
        id: uuid(), // gs.sceneID,
        title: `Scene ${gs.sceneID} from original video ${title} id=${gs.originalVideo.id}`,
        asset_type: MediaAssetType.VIDEO,
        url: gs.sceneVideo,
        status: MediaAssetStatus.READY,
        // notes: `Contains frames ${gs.frames
        //   .map((f) => f.id)
        //   .join(", ")} from ${title} located in folder ${top_folder_level}`,
      })),
    });
    // retreive vector embeddings
    await Promise.all(
      Object.values(groupedScenes).map(async (frame) => {
        const thumbnails = await Promise.all(
          frame.frames.map((f) => encodeImageToBase64(f.url))
        );
        const vectors = await tokenizeWithCLIP({
          text_list: [],
          image_list: thumbnails,
        });
        const { image_features } = vectors;
        const upsetVectors = frame.frames.map((f, idx) => {
          const kbbqData = {
            id: f.id,
            values: image_features[idx],
            metadata: {
              scene_id: frame.sceneID,
            },
          };
          return kbbqData;
        });
        await saveToPinecone(upsetVectors);
      })
    );

    //
    res.status(200).json(updatedMediaAsset);
  } catch (error) {
    console.error("Error updating media asset:", error);
    res.status(500).json({ error: "Failed to update media asset" });
  }
}
