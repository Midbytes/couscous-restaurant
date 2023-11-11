import News from "../components/news";
import Delicacies from "../components/delicacies";
import Menu from "../components/menu";
import Navbar from "../components/navBar/Navbar";
// import Reservation from "../components/reservation/Reservation";
import styles from "./page.module.scss";
import MeetUs from "../components/meetUs";
import { Locales } from "../../../i18n.config";
import { Gallery } from "../components/gallery/Gallery";

export default function Home({
  params: { lang },
}: {
  params: { lang: Locales };
}) {
  return (
    <main className={styles.main}>
      <Navbar lang={lang} />
      <News lang={lang} />
      <MeetUs lang={lang} />
      {/* <Reservation /> */}
      <Menu lang={lang} />
      <Gallery />
      <Delicacies lang={lang} />
    </main>
  );
}
