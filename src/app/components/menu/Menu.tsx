"use client";
import React from "react";
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
  const courses = foods?.data.reduce<Record<Enum_Food_Course, Food[]>>(
    (acc, { attributes: food }) => {
      if (!food) return acc;

      let { course: courseName } = food;

      return {
        ...acc,
        [courseName]: [...(acc[courseName] || []), food],
      };
    },
    {} as Record<Enum_Food_Course, Food[]>
  );

  return (
    <article>
      <h2>Our Menu</h2>
      <ul className={styles.foodList}>
        {courses
          ? (
              Object.keys(courses) as Array<
                (typeof Enum_Food_Course)[keyof typeof Enum_Food_Course]
              >
            ).map((courseItem) => {
              return (
                <li key={courseItem}>
                  <h3>{courseItem}</h3>
                  {courses[courseItem].map((food) => {
                    return (
                      <ul
                        key={courses[courseItem].indexOf(food)}
                        className={styles.foodListItem}
                      >
                        <span>
                          <li> {food.name} </li>
                          <li> {food.description} </li>
                        </span>
                        <li> {food.price},- </li>
                      </ul>
                    );
                  })}
                </li>
              );
            })
          : ""}
      </ul>
    </article>
  );
}
