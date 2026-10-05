import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "./lib/site";

const poppinsDisplay = Poppins({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const poppinsMono = Poppins({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const poppinsFallback = Poppins({
  variable: "--font-mono-fallback",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const DESCRIPTION =
  "Fried Games is an independent studio making Stroom, a precision platformer about a black cat struck by lightning. 100 handcrafted levels, 5 worlds, 5 bosses. Coming 2027 on Steam, wishlist now.";

const SOCIAL_TITLE = "Fried Games | Stroom, a precision platformer coming 2027";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Fried Games | Stroom, a Precision Platformer | Coming 2027",
    template: "%s | Fried Games",
  },
  description: DESCRIPTION,
  applicationName: "Fried Games",
  keywords: ["Fried Games", "FriedGames", "Stroom", "precision platformer", "indie game", "indie studio", "platformer", "Steam", "cat game", "playtest"],
  authors: [{ name: "Fried Games" }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Fried Games",
    title: SOCIAL_TITLE,
    description: DESCRIPTION,
    images: [{ url: `${SITE_URL}/ss_0554a890df7274aaf2d458c90d96d1d5831de174.1920x1080.jpg`, width: 1920, height: 1080, alt: "Stroom gameplay" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@FriedGames27746",
    title: SOCIAL_TITLE,
    description: DESCRIPTION,
    images: [`${SITE_URL}/ss_0554a890df7274aaf2d458c90d96d1d5831de174.1920x1080.jpg`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppinsDisplay.variable} ${poppinsMono.variable} ${poppinsFallback.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
