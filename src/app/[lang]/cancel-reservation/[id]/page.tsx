import React from "react";
import Cancel from "@/app/components/cancelReservation/CancelReservation";
import styles from "./page.module.scss";

export default function CancelReservation({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <section className={styles.container}>
      <Cancel id={id} />
    </section>
  );
}
