import { CustomContext } from "@/pages/api/graphql";
import { QueryResolvers } from "../types/types.generated";

const greetings: QueryResolvers["greetings"] = (
  _parent: any,
  args: { input: string },
  _context: CustomContext,
  _info: any
) => `Greetings! You said ${args.input}`;

const salut: QueryResolvers["salut"] = (
  _parent: any,
  args: any,
  _context: CustomContext,
  _info: any
) => {
  return 1;
};

export const RootResolvers = {
  Query: {
    greetings,
    salut,
  },
};
