"use client";
import React from "react";
import styles from "./linkNavigation.module.scss";
import useHash from "@/app/hooks/useHash";
import { NavItem } from "@/app/type/navItem";

function LinkNavigation({
  label,
  href,
}: {
  href: NavItem["href"];
  label: string;
}) {
  const hash = useHash();

  return (
    <li className={styles.link}>
      <a
        href={href}
        className={href?.includes(hash || " ") ? styles.active : ""}
      >
        {label}
      </a>
    </li>
  );
}

export default LinkNavigation;
