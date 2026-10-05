import { LINKS } from "./Footer";
import { SITE_ORIGIN, SITE_URL } from "../lib/site";

const STEAM_STORE_URL = "https://store.steampowered.com/app/3869320/Stroom/";
const ORG_ID = `${SITE_ORIGIN}/#organization`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: "Fried Games",
      alternateName: ["FriedGames", "Fried Games Studio"],
      url: SITE_ORIGIN,
      logo: `${SITE_URL}/fg-logo-text-under.png`,
      description: "Independent video game studio, developer of Stroom.",
      email: "support@friedgames.com",
      sameAs: [...LINKS.map((l) => l.href), STEAM_STORE_URL],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_ORIGIN}/#website`,
      name: "Fried Games",
      alternateName: "FriedGames",
      url: SITE_URL,
      publisher: { "@id": ORG_ID },
    },
    {
      "@type": "VideoGame",
      "@id": `${SITE_URL}/#stroom`,
      name: "Stroom",
      description:
        "A precision platformer about a black cat struck by lightning and left with electric powers. 100 handcrafted levels across 5 worlds, 25 bonus levels and 5 boss fights.",
      url: SITE_URL,
      image: `${SITE_URL}/ss_0554a890df7274aaf2d458c90d96d1d5831de174.1920x1080.jpg`,
      genre: ["Platformer", "Precision platformer", "Indie"],
      gamePlatform: "PC",
      playMode: "SinglePlayer",
      author: { "@id": ORG_ID },
      publisher: { "@id": ORG_ID },
      sameAs: STEAM_STORE_URL,
    },
  ],
};

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
