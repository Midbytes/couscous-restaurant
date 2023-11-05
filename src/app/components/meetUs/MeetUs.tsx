import React from "react";
import styles from "./meetUs.module.scss";
import Image from "next/image";
import { MEET_US_SECTION_ITEM } from "@/app/constant/sectionItem";
import Section from "../section/Section";

function MeetUs() {
  return (
    <article className={styles.container} id="#meet">
      <h1 className={styles.img}>
        <Image
          src={"/assets/couscous_illustration.webp"}
          alt="meetUs-picture"
          width={497}
          height={353}
        />
      </h1>
      <div className={styles.text}>
        {" "}
        {MEET_US_SECTION_ITEM.map((item) => (
          <Section {...item} key={item.title} />
        ))}
      </div>
    </article>
  );
}

export default MeetUs;
