import "glider-js/glider.min.css";
import News from "./components/news";
import Delicacies from "./components/delicacies";
import Menu from "./components/menu/Menu";
import Navbar from "./components/navBar/Navbar";
import Reservation from "./components/reservation/Reservation";
import styles from "./page.module.scss";
import MeetUs from "./components/meetUs";

export default function Home() {
  return (
    <main className={styles.main}>
      <Navbar />
      <News />
      <MeetUs />
      <Reservation />
      <Menu />
      <Delicacies />
    </main>
  );
}
