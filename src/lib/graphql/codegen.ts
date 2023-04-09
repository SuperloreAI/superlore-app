import type { CodegenConfig } from "@graphql-codegen/cli";
import { preset } from "@eddeee888/gcg-typescript-resolver-files";

const config: CodegenConfig = {
  schema: "src/lib/graphql/schemas/**/schema.graphql",
  generates: {
    "src/lib/graphql/types": {
      preset,
    },
  },
};
export default config;
