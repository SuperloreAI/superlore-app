/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
import type { Resolvers } from "./types.generated";
import { DemoItem } from "./demo/resolvers/DemoItem";
import { greetings as Query_greetings } from "./demo/resolvers/Query/greetings";
export const resolvers: Resolvers = {
  Query: { greetings: Query_greetings },
  DemoItem: DemoItem,
};
