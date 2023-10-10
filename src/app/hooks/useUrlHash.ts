"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useUrlHash = (initialValue: string) => {
  const router = useRouter();
  const [hash, setHash] = useState(initialValue);

  const updateHash = (str: string) => {
    if (!str) return;
    setHash(str.split("#")[1]);
  };

  useEffect(() => {
    const onWindowHashChange = () => updateHash(window.location.hash);
    const onNextJSHashChange = (url: string) => updateHash(url);

    router.events.on("hashChangeStart", onNextJSHashChange);
    window.addEventListener("hashchange", onWindowHashChange);
    window.addEventListener("load", onWindowHashChange);
    return () => {
      router.events.off("hashChangeStart", onNextJSHashChange);
      window.removeEventListener("load", onWindowHashChange);
      window.removeEventListener("hashchange", onWindowHashChange);
    };
  }, [router.asPath, router.events]);

  return hash;
};
