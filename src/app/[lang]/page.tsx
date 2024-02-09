import News from "../components/news";
import Delicacies from "../components/delicacies";
import Menu from "../components/menu";
import Reservation from "../components/reservation/Reservation";
import styles from "./page.module.scss";
import MeetUs from "../components/meetUs";
import { Locales } from "../../../i18n.config";

export default function Home({
  params: { lang },
}: {
  params: { lang: Locales };
}) {
  return (
    <main className={styles.main}>
      <News lang={lang} />
      <MeetUs lang={lang} />
      <Reservation />
      <Menu lang={lang} />
      <Delicacies lang={lang} />
    </main>
  );
}
