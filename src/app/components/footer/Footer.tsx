"use client";
import React from "react";
import styles from "./footer.module.scss";
import { useGetOpeningHoursQuery } from "@/app/utils/getOpeningHours.rq.generated";
import { useGetFooterQuery } from "./getFooter.rq.generated";

function Footer() {
  const { data: openingHours } = useGetOpeningHoursQuery();
  const { data: footer } = useGetFooterQuery();
  const address = footer?.footers?.data[0].attributes?.address;
  const phone = footer?.footers?.data[0].attributes?.phone;
  const email = footer?.footers?.data[0].attributes?.email;
  const start =
    openingHours?.openingHours?.data[0].attributes?.openingTime.slice(0, 2);
  const end = openingHours?.openingHours?.data[0].attributes?.closingTime.slice(
    0,
    2
  );
  const kitchenCloses =
    openingHours?.openingHours?.data[0].attributes?.kitchenCloses.slice(0, 5);

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <h3>Opening Hours</h3>
        <h4>Monday - Sunday</h4>
        <span>
          {start} - {end}
        </span>
        <h4>kitchen closes</h4>
        <span>{kitchenCloses}</span>
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
