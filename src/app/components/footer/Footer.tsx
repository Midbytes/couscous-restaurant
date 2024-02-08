"use client";
import React from "react";
import styles from "./footer.module.scss";
import { useGetOpeningHoursQuery } from "@/app/utils/getOpeningHours.rq.generated";
import { useGetFooterQuery } from "./getFooter.rq.generated";
import { getRestaurantStatus } from "@/app/utils/getRestaurantStatus";
import dayjs from "dayjs";

function Footer() {
  const { data: openingHours } = useGetOpeningHoursQuery();
  const { data: footer } = useGetFooterQuery();
  const { address, phone, email } = footer?.footers?.data[0].attributes ?? {};

  const today = dayjs().format("dddd");
  const todayRestaurantStatus =
    openingHours?.openingHours?.data.filter(
      (item) => today === item.attributes?.day
    ) ?? [];

  const status = getRestaurantStatus(todayRestaurantStatus);

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <h3>Opening Hours</h3>
        <h4>{today}</h4>
        {status}
      </div>
      <div className={styles.wrapper}>
        <h3>Address </h3>
        <span>{address}</span>
        <h4>Telephone </h4>
        <span>{phone}</span>
        <h4>e-mail</h4>
        <span>{email}</span>
      </div>
    </section>
  );
}

export default Footer;
