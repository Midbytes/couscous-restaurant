import React from "react";
import styles from "./meetUs.module.scss";
import Image from "next/image";
import { MEET_US_SECTION_ITEM } from "@/app/constant/sectionItem";
import Section from "../section/Section";

function MeetUs() {
  return (
    <article className={`${styles.container} container-row`} id="#meet">
      <div className={styles.text}>
        {" "}
        {MEET_US_SECTION_ITEM.map((item) => (
          <Section {...item} key={item.title} />
        ))}
      </div>
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
