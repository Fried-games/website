"use client";

import { useEffect, useState } from "react";
import styles from "../page.module.css";

const STEAM_URL =
  "http://store.steampowered.com/app/3869320/Stroom/?beta=1";

export default function Hero() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.heroCenter}>
        <div className={styles.heroTitle}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/stroom/stroom-title.png" alt="STROOM" />
        </div>
        <div className={styles.heroTag}>
          A precision platformer about a black cat with lightning powers
        </div>
        <div className={styles.heroCtas}>
          <a
            className={`${styles.pixBtn} ${styles.pixBtnPrimary}`}
            href={STEAM_URL}
            target="_blank"
            rel="noopener"
          >
            ► WISHLIST ON STEAM
          </a>
          <a className={styles.pixBtn} href="#playtest">
            ▶ JOIN PLAYTEST
          </a>
        </div>
        <div className={styles.heroComing}>COMING 2026</div>
      </div>

      <div className={`${styles.scrollArrow} ${scrolled ? styles.scrollArrowHidden : ""}`} aria-hidden="true">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
}
