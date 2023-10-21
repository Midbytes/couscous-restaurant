export const fetcher = <T, P>(query: String, variables?: P) => {
  // eslint-disable-next-line no-async-promise-executor
  const promise = new Promise(async (resolve, reject) => {
    try {
      const res = await fetch("https://couscous.up.railway.app/graphql", {
        method: "POST",
        headers: {
          authorization: `Bearer 99868a8183c6c85414164e0e714e74ad276a87497f314e5dee129b7f6cd9bc0438c477fb2cffc38150f48fb39ca55b2557a9a0481a53f5211272aded8924596383d7babb1956da7656c329ff0ee5a7aafd727c05e8c3a03e7b4c400f17086be3b16f656bebc04a34e7e0083618616899557273a1496c7925ab67043943f0519b`,
        },
        body: JSON.stringify({ query, variables }),
      });
      if (res.status !== 200) {
        throw new Error("An error happened!");
      }

      const json = await res.json();
      if (json.errors) {
        reject(new Error(JSON.stringify(json.errors)));

        resolve(json.data as T);
      }
    } catch (e) {
      reject(new Error(JSON.stringify(e)));
    }
  });
  return promise as T;
};

export const reactQueryFetcher =
  <T, P>(query: string, variables?: P) =>
  () =>
    fetcher<T, P>(query, variables);
