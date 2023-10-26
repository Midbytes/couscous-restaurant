"use client";
import React, { useMemo } from "react";
import { GetFoodsQuery, useGetFoodsQuery } from "./getFoods.rq.generated";
import styles from "./menu.module.scss";
import { Enum_Food_Course } from "@/generated/graphql";
import { Unpacked } from "@/app/type/utils";

type Food = NonNullable<
  Unpacked<Unpacked<NonNullable<GetFoodsQuery["foods"]>>["data"]>["attributes"]
>;

export default function Menu() {
  const { data } = useGetFoodsQuery();
  const { foods } = data ?? {};

  // Prevent useless runs of reduce for performance
  const courses = useMemo(
    () =>
      foods?.data.reduce<Record<Enum_Food_Course, Food[]>>(
        (courses, { attributes: food }) => {
          // Prevent adding null/undefined to array
          if (!food) return courses;

          let { course } = food;

          return {
            ...courses,
            [course]: [...(courses[course] || []), food],
          };
        },
        {} as Record<Enum_Food_Course, Food[]>
      ),
    [foods?.data]
  );
  // Order of the sections
  const order = ["starter", "main", "dessert", "alcohol", "soft_drink"];
  // Unordered sections retrieved from graphQl request
  const sections = Object.keys(courses ?? []) as Array<Enum_Food_Course>;
  /* Reordering graphQL request sections, new sections that are not inside 
  the order array are placed at the end of the orderedSections array */
  const orderedSections = sections
    .sort((a, b) => {
      return order.indexOf(a) - order.indexOf(b);
    })
    .filter((section) => order.indexOf(section) > -1)
    .concat(sections.filter((section) => order.indexOf(section) == -1));

  return (
    <section className="container">
      <h2>Our Menu</h2>
      {courses && orderedSections.length > 0
        ? orderedSections.map((courseItem) => {
            return (
              <ul className={styles.foodList} key={courseItem}>
                <h3 className={styles.course}>
                  {
                    // Fix course formatting and make plural
                    courseItem.replace(/_/, " ") + "s"
                  }
                </h3>
                {
                  // Sort foods by index: low index is higher on the list
                  courses[courseItem]
                    .sort((a, b) =>
                      a.index && b.index ? (a.index >= b.index ? 1 : -1) : 0
                    )
                    .map((food) => {
                      return (
                        <li
                          key={courses[courseItem].indexOf(food)}
                          className={styles.foodListItem}
                        >
                          <span className={styles.foodListItemLeft}>
                            <span className={styles.name}>{food.name}</span>
                            <span className={styles.description}>
                              {food.description}
                            </span>
                          </span>
                          <span className={styles.price}>{food.price},-</span>
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
