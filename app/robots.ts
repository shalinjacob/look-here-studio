import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Everything is crawlable (incl. Googlebot-Image) except the API. Pages that
// shouldn't be indexed (e.g. the printable gift card) use noindex instead, so
// they must stay crawlable for Google to see it.
//
// OpenAI's search crawler (OAI-SearchBot) and ChatGPT's on-demand fetcher (ChatGPT-User)
// are named explicitly so ChatGPT search and shopping can read the catalogue. A named
// group replaces the "*" group for that bot, so the /api/ rule is repeated in each.
// GPTBot (model-training crawler) is left to the "*" rule: change that here if you want to opt out.
const AI_SEARCH_BOTS = ["OAI-SearchBot", "ChatGPT-User"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      ...AI_SEARCH_BOTS.map((userAgent) => ({ userAgent, allow: "/", disallow: ["/api/"] })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
