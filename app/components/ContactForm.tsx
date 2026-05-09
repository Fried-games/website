"use client";

import { useState, type FormEvent } from "react";
import styles from "../page.module.css";

type State = "idle" | "loading" | "done" | "error";

export default function ContactForm() {
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [state, setState]     = useState<State>("idle");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (state === "loading" || state === "done") return;
    setState("loading");

    try {
      const res = await fetch("/stroom/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, website }),
      });
      if (!res.ok) throw new Error();
      setState("done");
    } catch {
      setState("error");
    }
  };

  if (state === "done") {
    return (
      <div className={styles.playtestOk} style={{ fontSize: 18 }}>
        ✓ Message received. We&apos;ll get back to you.
      </div>
    );
  }

  return (
    <form className={styles.contactForm} onSubmit={submit}>
      {/* Honeypot */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }}>
        <input type="text" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>

      <label className={styles.field}>
        <span className={styles.fieldLabel}>NAME</span>
        <input
          className={styles.fieldInput}
          type="text"
          required
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label className={styles.field}>
        <span className={styles.fieldLabel}>EMAIL</span>
        <input
          className={styles.fieldInput}
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label className={styles.field}>
        <span className={styles.fieldLabel}>MESSAGE</span>
        <textarea
          className={`${styles.fieldInput} ${styles.fieldTextarea}`}
          required
          placeholder="..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </label>

      {state === "error" && (
        <div style={{ color: "var(--red)", fontSize: 15 }}>
          Something went wrong. Try again or email us directly.
        </div>
      )}

      <button
        type="submit"
        disabled={state === "loading"}
        className={`${styles.pixBtn} ${styles.pixBtnPrimary} ${styles.pixBtnBlock}`}
      >
        {state === "loading" ? "SENDING…" : "► SEND MESSAGE"}
      </button>
    </form>
  );
}
