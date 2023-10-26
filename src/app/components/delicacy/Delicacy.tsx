import React from "react";
import styles from "./delicacy.module.scss";
import { GetDelicaciesQuery } from "@/app/getDelicacies.rq.generated";
import DelicacyItem from "../delicacyItem/DelicacyItem";
import { Enum_Delicacy_Type } from "@/generated/graphql";

function Delicacy({
  type,
  data,
}: {
  type: Enum_Delicacy_Type | undefined;
  data: GetDelicaciesQuery | undefined;
}) {
  return (
    <ul className={styles.container}>
      <h3>{type}</h3>
      {data?.delicacies?.data.map(
        (item) =>
          type === item.attributes?.type && (
            <DelicacyItem
              name={item.attributes?.name}
              price={item.attributes?.price}
              description={item.attributes?.description}
              key={item.attributes?.index}
            />
          )
      )}
    </ul>
  );
}

export default Delicacy;
