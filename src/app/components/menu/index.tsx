import React from "react";
import MenuContent from "./Menu";
import { getFoods } from "./getFoods.rq.generated";

export default async function Menu() {
  const data = await getFoods();

  return <MenuContent data={data} />;
}
