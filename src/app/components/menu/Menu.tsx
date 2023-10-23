import React from "react";
import { useGetFoodsQuery } from "./getFoods.rq.generated";
//import styles from "./menu.module.scss";

export default function Menu() {
  const { data } = useGetFoodsQuery();
  console.log(data);
  return <div>Menu</div>;
}
