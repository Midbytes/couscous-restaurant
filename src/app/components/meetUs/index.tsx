import React from "react";
import MeetUsContent from "./MeetUs";
import { getAboutUs } from "./getAboutUs.rq.generated";

export default async function MeetUs({ lang }: { lang: "da" | "en" }) {
  const data = await getAboutUs({ locale: lang });

  return <MeetUsContent data={data} />;
}
