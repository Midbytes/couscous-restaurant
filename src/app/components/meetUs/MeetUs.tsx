"use client";
import React from "react";
import styles from "./meetUs.module.scss";
import Image from "next/image";
import Section from "../section/Section";
import { GetAboutUsQuery } from "./getAboutUs.rq.generated";

function MeetUs({ data }: { data: GetAboutUsQuery }) {
  const res = data?.aboutUs?.data?.attributes;
  return (
    <article className={`${styles.container} container-row`} id="#meet">
      {res?.aboutUsDescription && res.title ? (
        <Section title={res.title} description={res.aboutUsDescription} />
      ) : (
        //TODO: Add loader
        ""
      )}
      <Image
        className={styles.meetUsImage}
        src={"/assets/couscous_illustration.webp"}
        alt="meetUs-picture"
        width={497}
        height={353}
      />
    </article>
  );
}

export default MeetUs;
