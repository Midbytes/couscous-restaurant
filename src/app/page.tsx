"use client";
import "glider-js/glider.min.css";
import LandingPage from "./components/landingPage/LandingPage";
import MeetUs from "./components/meetUs/MeetUs";
import Menu from "./components/menu/Menu";
import Navbar from "./components/navBar/Navbar";
import Reservation from "./components/reservation/Reservation";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <Navbar />
      <LandingPage />
      <MeetUs />
      <Reservation />
      <Menu />
    </main>
  );
}
