export const fetcher = async <T, P>(query: String, variables?: P) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_GRAPHQL_ENDPOINT || "",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_BEARER_TOKEN}`,
      },
      body: JSON.stringify({ query, variables }),
    }
  );

  if (res.status !== 200) {
    throw new Error("An error happened!");
  }

  const data: { data: T } = await res.json();

  return data.data;
};
