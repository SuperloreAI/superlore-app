// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import "@/lib/secrets/secrets";
import type {
  AudioMetadata,
  MediaUpdateInterchangeVideoClip,
  VideoMetadata,
} from "@superlore/helpers/dist/types/asset-interchange.d.ts";
import { PrismaClient, Prisma } from "@prisma/client";
import { MediaAssetStatus } from "@/lib/db/types";

const prisma = new PrismaClient();

interface NextApiRequestUpdateAsset extends NextApiRequest {
  body: MediaUpdateInterchangeVideoClip;
}
export default async function handler(
  req: NextApiRequestUpdateAsset,
  res: NextApiResponse
) {
  const { id, thumbnail, metadata } = req.body;
  try {
    const updatedMediaAsset = await prisma.media_assets.update({
      where: { id },
      data: {
        thumbnail,
        status: MediaAssetStatus.READY,
        metadata: metadata as Prisma.JsonObject,
      },
    });
    console.log(updatedMediaAsset);
    res.status(200).json(updatedMediaAsset);
  } catch (error) {
    console.error("Error updating media asset:", error);
    res.status(500).json({ error: "Failed to update media asset" });
  }
}
