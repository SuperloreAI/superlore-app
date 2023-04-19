// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createYoga, createSchema } from "graphql-yoga";
import type { NextApiRequest, NextApiResponse } from "next";
import { typeDefs } from "@/lib/graphql/types/typeDefs.generated";
import {
  MutationExtractVideoArgs,
  VideoType,
} from "@/lib/graphql/types/types.generated";
import { extractVideoGraphQL } from "@/lib/asset-library/extract-video";

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
    ) => extractVideoGraphQL(args),
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
