import React from "react";
import styles from "./navBar.module.scss";
import { NAV_ITEM } from "@/app/constant/navItem";
import LinkNavigation from "../link/LinkNavigation";
import LanguageSelector from "../languageSelector/LanguageSelector";
import { Locales } from "../../../../i18n.config";

function Navbar({ lang }: { lang: Locales }) {
  return (
    <header className={styles.container}>
      <h1 className={styles.logos}>
        <span>Le Couscous</span>
      </h1>
      <nav className={styles.links}>
        <ul>
          {NAV_ITEM.map(({ href, label }) => (
            <LinkNavigation href={href} label={label[lang]} key={href} />
          ))}
        </ul>
      </nav>
      <LanguageSelector lang={lang} />
    </header>
  );
}

export default Navbar;
