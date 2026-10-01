import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import WhyLookHere from "@/components/sections/WhyLookHere";
import ObjectsPreview from "@/components/sections/ObjectsPreview";
import MadeHere from "@/components/sections/MadeHere";
import AtHome from "@/components/sections/AtHome";
import CurrentDrop from "@/components/sections/CurrentDrop";
import NewObjects from "@/components/sections/NewObjects";
import NewsletterSection from "@/components/sections/NewsletterSection";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, SITE_NAME, EMAIL, WHATSAPP_NUMBER, FACEBOOK_URL } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const orgLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Store",
      "@id": `${SITE_URL}/#store`,
      name: SITE_NAME,
      alternateName: "Look Here Studio",
      url: SITE_URL,
      logo: `${SITE_URL}/logo-stacked.png`,
      image: `${SITE_URL}/og/home.jpg`,
      description:
        "An independent design studio in Bengaluru making playful, graphic objects for the home — mirrors, clocks, lights, wall pieces and art prints — in small runs.",
      email: EMAIL,
      telephone: `+${WHATSAPP_NUMBER}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        addressCountry: "IN",
      },
      areaServed: "IN",
      currenciesAccepted: "INR",
      sameAs: [FACEBOOK_URL],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { "@id": `${SITE_URL}/#store` },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={orgLd} />
      <Hero />
      <WhyLookHere />
      <CurrentDrop />
      <NewObjects />
      <ObjectsPreview />
      <MadeHere />
      <AtHome />
      <NewsletterSection />
    </>
  );
}
