// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import "@/lib/secrets/secrets";
import { tokenizeWithCLIP } from "@/lib/ai/clip-vit";
import { queryPinecone } from "@/lib/ai/pinecone";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// POST /api/query-vectors/search-scenes
interface NextApiRequestQueryScenes extends NextApiRequest {
  body: {
    query: string;
  };
}
export default async function handler(
  req: NextApiRequestQueryScenes,
  res: NextApiResponse
) {
  const query = req.body.query;
  console.log("Querying scenes for: ", query);
  const vectors = await tokenizeWithCLIP({
    text_list: [query],
    image_list: [],
  });
  const { text_features } = vectors;
  const queryRes = await queryPinecone(text_features[0]);
  const scene_ids =
    queryRes.matches?.map((m) => (m.metadata as any).scene_id) || [];
  // console.log(scene_ids);
  const mediaAssets = await prisma.media_assets.findMany({
    where: {
      id: {
        in: scene_ids,
      },
    },
  });
  // console.log(mediaAssets);
  res.status(200).json(mediaAssets);
}
