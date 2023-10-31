"use client";
import React, { useMemo } from "react";
import styles from "./delicacies.module.scss";
import { Enum_Delicacy_Type } from "@/generated/graphql";
import { Unpacked } from "@/app/type/utils";
import { fixTitleFormat } from "@/app/utils/fixTitleFormat";
import { sortByIndex } from "@/app/utils/sortByIndex";
import {
  GetDelicaciesQuery,
  useGetDelicaciesQuery,
} from "@/app/getDelicacies.rq.generated";
//import { sortByOrder } from "@/app/utils/sortByOrder";

type DelicacyProps = NonNullable<
  Unpacked<NonNullable<GetDelicaciesQuery["delicacies"]>["data"]>["attributes"]
>;

function Delicacies() {
  const { data } = useGetDelicaciesQuery();
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

  const order = ["wine", "olive_oil", "other"];

  const sections = Object.keys(
    delicacyTypes ?? []
  ) as Array<Enum_Delicacy_Type>;

  // const orderedSections =sortByOrder(sections,order);
  const orderedSections = sections
    .sort((a, b) => {
      return order.indexOf(a) - order.indexOf(b);
    })
    .filter((section) => order.indexOf(section) > -1)
    .concat(sections.filter((section) => order.indexOf(section) == -1));

  return (
    <section className="container">
      <h2>Our Delicacies</h2>

      {delicacyTypes && orderedSections.length > 0
        ? orderedSections.map((typeItem) => {
            return (
              <ul className={styles.delicacyList} key={typeItem}>
                <h3 className={styles.type}>{fixTitleFormat(typeItem)}</h3>

                {sortByIndex(delicacyTypes[typeItem], "index").map(
                  (delicacy) => {
                    return (
                      <li
                        key={delicacyTypes[typeItem].indexOf(delicacy)}
                        className={styles.delicacyListItem}
                      >
                        <span className={styles.delicacyListItemLeft}>
                          <span className={styles.name}>{delicacy.name}</span>
                          <span className={styles.description}>
                            {delicacy.description}
                          </span>
                        </span>
                        <span className={styles.price}>{delicacy.price},-</span>
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
