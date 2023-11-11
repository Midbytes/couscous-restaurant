import React from "react";
import MenuContent from "./Menu";
import { getFoods } from "./getFoods.rq.generated";
import { Locales } from "../../../../i18n.config";

export default async function Menu({ lang }: { lang: Locales }) {
  const data = await getFoods({ locale: lang });

  return <MenuContent data={data} />;
}
