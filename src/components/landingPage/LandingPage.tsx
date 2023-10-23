import React from "react";
import styles from "./landingPage.module.scss";
import { NEWS_SECTION_ITEM } from "@/constants/sectionItem";
import Section from "../section/Section";
import Image from "next/image";

function LandingPage() {
  return (
    <article className={styles.container}>
      <h1 className={styles.img}>
        <Image
          src={"/assets/landingPicture.svg"}
          alt="landing-picture"
          width={1440}
          height={548}
        />
      </h1>
      <div className={styles.text}>
        {" "}
        {NEWS_SECTION_ITEM.map((item) => (
          <Section {...item} key={item.title} />
        ))}
      </div>
    </article>
  );
}

export default LandingPage;
