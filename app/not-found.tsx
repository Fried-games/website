import Link from "next/link";
import styles from "./page.module.css";
import CRTOverlay from "./components/CRTOverlay";
import Nav from "./components/Nav";

export default function NotFound() {
  return (
    <div className={styles.page}>
      <title>Page not found | Fried Games</title>
      <CRTOverlay />
      <Nav />
      <main className={styles.notFound}>
        <h1 className={styles.notFoundCode}>404</h1>
        <p className={styles.notFoundTxt}>This page doesn&apos;t exist.</p>
        <Link className={`${styles.pixBtn} ${styles.pixBtnPrimary}`} href="/">
          BACK TO HOME
        </Link>
      </main>
    </div>
  );
}
