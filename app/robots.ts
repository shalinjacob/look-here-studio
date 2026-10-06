import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Everything is crawlable (incl. Googlebot-Image) except private/order routes.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/checkout", "/order/", "/api/"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
