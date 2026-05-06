"use client";

import { useState, useEffect } from "react";
import styles from "../page.module.css";

const STEAM_URL =
  "http://store.steampowered.com/app/3869320/Stroom/?beta=1";

const BOOT_LINES = [
  "> FRIED_GAMES.SYS  v0.4.2",
  "> LOADING ASSETS .............. OK",
  "> INIT GRAPHICS ............... OK",
  "> MOUNT WORLD: /unknown ........ OK",
  "> AWAKEN PROTAGONIST ........... ??",
  "> READY.",
];

export default function Hero() {
  const [boot, setBoot] = useState(0);

  useEffect(() => {
    if (boot >= BOOT_LINES.length) return;
    const t = setTimeout(() => setBoot((b) => b + 1), 280 + boot * 40);
    return () => clearTimeout(t);
  }, [boot]);

  return (
    <section className={styles.hero}>
      <div className={styles.heroBoot}>
        {BOOT_LINES.slice(0, boot).map((l, i) => (
          <div key={i} className={styles.bootLine}>
            {l}
          </div>
        ))}
        {boot < BOOT_LINES.length && (
          <div className={styles.bootLine}>
            _<span className={styles.blink}>▮</span>
          </div>
        )}
      </div>

      <div className={styles.heroCenter}>
        <div className={styles.heroCathead}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/stroom/cat-head.png" alt="Stroom protagonist" />
        </div>
        <div className={styles.heroTitle}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/stroom/stroom-title-black.png" alt="STROOM" />
        </div>
        <div className={styles.heroTag}>
          A precision platformer about a black cat thrown into
          <br />
          an unfamiliar world by a lightning strike he cannot explain.
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
        <div className={styles.heroMeta}>
          <span>[ PC / STEAM ]</span>
          <span className={styles.dot}>·</span>
          <span>[ COMING SOON ]</span>
          <span className={styles.dot}>·</span>
          <span>[ SINGLE PLAYER ]</span>
        </div>
      </div>

      <div className={`${styles.heroCorner} ${styles.heroCornerTr}`}>
        PRESS START ◢
      </div>
      <div className={`${styles.heroCorner} ${styles.heroCornerBl}`}>
        © FRIED GAMES 2026
      </div>
      <div className={`${styles.heroCorner} ${styles.heroCornerBr}`}>
        v0.4.2 · BUILD 1138
      </div>
    </section>
  );
}
