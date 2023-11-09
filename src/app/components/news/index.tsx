import React from "react";
import NewsContent from "./News";
import { getNews } from "./getNews.rq.generated";

export default async function News() {
  const data = await getNews();

  return <NewsContent data={data} />;
}
