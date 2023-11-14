import React from "react";
import NewsContent from "./News";
import { getNews } from "./getNews.rq.generated";
import { Locales } from "../../../../i18n.config";

export default async function News({ lang }: { lang: Locales }) {
  const data = await getNews({ locale: lang });

  return <NewsContent data={data} />;
}
