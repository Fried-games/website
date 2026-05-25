import styles from "./page.module.css";
import Hero from "./components/Hero";
import PlaytestForm from "./components/PlaytestForm";
import MediaCarousel from "./components/MediaCarousel";
import Footer from "./components/Footer";
import ContactForm from "./components/ContactForm";
import { getSteamAppData, type SteamScreenshot, type SteamMovie } from "./lib/steam";

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

const KEY_FEATURES = [
  "100 HANDCRAFTED LEVELS across 5 worlds",
  "25 BONUS LEVELS for an extra challenge",
  "5 UNIQUE BOSS FIGHTS",
  "TIGHT, RESPONSIVE CONTROLS — dash, slide, wallslide and more",
  "Every level has an OPTIMAL PATH to discover and master",
  "FULL CONTROLLER SUPPORT",
];

function Lore({ screenshots, movies }: { screenshots: SteamScreenshot[]; movies: SteamMovie[] }) {
  return (
    <section className={styles.section} id="lore">
      <SectionHead num="01" title="// ABOUT THIS GAME" />
      <MediaCarousel screenshots={screenshots} movies={movies} />
      <div className={styles.lore}>
        <div className={styles.loreCol}>
          <p className={styles.loreBody}>
            Stroom is a precision platformer about a black cat struck by lightning
            and left with one unexpected side effect — electric powers.
          </p>
          <p className={styles.loreBody}>
            Dash through obstacles, charge past enemies, wallslide through
            tight corridors and find the optimal path through 100 handcrafted
            levels. Each world introduces new mechanics that build on the last,
            pushing your skills further with every stage.
          </p>
          <p className={styles.loreBody}>
            Five worlds. Five bosses. One cat trying to get home.
          </p>
          <p className={styles.loreTagline}>— Die. Learn. Go faster.</p>
        </div>
        <div className={styles.loreCol}>
          <div className={styles.loreFeatureBox}>
            <div className={styles.loreFeatureTitle}>[ KEY FEATURES ]</div>
            <ul className={styles.loreFeatureList}>
              {KEY_FEATURES.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Playtest() {
  return (
    <section className={styles.section} id="playtest">
      <SectionHead num="02" title="// PLAYTEST REQUEST" />
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

function Studio() {
  return (
    <section className={styles.section} id="studio">
      <SectionHead num="03" title="// THE STUDIO" />
      <div className={styles.studio}>
        <div className={styles.studioInfo}>
          <div className={styles.studioLogo}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/stroom/Icon_text_under_bg.png" alt="Fried Games" />
          </div>
          <div className={styles.studioTxt}>
            <div className={styles.studioName}>FRIED GAMES</div>
            <p>
              A small independent studio simmering somewhere in France.
            </p>
            <p>
              Currently on the stove: <strong>Stroom</strong>, a precision
              platformer about a cat with electric powers. Taste-test it
              before it&apos;s done.
            </p>
          </div>
        </div>
        <div className={styles.contactBox}>
          <div className={styles.contactBoxTitle}>[ CONTACT ]</div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

export default async function Page() {
  const steam = await getSteamAppData();
  const screenshots = steam?.screenshots ?? [];
  const movies = steam?.movies ?? [];

  return (
    <div className={styles.page}>
      <CRTOverlay />
      <nav className={styles.nav}>
        <a href="#" className={styles.navBrand}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/stroom/Icon_only.png" alt="Fried Games" className={styles.navLogo} />
          <span>FRIED GAMES</span>
        </a>
        <div className={styles.navLinks}>
          <a href="#lore">ABOUT</a>
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
      <Lore screenshots={screenshots} movies={movies} />
      <Playtest />
      <Studio />
      <div className={styles.footerSpacer} />
      <Footer />
    </div>
  );
}
