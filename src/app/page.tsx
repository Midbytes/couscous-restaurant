"use client";
import LandingPage from "./components/landingPage/LandingPage";
import Navbar from "./components/navBar/Navbar";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <Navbar />
      <LandingPage />
    </main>
  );
}
