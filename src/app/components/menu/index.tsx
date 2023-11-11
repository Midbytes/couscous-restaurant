import React from "react";
import MenuContent from "./Menu";
import { getFoods } from "./getFoods.rq.generated";

export default async function Menu({ lang }: { lang: "da" | "en" }) {
  const data = await getFoods({ locale: lang });

  return <MenuContent data={data} />;
}
