import { MutationExtractVideoArgs } from "@/lib/graphql/types/types.generated";
import axios from "axios";
import {
  placeholderAudioThumbnail,
  placeholderVideoThumbnail,
} from "@/lib/constants";
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

export const extractVideoGQL = async (args: MutationExtractVideoArgs) => {
  const mediaManipulationServer = process.env.MEDIA_MANIPULATION_ENDPOINT;
  if (args.type === "YOUTUBE") {
    const endpoint = `${mediaManipulationServer}/extractor/youtube/video`;
    const response = await axios.post(endpoint, {
      url: args.url,
    });
    const { url, id } = response.data;
    const video = {
      id,
      title: `Video ${id}`,
      assetType: MediaAssetType.VIDEO,
      url,
      prompt: "",
      thumbnail: placeholderVideoThumbnail,
      metadata: {},
    };
    const mediaAssetID = await addMediaAsset(video);
    return [mediaAssetID];
  } else if (args.type === "TIKTOK") {
    const endpoint = `${mediaManipulationServer}/extractor/tiktok/video`;
    const response = await axios.post(endpoint, {
      url: args.url,
    });
    const { video, audio } = response.data;

    const videoToSave = {
      id: video.id,
      title: `Video ${video.id}`,
      assetType: MediaAssetType.VIDEO,
      url: video.url,
      prompt: "",
      thumbnail: placeholderVideoThumbnail,
      metadata: {},
    };

    const audioToSave = {
      id: audio.id,
      title: `Audio ${audio.id}`,
      assetType: MediaAssetType.AUDIO,
      url: audio.url,
      prompt: "",
      thumbnail: placeholderAudioThumbnail,
      metadata: {},
    };
    const [mediaAssetIDVideo, mediaAssetIDAudio] = await Promise.all([
      addMediaAsset(videoToSave),
      addMediaAsset(audioToSave),
    ]);
    return [mediaAssetIDVideo, mediaAssetIDAudio];
  }
};

interface QueryGetMediaAssetArgs {
  id: string;
}
export const getMediaAssetGQL = async (args: QueryGetMediaAssetArgs) => {
  const mediaAssetID = args.id;
  const mediaAsset = await getMediaAsset(mediaAssetID);

  if (!mediaAsset) {
    throw new Error("Media asset not found");
  }

  return {
    id: mediaAsset.id,
    title: mediaAsset.title,
    assetType: mediaAsset.assetType,
    url: mediaAsset.url,
    prompt: mediaAsset.prompt,
    thumbnail: mediaAsset.thumbnail,
    metadata: mediaAsset.metadata,
    archived: mediaAsset.archived,
    createdAt: mediaAsset.createdAt,
    updatedAt: mediaAsset.updatedAt,
    status: mediaAsset.status,
  };
};

export const clipVideo = async ({
  id,
  startTime,
  endTime,
  url,
}: {
  id: string;
  startTime: number;
  endTime: number;
  url: string;
}) => {
  console.log(`url=${url}`);
  const mediaManipulationServer = process.env.MEDIA_MANIPULATION_ENDPOINT;
  const response = await axios.post(
    `${mediaManipulationServer}/clipper/video`,
    {
      id,
      startTime,
      endTime,
      url,
    }
  );
  console.log(`----------- response.data`);
  console.log(response.data);
  if (response.status !== 200) {
    throw new Error(`Failed to clip video: ${response.statusText}`);
  }

  const video = {
    id: response.data.id,
    title: `Video ${id} clipped from ${id}`,
    assetType: MediaAssetType.VIDEO,
    url: response.data.url,
    prompt: "",
    thumbnail: placeholderVideoThumbnail,
    metadata: {},
  };
  await addMediaAsset(video);
  return response.data;
};
