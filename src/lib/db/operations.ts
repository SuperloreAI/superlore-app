import { getPool } from "@/lib/db/postgres";
import { MediaAssetStatus, MediaAssetType } from "@/lib/db/types";
import { initializePool } from "@/lib/db/postgres";

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
    "INSERT INTO media_assets (id, title, asset_type, url, prompt, thumbnail, metadata, archived, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)";
  const values = [
    id,
    title,
    assetType,
    url,
    prompt,
    thumbnail,
    metadata,
    false,
    MediaAssetStatus.PENDING,
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

export async function getMediaAsset(mediaAssetID: string) {
  await initializePool();
  const { pool } = getPool();
  const query = "SELECT * FROM media_assets WHERE id = $1";
  const values = [mediaAssetID];
  console.log(`getMediaAsset: ${mediaAssetID}`);
  console.log(query);
  try {
    const res = await pool.query(query, values);
    const mediaAsset = res.rows[0];
    console.log(`--- mediaAsset ---`);
    console.log(mediaAsset);
    if (!mediaAsset) {
      return null;
    }

    return {
      id: mediaAsset.id,
      title: mediaAsset.title,
      assetType: mediaAsset.asset_type,
      url: mediaAsset.url,
      prompt: mediaAsset.prompt,
      thumbnail: mediaAsset.thumbnail,
      metadata: mediaAsset.metadata,
      archived: mediaAsset.archived,
      createdAt: mediaAsset.created_at,
      updatedAt: mediaAsset.updated_at,
      status: mediaAsset.status,
    };
  } catch (err) {
    console.error("Error fetching media asset:", err);
    throw err;
  }
}
