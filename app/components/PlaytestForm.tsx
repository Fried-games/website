"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import styles from "../page.module.css";

type State = "idle" | "loading" | "done" | "error";

export default function PlaytestForm() {
  const [email, setEmail]   = useState("");
  const [intro, setIntro]   = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [state, setState]   = useState<State>("idle");
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (state === "loading" || state === "done") return;
    setState("loading");

    try {
      const res = await fetch("/stroom/api/playtest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, intro, website, startedAt: startedAt.current }),
      });
      if (!res.ok) throw new Error();
      setState("done");
    } catch {
      setState("error");
    }
  };

  return (
    <form className={styles.playtestForm} onSubmit={submit}>
      {/* Honeypot : invisible pour les humains */}
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
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label className={styles.field}>
        <span className={styles.fieldLabel}>
          TELL US ABOUT YOURSELF <span className={styles.fieldOptional}>(OPTIONAL)</span>
        </span>
        <textarea
          className={`${styles.fieldInput} ${styles.fieldTextarea}`}
          maxLength={1000}
          placeholder="A few words about you: what you play, platformers you like, how much time you can give..."
          value={intro}
          onChange={(e) => setIntro(e.target.value)}
        />
      </label>

      <p className={styles.formNote}>
        By submitting, you agree that we store your email to contact you about the playtest.
        See our <Link href="/privacy">privacy policy</Link>.
      </p>

      <button
        type="submit"
        disabled={state === "loading" || state === "done"}
        className={`${styles.pixBtn} ${styles.pixBtnPrimary} ${styles.pixBtnBlock}`}
      >
        {state === "loading" ? "SENDING…" : state === "done" ? "✓ REQUEST RECEIVED" : "SUBMIT REQUEST"}
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
