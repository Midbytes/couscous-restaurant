import News from "../components/news";
import Delicacies from "../components/delicacies";
import Menu from "../components/menu";
import Reservation from "../components/reservation/Reservation";
import styles from "./page.module.scss";
import MeetUs from "../components/meetUs";
import { Locales } from "../../../i18n.config";
import Footer from "../components/footer/Footer";

export default function Home({
  params: { lang },
}: {
  params: { lang: Locales };
}) {
  return (
    <main className={styles.main}>
      <News lang={lang} />
      <MeetUs lang={lang} />
      <Menu lang={lang} />
      <Reservation />
      <Delicacies lang={lang} />
      <Footer />
    </main>
  );
}
