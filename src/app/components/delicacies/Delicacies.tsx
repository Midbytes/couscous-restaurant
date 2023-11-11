"use client";
import React, { useMemo } from "react";
import styles from "./delicacies.module.scss";
import { Enum_Delicacy_Type } from "@/generated/graphql";
import { Unpacked } from "@/app/type/utils";
import { fixTitleFormat } from "@/app/utils/fixTitleFormat";
import { sortByIndex } from "@/app/utils/sortByIndex";
import { GetDelicaciesQuery } from "./getDelicacies.rq.generated";
import { formatPrice } from "@/app/utils/formatPrice";
import { sortByOrder } from "@/app/utils/sortByOrder";
import { getSectionLabel } from "@/app/utils/getSectionLabel";
import { Locales } from "../../../../i18n.config";

type DelicacyProps = NonNullable<
  Unpacked<NonNullable<GetDelicaciesQuery["delicacies"]>["data"]>["attributes"]
>;

const order = [
  Enum_Delicacy_Type.OliveOil,
  Enum_Delicacy_Type.Other,
  Enum_Delicacy_Type.Wine,
];

const id = "delicacies";

function Delicacies({
  data,
  lang,
}: {
  data: GetDelicaciesQuery;
  lang: Locales;
}) {
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
    <section id={id} className="container">
      <h2>{getSectionLabel(id, lang)}</h2>

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
