import { CodegenConfig } from "@graphql-codegen/cli";
import "dotenv/config";

const config: CodegenConfig = {
  schema: process.env.STRAPI_GRAPHQL_ENDPOINT,
  ignoreNoDocuments: true,
  generates: {
    "src/generated/graphql.ts": {
      documents: ["!src/**/*.rq.graphql"],
      plugins: ["typescript"],
    },
    "src/": {
      documents: ["src/**/*.rq.graphql"],
      preset: "near-operation-file",
      presetConfig: {
        extension: ".generated.ts",
        baseTypesPath: "generated/graphql.ts",
      },
      config: {
        fetcher: "@/app/utils/fetcher#fetcher",
        isReactHook: false,
        exposeQueryKeys: true,
        exposeFetcher: true,
        scalars: {
          DateTime: "Date",
          Time: "string",
        },
      },
      plugins: ["typescript-operations", "typescript-react-query"],
    },
  },
};

export default config;
