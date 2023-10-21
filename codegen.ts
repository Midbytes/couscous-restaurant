import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: [
    {
      "https://couscous.up.railway.app/graphql": {
        headers: {
          authorization: `Bearer 99868a8183c6c85414164e0e714e74ad276a87497f314e5dee129b7f6cd9bc0438c477fb2cffc38150f48fb39ca55b2557a9a0481a53f5211272aded8924596383d7babb1956da7656c329ff0ee5a7aafd727c05e8c3a03e7b4c400f17086be3b16f656bebc04a34e7e0083618616899557273a1496c7925ab67043943f0519b`,
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
    "./src/": {
      documents: ["src/**/*.rq.graphql"],
      preset: "near-operation-file",
      presetConfig: {
        extension: ".generated.ts",
        baseTypesPath: "generated/graphql.ts",
      },
      config: {
        fetcher: "@/utils/fetcher#reactQueryFetcher",
        exposeQueryKeys: true,
      },
      plugins: ["typescript-operations", "typescript-react-query"],
    },
  },
};

export default config;
