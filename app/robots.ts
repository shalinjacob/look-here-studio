import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Everything is crawlable (incl. Googlebot-Image) except the API. Pages that
// shouldn't be indexed (e.g. the printable gift card) use noindex instead, so
// they must stay crawlable for Google to see it.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
