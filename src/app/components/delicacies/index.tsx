import React from "react";
import DelicaciesContent from "./Delicacies";
import { getDelicacies } from "./getDelicacies.rq.generated";

export default async function Delicacies() {
  const data = await getDelicacies();

  return <DelicaciesContent data={data} />;
}
