import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter, Space_Grotesk } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteNavbar } from "@/components/site-navbar";
import { SITE_NAME, absoluteUrl, getSiteUrl } from "@/lib/site-data";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${SITE_NAME} | 24/7 Board-Up, Glass & Graffiti Dispatch`,
    template: "%s",
  },
  description:
    "Emergency board-up, window and door boarding, commercial glass repair and graffiti removal across Canada. 24/7 dispatch with insurance documentation on every install.",
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE_NAME} | Board-Up, Glass & Graffiti Dispatch`,
    description: "24/7 emergency board-up, glass and vandalism response across Canada. Secured fast, documented for your claim.",
    url: absoluteUrl("/"),
    type: "website",
    siteName: SITE_NAME,
    locale: "en_CA",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-CA" className={`${spaceGrotesk.variable} ${inter.variable} ${plexMono.variable}`}>
      <body>
        <SiteNavbar />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
