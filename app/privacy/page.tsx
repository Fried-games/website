import type { Metadata } from "next";
import styles from "../page.module.css";
import CRTOverlay from "../components/CRTOverlay";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { PRIVACY_EMAIL, SITE_URL } from "../lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Fried Games collects, uses and protects your personal data on the Stroom website.",
  alternates: { canonical: `${SITE_URL}/privacy` },
};

const LAST_UPDATED = "October 5, 2026";

export default function PrivacyPage() {
  const mail = <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>;

  return (
    <div className={styles.page}>
      <CRTOverlay />
      <Nav />
      <main className={`${styles.section} ${styles.legalSection}`}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionRule} />
          <h1 className={styles.sectionTitle}>PRIVACY POLICY</h1>
          <span className={styles.sectionRule} />
        </div>

        <article className={styles.legal}>
          <p className={styles.legalMeta}>Last updated: {LAST_UPDATED}</p>

          <h2>Who we are</h2>
          <p>
            This website is run by <strong>Fried Games B.V.</strong>, the data
            controller for the personal data collected here. For any privacy
            question or request, write to {mail}.
          </p>

          <h2>What we collect</h2>
          <ul>
            <li>
              <strong>Playtest request:</strong> your email address and the skill
              level you choose.
            </li>
            <li>
              <strong>Contact form:</strong> your name, email address and message.
            </li>
            <li>
              <strong>Technical data:</strong> your IP address is processed by our
              hosting provider to serve the site and, briefly, to block spam. We
              don&apos;t store it with your submission.
            </li>
          </ul>
          <p>
            We don&apos;t use cookies, analytics or advertising trackers.
          </p>

          <h2>Why we use it</h2>
          <ul>
            <li>
              <strong>Playtest:</strong> to select testers and send Steam keys.
              Legal basis: your consent (GDPR art. 6(1)(a)).
            </li>
            <li>
              <strong>Contact:</strong> to answer your message. Legal basis: our
              legitimate interest in replying to you (art. 6(1)(f)).
            </li>
            <li>
              <strong>Security:</strong> to protect the forms against spam and
              abuse. Legal basis: legitimate interest (art. 6(1)(f)).
            </li>
          </ul>
          <p>We never sell your data or use it for advertising.</p>

          <h2>Who processes it</h2>
          <p>We rely on a few service providers acting on our behalf:</p>
          <ul>
            <li><strong>Vercel</strong>: website hosting</li>
            <li><strong>Supabase</strong>: storage of form submissions</li>
            <li><strong>Resend</strong>: internal email notifications to our team</li>
          </ul>
          <p>
            Screenshots and trailers are loaded from <strong>Steam</strong> (Valve)
            servers, which receive your IP address when you view them. Some of
            these providers may process data outside the EU; in that case
            transfers are covered by the European Commission&apos;s Standard
            Contractual Clauses or an adequacy decision.
          </p>

          <h2>How long we keep it</h2>
          <ul>
            <li>
              <strong>Playtest requests:</strong> until the end of the Stroom
              playtest program, then deleted.
            </li>
            <li>
              <strong>Contact messages:</strong> up to 12 months after our last
              exchange.
            </li>
          </ul>

          <h2>Your rights</h2>
          <p>
            You can ask to access, correct, delete or export your data, object to
            or restrict its processing, and withdraw your consent at any time.
            Just email {mail}. We&apos;ll answer within one month.
          </p>
          <p>
            You can also file a complaint with your data protection authority
            (for example the CNIL in France or the Autoriteit Persoonsgegevens in
            the Netherlands).
          </p>
        </article>
      </main>
      <div className={styles.footerSpacer} />
      <Footer />
    </div>
  );
}
