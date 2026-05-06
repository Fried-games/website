"use client";

import { useState, type FormEvent } from "react";
import styles from "../page.module.css";

export default function PlaytestForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (email) setSent(true);
  };

  return (
    <form className={styles.playtestForm} onSubmit={submit}>
      <label className={styles.field}>
        <span className={styles.fieldLabel}>EMAIL</span>
        <input
          className={styles.fieldInput}
          type="email"
          required
          placeholder="cat@unknown.world"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className={styles.field}>
        <span className={styles.fieldLabel}>
          FAVORITE PLATFORMER (OPTIONAL)
        </span>
        <input
          className={styles.fieldInput}
          placeholder="celeste, super meat boy, hollow knight..."
        />
      </label>
      <button
        type="submit"
        className={`${styles.pixBtn} ${styles.pixBtnPrimary} ${styles.pixBtnBlock}`}
      >
        {sent ? "✓ REQUEST RECEIVED" : "► SUBMIT REQUEST"}
      </button>
      {sent && (
        <div className={styles.playtestOk}>
          We&apos;ll be in touch within 14 days. Watch your inbox.
        </div>
      )}
    </form>
  );
}
