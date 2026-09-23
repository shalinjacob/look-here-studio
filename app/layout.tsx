import type { Metadata, Viewport } from "next";
import { Inter, IBM_Plex_Mono, Roboto, Caveat } from "next/font/google";
import { CartProvider } from "@/components/cart/CartContext";
import AnnounceBar from "@/components/AnnounceBar";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import "./globals.css";

const display = Inter({
  subsets: ["latin"],
  weight: ["500", "700", "800", "900"],
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
});
// Handwriting — used only for the margin "notes to self".
const hand = Caveat({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--hand",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lookherestudio.in"),
  title: {
    default: "LOOK HERE STUDIO — Objects for the home designed to be noticed",
    template: "%s — LOOK HERE STUDIO",
  },
  description:
    "An independent design studio in Bengaluru making playful, graphic objects for the home — mirrors, clocks, lights, wall pieces — using colour, reflection, type, shape and light. Made in small runs.",
  keywords: [
    "design studio",
    "home objects",
    "acrylic objects",
    "mirrors",
    "clocks",
    "wall objects",
    "Bengaluru design",
    "Diwali objects",
  ],
  openGraph: {
    title: "LOOK HERE STUDIO",
    description: "Objects for the home designed to be noticed.",
    type: "website",
    locale: "en_IN",
    siteName: "LOOK HERE STUDIO",
  },
  twitter: { card: "summary_large_image", title: "LOOK HERE STUDIO", description: "Objects for the home designed to be noticed." },
  robots: { index: true, follow: true },
};

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
        <CartProvider>
          <AnnounceBar />
          <Nav />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
