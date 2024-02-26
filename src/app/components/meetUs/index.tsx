import React from "react";
import MeetUsContent from "./MeetUs";
import { getAboutUs } from "./getAboutUs.rq.generated";
import { Locales } from "../../../../i18n.config";

export default async function MeetUs({ lang }: { lang: Locales }) {
  const data = await getAboutUs({ locale: lang });

  return <MeetUsContent data={data} />;
}
