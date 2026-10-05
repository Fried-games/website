import styles from "../page.module.css";

export default function CRTOverlay() {
  return (
    <div className={styles.crtOverlay} aria-hidden="true">
      <div className={styles.crtVignette} />
      <div className={styles.crtFlicker} />
    </div>
  );
}
