import React from "react";
import Link from "next/link";
import styles from "./linkNavigation.module.scss";
//import useHash from "@/app/hooks/useHash";
import { NavItem } from "@/app/type/navItem";
import { useUrlHash } from "@/app/hooks/useUrlHash";

function LinkNavigation({ title, href }: NavItem) {
  //const hash = useHash();
  const hash = useUrlHash("");
  return (
    <li className={styles.link}>
      <Link href={href} className={hash?.includes(href) ? styles.active : ""}>
        {title}
      </Link>
    </li>
  );
}

export default LinkNavigation;
