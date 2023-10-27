"use client";
import React, { useMemo } from "react";
import { GetFoodsQuery, useGetFoodsQuery } from "./getFoods.rq.generated";
import styles from "./menu.module.scss";
import { Enum_Food_Course } from "@/generated/graphql";
import { Unpacked } from "@/app/type/utils";
import { sortByOrder } from "@/app/utils/sortByOrder";
import { fixTitleFormat } from "@/app/utils/fixTitleFormat";
import { formatPrice } from "@/app/utils/formatPrice";

type Food = NonNullable<
  Unpacked<Unpacked<NonNullable<GetFoodsQuery["foods"]>>["data"]>["attributes"]
> & {
  id: string;
};

// Order of the sections
const order = [
  Enum_Food_Course.Starter,
  Enum_Food_Course.Main,
  Enum_Food_Course.Dessert,
  Enum_Food_Course.Alcohol,
  Enum_Food_Course.SoftDrink,
];

export default function Menu() {
  const { data } = useGetFoodsQuery();
  const { foods } = data ?? {};

  // Prevent useless runs of reduce for performance
  const courses = useMemo(
    () =>
      foods?.data.reduce<Record<Enum_Food_Course, Food[]>>(
        (courses, { attributes, id }) => {
          // Prevent adding null/undefined to array
          if (!attributes) return courses;

          const { course } = attributes;
          return {
            ...courses,
            [course]: [...(courses[course] || []), { id, ...attributes }],
          };
        },
        {} as Record<Enum_Food_Course, Food[]>
      ),
    [foods?.data]
  );
  // Unordered sections retrieved from graphQl request
  const sections = Object.keys(courses ?? []) as Array<Enum_Food_Course>;
  /* Reordering graphQL request sections, new sections that are not inside 
  the order array are placed at the end of the orderedSections array */
  const orderedSections = sortByOrder<Enum_Food_Course>(sections, order);

  return (
    <section className="container">
      <h2>Our Menu</h2>
      {courses && orderedSections.length > 0
        ? orderedSections.map((courseItem) => {
            return (
              <ul className={styles.foodList} key={courseItem}>
                <h3 className={styles.course}>{fixTitleFormat(courseItem)}</h3>
                {
                  // Sort foods by index: low index is higher on the list
                  // TODO : use utils fc (tried: sortByIndex(courses[courseItem], courseItem[i].index))
                  courses[courseItem]
                    .sort((a, b) =>
                      a.index && b.index ? (a.index >= b.index ? 1 : -1) : 0
                    )
                    .map(({ name, id, price, description }) => {
                      return (
                        <li key={id} className={styles.foodListItem}>
                          <span className={styles.foodListItemLeft}>
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
                    })
                }
              </ul>
            );
          })
        : ""}
    </section>
  );
}
