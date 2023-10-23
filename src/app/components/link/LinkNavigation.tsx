import React from "react";
import styles from "./linkNavigation.module.scss";
import useHash from "@/app/hooks/useHash";
import { NavItem } from "@/app/type/navItem";

function LinkNavigation({ title, href }: NavItem) {
  const hash = useHash();

  return (
    <li className={styles.link}>
      <a
        href={href}
        className={href?.includes(hash || " ") ? styles.active : ""}
      >
        {title}
      </a>
    </li>
  );
}

export default LinkNavigation;
