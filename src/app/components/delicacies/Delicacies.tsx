import React from "react";
import styles from "./delicacies.module.scss";
import { useGetDelicaciesQuery } from "@/app/getDelicacies.rq.generated";
import Delicacy from "../delicacy/Delicacy";

function Delicacies() {
  const { data } = useGetDelicaciesQuery();
  console.log(data?.delicacies?.data);

  return (
    <article className={styles.container}>
      <h2> Our Delicacies</h2>
      <section className={styles.sections}>
        {data?.delicacies?.data.map((item) => (
          <Delicacy
            data={data}
            type={item.attributes?.type}
            key={Math.random() * 100}
          />
        ))}
      </section>
    </article>
  );
}

export default Delicacies;
