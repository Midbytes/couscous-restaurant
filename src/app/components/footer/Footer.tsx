"use client";
import React from "react";
import styles from "./footer.module.scss";
import { useGetOpeningHoursQuery } from "@/app/utils/getOpeningHours.rq.generated";
import { useGetFooterQuery } from "./getFooter.rq.generated";

type Opening = Record<string, string[]>;

function Footer() {
  const { data: openingHours } = useGetOpeningHoursQuery();
  const { data: footerQueries } = useGetFooterQuery();
  const { address, phone, email } =
    footerQueries?.footers?.data[0].attributes ?? {};

  const groupedByOpeningTime = openingHours?.openingHours?.data.reduce<Opening>(
    (openings, { attributes }) => {
      const { openingTime, closingTime, day, open } = attributes ?? {};

      if (!day || !openingTime || !closingTime) return openings;

      if (!open) {
        if (openings?.closed)
          return { ...openings, Closed: [...openings.closed, day] };

        return { ...openings, Closed: [day] };
      }

      const key = `${openingTime.slice(0, 5)}-${closingTime.slice(0, 5)}`;

      if (openings?.[key]) {
        return {
          ...openings,
          [key]: [...openings[key], day],
        };
      }

      return {
        ...openings,
        [key]: [day],
      };
    },
    {}
  );

  return (
    <footer className={styles.footer}>
      <section className={styles.container}>
        <div className={styles.wrapper}>
          <h3>Opening Hours</h3>
          {Object.entries(groupedByOpeningTime ?? {}).map(([key, value]) => (
            <li className={styles.list} key={key}>{`${value.join(
              ", "
            )} : ${key}`}</li>
          ))}
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
    </footer>
  );
}

export default Footer;
