import styles from "./page.module.css";
import Hero from "./components/Hero";
import PlaytestForm from "./components/PlaytestForm";
import NewsletterForm from "./components/NewsletterForm";

const STEAM_URL =
  "http://store.steampowered.com/app/3869320/Stroom/?beta=1";

function CRTOverlay() {
  return (
    <div className={styles.crtOverlay} aria-hidden="true">
      <div className={styles.crtScanlines} />
      <div className={styles.crtVignette} />
      <div className={styles.crtFlicker} />
    </div>
  );
}

function SectionHead({
  num,
  title,
}: {
  num: string;
  title: string;
}) {
  return (
    <div className={styles.sectionHead}>
      <span className={styles.sectionNum}>{num}</span>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <span className={styles.sectionRule} />
    </div>
  );
}

function Trailer() {
  return (
    <section className={styles.section} id="trailer">
      <SectionHead num="01" title="// TRAILER" />
      <div className={styles.trailerFrame}>
        <div className={styles.trailerPlaceholder}>
          <div className={styles.trailerPlay}>▶</div>
          <div className={styles.trailerTxt}>CLICK TO PLAY · 01:42</div>
          <div className={styles.trailerBars}>
            {Array.from({ length: 24 }).map((_, i) => (
              <span
                key={i}
                className={`${styles.trailerBar} ${i % 2 !== 0 ? "" : styles.trailerBarOdd}`}
                style={{
                  height: `${20 + Math.abs(Math.sin(i * 0.7)) * 80}%`,
                }}
              />
            ))}
          </div>
        </div>
        <div className={styles.trailerBezel}>
          <span className={styles.trailerBezelRec}>REC ●</span>
          <span>CH 01</span>
          <span>STROOM // GAMEPLAY</span>
          <span>SP</span>
        </div>
      </div>
    </section>
  );
}

function Lore() {
  return (
    <section className={styles.section} id="lore">
      <SectionHead num="02" title="// THE WORLD" />
      <div className={styles.lore}>
        <div className={styles.loreCol}>
          <div className={styles.loreKicker}>CHAPTER 00 — STRIKE</div>
          <p className={styles.loreBody}>
            A black cat. A storm. A bolt of light that should have ended him.
            Instead it cracked something open — a current under his fur he can
            hear when he closes his eyes.
          </p>
          <p className={styles.loreBody}>
            The world he wakes in is not the one he left. The rules bend. The
            walls hum. The only way through is up, and across, and across again,
            frame-perfect.
          </p>
        </div>
        <div className={styles.loreCol}>
          <div className={styles.loreStats}>
            {[
              ["NAME", "UNKNOWN"],
              ["SPECIES", "FELIS / ???"],
              ["STATE", "CHARGED"],
              ["HOMETOWN", "—"],
              ["OBJECTIVE", "ASCEND"],
            ].map(([label, value]) => (
              <div key={label} className={styles.loreStat}>
                <span className={styles.loreStatLabel}>{label}</span>
                <span className={styles.loreStatValue}>{value}</span>
              </div>
            ))}
            <div className={styles.loreStat}>
              <span className={styles.loreStatLabel}>STATUS</span>
              <span className={`${styles.loreStatValue} ${styles.blink}`}>
                ACTIVE
              </span>
            </div>
          </div>
          <div className={styles.lorePortrait}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/stroom/cat-head.png" alt="" />
            <div className={styles.loreCaption}>
              FIG. 01 — SUBJECT, POST-STRIKE
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const SCREENSHOTS = [
  "ss_0554a890df7274aaf2d458c90d96d1d5831de174.1920x1080.jpg",
  "ss_0828cfea596a800fef96fd949426abbe417e2e05.1920x1080.jpg",
  "ss_82de622694ca18069ae265ea79b814c60b3ead28.1920x1080.jpg",
  "ss_985989a642e52397b5d365c97497749f7d0d8e52.1920x1080.jpg",
  "ss_e8155559848cfef1644ca7a402065b5728fe2d9f.1920x1080.jpg",
];

function Gallery() {
  return (
    <section className={styles.section} id="gallery">
      <SectionHead num="03" title="// GALLERY" />
      <div className={styles.gallery}>
        {SCREENSHOTS.map((src, i) => (
          <div key={i} className={styles.galleryItem}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/stroom/${src}`} alt={`Stroom screenshot ${i + 1}`} />
          </div>
        ))}
      </div>
    </section>
  );
}

function Playtest() {
  return (
    <section className={styles.section} id="playtest">
      <SectionHead num="04" title="// PLAYTEST.REQUEST" />
      <div className={styles.playtest}>
        <div className={styles.playtestIntro}>
          <p>
            We&apos;re handing out keys to a small group of testers each week.
            Tell us a little about yourself.
          </p>
          <ul className={styles.playtestList}>
            <li>► We read every bug report.</li>
            <li>► Selected testers get a Steam key.</li>
          </ul>
        </div>
        <PlaytestForm />
      </div>
    </section>
  );
}

function Community() {
  return (
    <section className={styles.section} id="community">
      <SectionHead num="05" title="// CONNECT" />
      <div className={styles.community}>
        <a
          className={styles.card}
          href={STEAM_URL}
          target="_blank"
          rel="noopener"
        >
          <div className={styles.cardIcon}>▣</div>
          <div className={styles.cardTitle}>STEAM</div>
          <div className={styles.cardSub}>
            Wishlist Stroom and follow for updates.
          </div>
          <div className={styles.cardCta}>OPEN STORE →</div>
        </a>
        <div className={`${styles.card} ${styles.cardNews}`}>
          <div className={styles.cardIcon}>✉</div>
          <div className={styles.cardTitle}>DEV NOTES</div>
          <div className={styles.cardSub}>
            Monthly newsletter. Build progress, GIFs, no spam.
          </div>
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}

function Studio() {
  return (
    <section className={styles.section} id="studio">
      <SectionHead num="06" title="// THE STUDIO" />
      <div className={styles.studio}>
        <div className={styles.studioLogo}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/stroom/fg-logo-white.png" alt="Fried Games" />
        </div>
        <div className={styles.studioTxt}>
          <div className={styles.studioName}>FRIED GAMES</div>
          <p>
            A tiny independent studio making things that feel like the games we
            couldn&apos;t put down as kids. Stroom is our first project.
          </p>
          <div className={styles.studioLinks}>
            <a href="mailto:hi@friedgames.com">→ hi@friedgames.com</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <div className={styles.page}>
      <CRTOverlay />
      <nav className={styles.nav}>
        <div className={styles.navBrand}>
          <span className={styles.navSigil}>◣</span>
          <span>STROOM</span>
        </div>
        <div className={styles.navLinks}>
          <a href="#trailer">TRAILER</a>
          <a href="#lore">WORLD</a>
          <a href="#gallery">GALLERY</a>
          <a href="#playtest">PLAYTEST</a>
          <a href="#studio">STUDIO</a>
        </div>
        <a
          className={styles.navCta}
          href={STEAM_URL}
          target="_blank"
          rel="noopener"
        >
          WISHLIST ►
        </a>
      </nav>
      <Hero />
      <Trailer />
      <Lore />
      <Gallery />
      <Playtest />
      <Community />
      <Studio />
      <footer className={styles.footer}>
        <div className={styles.footerRow}>
          <span>© 2026 FRIED GAMES B.V.</span>
          <span>STROOM™ IS A TRADEMARK OF FRIED GAMES.</span>
          <span>MADE IN THE KITCHEN</span>
        </div>
      </footer>
    </div>
  );
}
