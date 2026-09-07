import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Stroom — Fried Games",
  description:
    "A precision platformer about a black cat thrown into an unfamiliar world by a lightning strike he cannot explain.",
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
