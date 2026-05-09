"use client";

import { useState, type FormEvent } from "react";
import styles from "../page.module.css";

type State = "idle" | "loading" | "done" | "error";

export default function PlaytestForm() {
  const [email, setEmail]   = useState("");
  const [skill, setSkill]   = useState("BEGINNER");
  const [website, setWebsite] = useState(""); // honeypot
  const [state, setState]   = useState<State>("idle");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (state === "loading" || state === "done") return;
    setState("loading");

    try {
      const res = await fetch("/stroom/api/playtest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, skill, website }),
      });
      if (!res.ok) throw new Error();
      setState("done");
    } catch {
      setState("error");
    }
  };

  return (
    <form className={styles.playtestForm} onSubmit={submit}>
      {/* Honeypot — invisible pour les humains */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }}>
        <label>
          Website
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </label>
      </div>

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

      <fieldset className={styles.field} style={{ border: "none", padding: 0, margin: 0 }}>
        <legend className={styles.fieldLabel}>PLATFORMER SKILL LEVEL</legend>
        <div className={styles.skillOptions}>
          {(["BEGINNER", "CONFIRMED", "EXPERT"] as const).map((level) => (
            <label key={level} className={styles.skillOption}>
              <input
                type="radio"
                name="skill"
                value={level}
                checked={skill === level}
                onChange={() => setSkill(level)}
              />
              <span>{level}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={state === "loading" || state === "done"}
        className={`${styles.pixBtn} ${styles.pixBtnPrimary} ${styles.pixBtnBlock}`}
      >
        {state === "loading" ? "SENDING…" : state === "done" ? "✓ REQUEST RECEIVED" : "► SUBMIT REQUEST"}
      </button>

      {state === "done" && (
        <div className={styles.playtestOk}>
          Request received. We&apos;ll reach out if you&apos;re selected.
        </div>
      )}
      {state === "error" && (
        <div className={styles.playtestOk} style={{ color: "var(--red)" }}>
          Something went wrong. Try again or email us directly.
        </div>
      )}
    </form>
  );
}
