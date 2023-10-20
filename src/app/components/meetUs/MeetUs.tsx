import React from "react";
import styles from "./meetUs.module.scss";
import Image from "next/image";
import { MEETUS_SECTION_ITEM } from "@/app/constant/sectionItem";
import Section from "../section/Section";

function MeetUs() {
  return (
    <article className={styles.container} id="#meet">
      <h1 className={styles.img}>
        <Image
          src={"/assets/meetUsPicture.svg"}
          alt="meetUs-picture"
          width={497}
          height={353}
        />
      </h1>
      <div className={styles.text}>
        {" "}
        {MEETUS_SECTION_ITEM.map((item) => (
          <Section {...item} key={item.title} />
        ))}
      </div>
    </article>
  );
}

export default MeetUs;
