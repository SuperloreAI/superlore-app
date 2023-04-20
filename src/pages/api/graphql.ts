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
      }: { id: string; startTime: number; endTime: number; url: string }
    ) => {
      console.log(`from GQL url=${url}`);
      const clippedVideoData = await clipVideo({ id, startTime, endTime, url });
      return clippedVideoData;
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
