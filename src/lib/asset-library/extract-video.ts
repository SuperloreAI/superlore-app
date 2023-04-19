import { MutationExtractVideoArgs } from "@/lib/graphql/types/types.generated";
import axios from "axios";
import { MediaAssetType } from "@/lib/db/types";
import { addMediaAsset } from "@/lib/db/operations";
import {
  placeholderAudioThumbnail,
  placeholderVideoThumbnail,
} from "@/lib/constants";

export const extractVideoGraphQL = async (args: MutationExtractVideoArgs) => {
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
      assetType: MediaAssetType.video,
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
      assetType: MediaAssetType.video,
      url: video.url,
      prompt: "",
      thumbnail: placeholderVideoThumbnail,
      metadata: {},
    };

    const audioToSave = {
      id: audio.id,
      title: `Audio ${audio.id}`,
      assetType: MediaAssetType.audio,
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
