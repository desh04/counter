"use client";
import { COUNT_OBJ } from "@/app/_constant";
import React from "react";

import styles from "./index.module.css";

type CountSection = {
  title: string;
};

export const CountSection = (props: CountSection) => {
  const { title } = props;

  const [count, setCount] = React.useState(
    Number(
      JSON.parse(
        window?.localStorage?.getItem?.(COUNT_OBJ) || `{"${title}": 0}`
      )?.[`${title}`] || 0
    )
  );

  const increase = () => {
    if (typeof window !== "undefined") {
      const newCount = count + 1;

      const countObj = JSON.parse(
        window.localStorage.getItem(COUNT_OBJ) || "{}"
      );

      countObj[`${title}`] = newCount;

      window.localStorage.setItem(COUNT_OBJ, JSON.stringify(countObj));
      setCount(newCount);
    }
  };

  const decrease = () => {
    if (typeof window !== "undefined") {
      const newCount = count - 1;

      const countObj = JSON.parse(
        window.localStorage.getItem(COUNT_OBJ) || "{}"
      );

      countObj[`${title}`] = newCount;

      window.localStorage.setItem(COUNT_OBJ, JSON.stringify(countObj));
      setCount(newCount);
    }
  };

  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <section className={styles.control}>
        <button className={styles.button} onClick={decrease}>
          -
        </button>
        {count}
        <button className={styles.button} onClick={increase}>
          +
        </button>
      </section>
    </div>
  );
};
