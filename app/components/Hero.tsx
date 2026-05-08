import styles from "../page.module.css";

const STEAM_URL =
  "http://store.steampowered.com/app/3869320/Stroom/?beta=1";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroCenter}>
        <div className={styles.heroCathead}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/stroom/cat-head.png" alt="Stroom protagonist" />
        </div>
        <div className={styles.heroTitle}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/stroom/stroom-title.png" alt="STROOM" />
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
        <div className={styles.heroComing}>COMING 2026</div>
      </div>

    </section>
  );
}
