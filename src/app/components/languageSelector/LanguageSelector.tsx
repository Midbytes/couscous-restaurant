"use client";
import React from "react";
import styles from "./languageSelector.module.scss";
import Link from "next/link";
import { Locales } from "../../../../i18n.config";

export default function LanguageSelector({ lang }: { lang: Locales }) {
  // Temporary language setter
  return (
    <span className={styles.lang}>
      <Link
        className={lang === Locales.Danish ? undefined : styles.inactive}
        href={`/${Locales.Danish}`}
      >
        DK
      </Link>
      /
      <Link
        className={lang === Locales.English ? undefined : styles.inactive}
        href={`/${Locales.English}`}
      >
        EN
      </Link>
    </span>
  );
}
