/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
import type { Resolvers } from "./types.generated";
import { DemoItem } from "./demo/resolvers/DemoItem";
import { Mascot } from "./demo/resolvers/Mascot";
import { createMascot as Mutation_createMascot } from "./demo/resolvers/Mutation/createMascot";
import { greetings as Query_greetings } from "./demo/resolvers/Query/greetings";
export const resolvers: Resolvers = {
  Query: { greetings: Query_greetings },
  Mutation: {
    createMascot: Mutation_createMascot,
  },

  DemoItem: DemoItem,
  Mascot: Mascot,
};
