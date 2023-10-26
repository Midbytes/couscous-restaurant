import React, { useState } from "react";
import styles from "./languageSelector.module.scss";

enum Locales {
  English = "en",
  Danish = "da",
}

export default function LanguageSelector() {
  // Temporary language setter
  const [language, setLanguage] = useState<Locales>(Locales.English);
  return (
    <span className={styles.lang}>
      <button
        className={language === Locales.Danish ? undefined : styles.inactive}
        onClick={() => setLanguage(Locales.Danish)}
      >
        DK
      </button>
      /
      <button
        className={language === Locales.English ? undefined : styles.inactive}
        onClick={() => setLanguage(Locales.English)}
      >
        EN
      </button>
    </span>
  );
}
