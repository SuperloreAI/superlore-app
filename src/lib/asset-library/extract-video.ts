import { MutationExtractVideoArgs } from "@/lib/graphql/types/types.generated";
import axios from "axios";

export const extractVideoGraphQL = async (args: MutationExtractVideoArgs) => {
  const mediaManipulationServer = process.env.MEDIA_MANIPULATION_ENDPOINT;
  if (args.type === "YOUTUBE") {
    const endpoint = `${mediaManipulationServer}/extractor/youtube/video`;
    const response = await axios.post(endpoint, {
      url: args.url,
    });
    const { url, id } = response.data;
    // save to postgres with status=pending
  } else if (args.type === "TIKTOK") {
    const endpoint = `${mediaManipulationServer}/extractor/tiktok/video`;
    const response = await axios.post(endpoint, {
      url: args.url,
    });
    const { video, audio } = response.data;
    // save to postgres with status=pending
  }
};
