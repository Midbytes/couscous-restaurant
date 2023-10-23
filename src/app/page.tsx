"use client";
import LandingPage from "../components/landingPage/LandingPage";
import MeetUs from "../components/meetUs/MeetUs";
import Navbar from "../components/navBar/Navbar";
import { useGetFoodsQuery } from "./getFoods.rq.generated";
import styles from "./page.module.scss";

export default function Home() {
  const { data } = useGetFoodsQuery();
  console.log(data);
  return (
    <main className={styles.main}>
      <Navbar />
      <LandingPage />
      <MeetUs />
    </main>
  );
}
