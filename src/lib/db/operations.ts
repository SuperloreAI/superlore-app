import { getPool } from "@/lib/db/postgres";
import { MediaAssetType } from "@/lib/db/types";
import { initializePool } from "@/lib/db/postgres";

// let isDatabasePoolInitialized = false;

// (async () => {
//   console.log(`isDatabasePoolInitialized=${isDatabasePoolInitialized}`);
//   if (!isDatabasePoolInitialized) {
//     await initializePool();
//     isDatabasePoolInitialized = true;
//   }
// })();

interface AddMediaAssetProps {
  id: string;
  title: string;
  assetType: MediaAssetType;
  url: string;
  prompt: string;
  thumbnail: string;
  metadata: object;
}
export async function addMediaAsset(args: AddMediaAssetProps) {
  await initializePool();
  const { id, title, assetType, url, prompt, thumbnail, metadata } = args;
  const { pool } = getPool();
  const query =
    "INSERT INTO media_assets (id, title, asset_type, url, prompt, thumbnail, metadata, archived) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
  const values = [
    id,
    title,
    assetType,
    url,
    prompt,
    thumbnail,
    metadata,
    false,
  ];
  try {
    const res = await pool.query(query, values);
    const insertedRow = res.rows[0];
    console.log(insertedRow);
    return id;
  } catch (err) {
    console.error("Error inserting media asset:", err);
    throw err;
  }
}
