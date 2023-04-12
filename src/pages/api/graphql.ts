// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createYoga, createSchema } from "graphql-yoga";
import type { NextApiRequest, NextApiResponse } from "next";
import { typeDefs } from "@/lib/graphql/types/typeDefs.generated";
import { RootResolvers } from "@/lib/graphql/resolvers";

export interface CustomContext {
  req: NextApiRequest;
  res: NextApiResponse<any>;
}

export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
};

const schema = createSchema<CustomContext>({
  typeDefs,
  resolvers: RootResolvers,
});

export default createYoga<CustomContext>({
  schema,
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: "/api/graphql",
});
