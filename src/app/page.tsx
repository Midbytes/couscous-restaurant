"use client";
import styles from "./page.module.scss";
import { useQuery } from "@tanstack/react-query";

async function getUsers() {
  return (await fetch("https://jsonplaceholder.typicode.com/users").then(
    (res) => res.json()
  )) as unknown[];
}

export default function Home() {
  const { data } = useQuery<unknown[]>({
    queryKey: ["stream-hydrate-users"],
    queryFn: () => getUsers(),
    staleTime: 5 * 1000,
  });

  console.log(data);

  return (
    <main className={styles.main}>
      <div> couscous</div>
    </main>
  );
}
