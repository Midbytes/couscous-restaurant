"use client";
import React from "react";
import styles from "./navBar.module.scss";
import Image from "next/image";
import { NAV_ITEM } from "@/app/constant/navItem";
import LinkNavigation from "../link/LinkNavigation";

function Navbar() {
  return (
    <header className={styles.container}>
      <h1 className={styles.logos}>
        <Image
          src="/assets/logo.svg"
          alt="logo of le couscous restaurant"
          width={64}
          height={39}
        />
        <span>Couscous</span>
      </h1>
      <nav className={styles.links}>
        <ul>
          {NAV_ITEM.map((item) => (
            <LinkNavigation {...item} key={item.href} />
          ))}
        </ul>
      </nav>
      <div>DK/EN</div>
    </header>
  );
}

export default Navbar;
