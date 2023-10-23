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
  const arr = foods?.data.reduce<Record<Enum_Food_Course, Food[]>>(
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
  console.log(arr);
  return (
    <article>
      <h2>Our Menu</h2>
      <ul className={styles.foodList}>
        {foods?.data.map((food) => {
          return (
            //
            <ul key={foods.data.indexOf(food)} className={styles.foodListItem}>
              <span>
                <li>{food.attributes?.name}</li>
                <li>{food.attributes?.description}</li>
              </span>
              <li>{food.attributes?.price},-</li>
            </ul>
          );
        })}
      </ul>
    </article>
  );
}
