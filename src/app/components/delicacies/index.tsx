import React from "react";
import DelicaciesContent from "./Delicacies";
import { getDelicacies } from "./getDelicacies.rq.generated";
import { Locales } from "../../../../i18n.config";

export default async function Delicacies({ lang }: { lang: Locales }) {
  const data = await getDelicacies({ locale: lang });

  return <DelicaciesContent data={data} lang={lang} />;
}
