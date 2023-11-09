import React from "react";
import MeetUsContent from "./MeetUs";
import { getAboutUs } from "./getAboutUs.rq.generated";

export default async function MeetUs() {
  const data = await getAboutUs();

  return <MeetUsContent data={data} />;
}
