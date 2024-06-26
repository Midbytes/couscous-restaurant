"use client";
import React, { useMemo, useRef } from "react";
import styles from "./delicacies.module.scss";
import { Enum_Delicacy_Type } from "@/generated/graphql";
import { Unpacked } from "@/app/types/utils";
import { fixTitleFormat } from "@/app/utils/fixTitleFormat";
import { sortByIndex } from "@/app/utils/sortByIndex";
import { GetDelicaciesQuery } from "./getDelicacies.rq.generated";
import { formatPrice } from "@/app/utils/formatPrice";
import { sortByOrder } from "@/app/utils/sortByOrder";

type DelicacyProps = NonNullable<
  Unpacked<NonNullable<GetDelicaciesQuery["delicacies"]>["data"]>["attributes"]
>;

const order = [
  Enum_Delicacy_Type.OliveOil,
  Enum_Delicacy_Type.Other,
  Enum_Delicacy_Type.Wine,
];

function Delicacies({ data }: { data: GetDelicaciesQuery }) {
  const refId = useRef<HTMLElement>(null);

  const { delicacies } = data ?? {};

  const delicacyTypes = useMemo(
    () =>
      delicacies?.data.reduce<Record<Enum_Delicacy_Type, DelicacyProps[]>>(
        (types, { attributes: delicacy }) => {
          if (!delicacy) return types;

          const { type } = delicacy;

          return {
            ...types,
            [type]: [...(types[type] || []), delicacy],
          };
        },
        {} as Record<Enum_Delicacy_Type, DelicacyProps[]>
      ),
    [delicacies?.data]
  );

  const sections = Object.keys(
    delicacyTypes ?? []
  ) as Array<Enum_Delicacy_Type>;

  const orderedSections = sortByOrder<Enum_Delicacy_Type>(sections, order);

  return (
    <section ref={refId} className="container" id="delicacies">
      <h2>Our Delicacies</h2>

      {delicacyTypes && orderedSections.length > 0
        ? orderedSections.map((typeItem) => {
            return (
              <ul className={styles.delicacyList} key={typeItem}>
                <h3 className={styles.type}>{fixTitleFormat(typeItem)}</h3>

                {sortByIndex(delicacyTypes[typeItem], "index").map(
                  ({ name, price, description, index }) => {
                    return (
                      <li key={index} className={styles.delicacyListItem}>
                        <span className={styles.delicacyListItemLeft}>
                          <span className={styles.name}>{name}</span>
                          <span className={styles.description}>
                            {description}
                          </span>
                        </span>
                        <span className={styles.price}>
                          {formatPrice(price)}
                        </span>
                      </li>
                    );
                  }
                )}
              </ul>
            );
          })
        : ""}
    </section>
  );
}
export default Delicacies;
