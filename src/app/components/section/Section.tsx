import React from "react";
import styles from "./section.module.scss";
import { SectionItem } from "@/app/type/sectionItem";

function Section({ title, description }: SectionItem) {
  return (
    <section className={styles.container}>
      <h2>{title}</h2>
      <p>{description}</p>
    </section>
  );
}

export default Section;
