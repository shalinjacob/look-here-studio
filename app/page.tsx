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
import { standardReturnPolicyLd } from "@/lib/structuredData";
import { SITE_URL, SITE_NAME, BRAND_NAME, EMAIL, WHATSAPP_NUMBER, FACEBOOK_URL, INSTAGRAM_URL, PINTEREST_URL } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const orgLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Store",
      "@id": `${SITE_URL}/#store`,
      name: BRAND_NAME,
      alternateName: [SITE_NAME, "Look Here", "lookherestudio"],
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
      hasMerchantReturnPolicy: standardReturnPolicyLd,
      sameAs: [INSTAGRAM_URL, FACEBOOK_URL, ...(PINTEREST_URL ? [PINTEREST_URL] : [])],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      // Google uses this (homepage WebSite name) as the site name in results
      name: BRAND_NAME,
      alternateName: [SITE_NAME, "lookherestudio.in"],
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
