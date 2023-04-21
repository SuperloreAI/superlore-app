// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import "@/lib/secrets/secrets";
import type {
  AudioMetadata,
  MediaUpdateInterchangeAudioClip,
  MediaUpdateInterchangeAudioCreate,
  MediaUpdateInterchangeVideoClip,
  MediaUpdateInterchangeVideoCreate,
  VideoMetadata,
} from "@superlore/helpers/dist/types/asset-interchange.d.ts";
import { PrismaClient, Prisma } from "@prisma/client";
import { MediaAssetStatus } from "@/lib/db/types";

const prisma = new PrismaClient();

interface NextApiRequestUpdateAsset extends NextApiRequest {
  body: MediaUpdateInterchangeAudioCreate | MediaUpdateInterchangeAudioClip;
}
function isMediaUpdateInterchangeAudioCreate(
  obj: any
): obj is MediaUpdateInterchangeAudioCreate {
  return "title" in obj;
}
export default async function handler(
  req: NextApiRequestUpdateAsset,
  res: NextApiResponse
) {
  const { id, thumbnail, metadata } = req.body;
  try {
    const data = {
      thumbnail,
      status: MediaAssetStatus.READY,
      metadata: metadata as Prisma.JsonObject,
    };
    if (isMediaUpdateInterchangeAudioCreate(req.body)) {
      const { title, notes } = req.body;
      // @ts-ignore
      if (title) data.title = title;
    }
    const updatedMediaAsset = await prisma.media_assets.update({
      where: { id },
      data,
    });
    res.status(200).json(updatedMediaAsset);
  } catch (error) {
    console.error("Error updating media asset:", error);
    res.status(500).json({ error: "Failed to update media asset" });
  }
}
