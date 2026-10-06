import type { Metadata, Viewport } from "next";
import { Inter, IBM_Plex_Mono, Roboto, Caveat } from "next/font/google";
import { CartProvider } from "@/components/cart/CartContext";
import AnnounceBar from "@/components/AnnounceBar";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import Analytics from "@/components/Analytics";
import { CampaignClock } from "@/components/campaign/CampaignClock";
import CampaignStrip from "@/components/campaign/CampaignStrip";
import "./globals.css";
import { SITE_URL, ogImage } from "@/lib/site";

const display = Inter({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--display",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--mono",
  display: "swap",
});
const sans = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--sans",
  display: "swap",
  preload: false,
});
// Handwriting — used only for the margin "notes to self".
const hand = Caveat({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--hand",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Look Here Studio: Playful Home Decor, Made in Bengaluru",
    template: "%s | Look Here Studio",
  },
  description:
    "Mirrors, clocks, lamps, backlit wall art and wall pieces, made to order in Bengaluru and dispatched within 10 working days. Free shipping across India.",
  keywords: [
    "design studio",
    "home objects",
    "acrylic objects",
    "mirrors",
    "clocks",
    "wall objects",
    "Bengaluru design",
  ],
  openGraph: {
    title: "LOOK HERE STUDIO",
    description: "Objects for the home designed to be noticed.",
    type: "website",
    locale: "en_IN",
    siteName: "LOOK HERE STUDIO",
    images: [ogImage("home")],
  },
  twitter: { card: "summary_large_image", title: "LOOK HERE STUDIO", description: "Objects for the home designed to be noticed.", images: ["/og/home.jpg"] },
  robots: { index: true, follow: true },
};

// Re-render pages at most every 10 minutes so the campaign banner's first paint
// reflects the current IST date (the client then syncs to the exact server time).
export const revalidate = 600;

export const viewport: Viewport = {
  themeColor: "#f6f4ec",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable} ${sans.variable} ${hand.variable}`}>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <CampaignClock initialNow={Date.now()}>
        <CartProvider>
          <CampaignStrip />
          <AnnounceBar />
          <Nav />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
        </CampaignClock>
        <Analytics />
      </body>
    </html>
  );
}
