"use client";

import React from "react";
import { COUNT_OBJ } from "@/app/_constant";
import { CountSection } from "../CountSection/CountSection";
import styles from "./index.module.css";

export const Page = () => {
  const [newField, setNewField] = React.useState("");
  const [_field, _setField] = React.useState(
    typeof window !== "undefined"
      ? JSON.parse(window.localStorage.getItem(COUNT_OBJ) || "{}")
      : {}
  );

  const setField = (name: string) => {
    if (typeof window !== "undefined") {
      // Getting value
      const currCountObj = JSON.parse(
        window.localStorage.getItem(COUNT_OBJ) || "{}"
      );

      // Adding new field
      currCountObj[`${name}`] = 0;

      // setting
      window.localStorage.setItem(COUNT_OBJ, JSON.stringify(currCountObj));
      _setField(currCountObj);
    }
  };

  const fieldArr = React.useMemo(() => Object.keys(_field), [_field]);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.addSection}>
          <input
            style={{ fontSize: "1.25rem" }}
            type="text"
            id="field"
            value={newField}
            onChange={(e) => {
              setNewField(e.target.value);
            }}
          />
          <button
            style={{
              fontSize: "1.5rem",
              marginLeft: "8px",
              paddingInline: "16px",
            }}
            onClick={() => {
              setField(newField);
              setNewField("");
            }}
          >
            ADD
          </button>
        </div>
        <button
          className={styles.resetBtn}
          onClick={() => {
            window.localStorage.clear();
            _setField({});
          }}
        >
          RESET
        </button>
      </div>
      <div className={styles.sectionContainer}>
        {fieldArr?.map((field) => (
          <CountSection key={field} title={field} />
        ))}
      </div>
    </div>
  );
};
