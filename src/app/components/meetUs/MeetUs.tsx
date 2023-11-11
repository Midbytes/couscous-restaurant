import React from "react";
import styles from "./meetUs.module.scss";
import Image from "next/image";
import Section from "../section/Section";
import { GetAboutUsQuery } from "./getAboutUs.rq.generated";
import meetUsImage from "../../../../public/assets/couscous_img.webp";

function MeetUs({ data }: { data: GetAboutUsQuery }) {
  const res = data?.aboutUs?.data?.attributes;
  return (
    <section className={styles.wrapper}>
      <article className={`${styles.container} container-row`} id="#meet">
        {res?.aboutUsDescription && res.title ? (
          <Section title={res.title} description={res.aboutUsDescription} />
        ) : (
          //TODO: Add loader
          ""
        )}
        <Image
          className={styles.meetUsImage}
          src={meetUsImage}
          width={450}
          alt="meetUs-picture"
        />
      </article>
    </section>
  );
}

export default MeetUs;
