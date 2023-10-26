import { DelicacyProps } from "@/app/type/unpacked";
import React from "react";
import styles from "./delicacyItem.module.scss";

function DelicacyItem({
  name,
  description,
  price,
}: {
  name: NonNullable<DelicacyProps>["name"] | undefined;
  description: NonNullable<DelicacyProps>["description"];
  price: NonNullable<DelicacyProps>["price"] | undefined;
}) {
  return (
    <li className={styles.container}>
      <div className={styles.item}>
        <span>{name}</span>
        <span>{description}</span>
      </div>
      <span>{price}</span>
    </li>
  );
}

export default DelicacyItem;
