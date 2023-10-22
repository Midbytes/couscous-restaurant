import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: [
    {
      [process.env.NEXT_PUBLIC_STRAPI_GRAPHQL_ENDPOINT || ""]: {
        headers: {
          authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_BEARER_TOKEN}`,
        },
      },
    },
  ],
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
        fetcher: "@/utils/fetcher#fetcher",
        isReactHook: false,
        exposeQueryKeys: true,
      },
      plugins: ["typescript-operations", "typescript-react-query"],
    },
  },
};

export default config;
