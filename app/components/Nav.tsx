import Link from "next/link";
import styles from "../page.module.css";
import { STEAM_URL } from "../lib/site";

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.navBrand}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/stroom/fg-logo-banner.png" alt="Fried Games" className={styles.navLogo} />
      </Link>
      <div className={styles.navLinks}>
        <Link href="/#lore">ABOUT</Link>
        <Link href="/#playtest">PLAYTEST</Link>
        <Link href="/#studio">STUDIO</Link>
      </div>
      <a className={styles.navCta} href={STEAM_URL} target="_blank" rel="noopener">
        WISHLIST ►
      </a>
    </nav>
  );
}
