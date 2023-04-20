// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createYoga, createSchema } from "graphql-yoga";
import type { NextApiRequest, NextApiResponse } from "next";
import { typeDefs } from "@/lib/graphql/types/typeDefs.generated";
import {
  MutationExtractVideoArgs,
  QueryGetMediaArgs,
  VideoType,
} from "@/lib/graphql/types/types.generated";
import {
  clipVideo,
  extractVideoGQL,
  getMediaAssetGQL,
  listMedia,
  updateMediaAsset,
} from "@/lib/graphql/schemas/assets/extract-video";

interface CustomContext {
  req: NextApiRequest;
  res: NextApiResponse<any>;
}

export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
};

const resolvers = {
  Query: {
    greetings: (
      _parent: any,
      args: { input: string },
      _context: CustomContext,
      _info: any
    ) => `Greetings! You said ${args.input}`,
    getMedia: (
      _parent: any,
      args: QueryGetMediaArgs,
      _context: CustomContext,
      _info: any
    ) => getMediaAssetGQL(args),
    listMedia: (
      _parent: any,
      args: { searchString: string; limit: number; cursorStart: string },
      _context: CustomContext,
      _info: any
    ) => listMedia(args.searchString, args.limit, args.cursorStart),
  },
  Mutation: {
    createMascot: (
      _parent: any,
      args: { name: string },
      _context: CustomContext,
      _info: any
    ) => ({
      id: "DemoMascot",
      name: args.name,
    }),
    extractVideo: (
      _parent: any,
      args: MutationExtractVideoArgs,
      _context: CustomContext,
      _info: any
    ) => {
      console.log(`---- extractVideoGQL ----`);
      const ids = extractVideoGQL(args);
      return ids;
    },
    clipVideo: async (
      _: any,
      {
        id,
        startTime,
        endTime,
        url,
        title,
      }: {
        id: string;
        startTime: number;
        endTime: number;
        url: string;
        title: string;
      }
    ) => {
      console.log(`from GQL url=${url}`);
      const clippedVideoData = await clipVideo({
        id,
        startTime,
        endTime,
        url,
        title,
      });
      return clippedVideoData;
    },
    updateMedia: async (
      _parent: any,
      args: { id: string; title: string; notes: string },
      _context: CustomContext,
      _info: any
    ) => {
      const { id, title, notes } = args;
      const updatedMedia = await updateMediaAsset({ id, title, notes });
      return updatedMedia.id;
    },
  },
  Media: {
    metadata(parent: any, _args: any, _context: CustomContext, _info: any) {
      if (parent.metadata.videoCodec || parent.metadata.frameRate) {
        return { ...parent.metadata, __typename: "VideoMetadata" };
      }

      if (parent.metadata.audioCodec) {
        return { ...parent.metadata, __typename: "AudioMetadata" };
      }

      return null;
    },
  },

  MediaMetadata: {
    __resolveType(obj: any, _context: CustomContext, _info: any) {
      if (obj.videoCodec || obj.frameRate) {
        return "VideoMetadata";
      }

      if (obj.audioCodec) {
        return "AudioMetadata";
      }

      return null;
    },
  },
};

const schema = createSchema<CustomContext>({
  typeDefs,
  resolvers,
});

export default createYoga<CustomContext>({
  schema,
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: "/api/graphql",
});
