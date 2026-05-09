"use client";

import { type FormEvent } from "react";
import styles from "../page.module.css";

export default function NewsletterForm() {
  const submit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <form className={styles.newsForm} onSubmit={submit}>
      <input className={styles.newsInput} placeholder="email@here" />
      <button className={styles.newsBtn} type="submit">
        →
      </button>
    </form>
  );
}
