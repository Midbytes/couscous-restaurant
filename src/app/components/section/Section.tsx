import React from "react";
import styles from "./section.module.scss";
import { SectionItem } from "@/app/type/sectionItem";

function Section({ title, description }: SectionItem) {
  return (
    <section className={styles.container}>
      <div className={styles.text}>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
}

export default Section;
