"use client";
import React, { useMemo, useRef } from "react";
import { GetFoodsQuery } from "./getFoods.rq.generated";
import styles from "./menu.module.scss";
import { Enum_Food_Course } from "@/generated/graphql";
import { Unpacked } from "@/app/types/utils";
import { fixTitleFormat } from "@/app/utils/fixTitleFormat";
import { formatPrice } from "@/app/utils/formatPrice";

type Food = NonNullable<
  Unpacked<Unpacked<NonNullable<GetFoodsQuery["foods"]>>["data"]>["attributes"]
> & {
  id: string;
};

export default function Menu({ data }: { data: GetFoodsQuery }) {
  const refId = useRef<HTMLElement>(null);

  const { foods, courseCategories } = data ?? {};

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

  if (!courses || !courseCategories?.data) return;
  if (courseCategories.data.length === 0) return;

  return (
    <section ref={refId} className="container" id="menu">
      <h2>Our Menu</h2>
      {courseCategories.data.map(({ attributes }) => {
        const { label, name, description } = attributes ?? {};
        if (!name) return;
        if (!courses[name]) return;

        return (
          <ul className={styles.foodList} key={name}>
            <h3>{label ?? fixTitleFormat(name)}</h3>
            {description && <h4 className={styles.subtitle}>{description}</h4>}
            {courses[name].map(({ name, id, price, description }) => {
              return (
                <li key={id} className={styles.foodListItem}>
                  <span className={styles.foodListItemLeft}>
                    <span className={styles.name}>{name}</span>
                    <span className={styles.description}>{description}</span>
                  </span>
                  <span className={styles.price}>{formatPrice(price)}</span>
                </li>
              );
            })}
          </ul>
        );
      })}
    </section>
  );
}
