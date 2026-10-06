import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { collections } from "@/data/collections";
import { publishedPosts } from "@/data/journal";
import { edits } from "@/data/edits";
import { SITE_URL as BASE } from "@/lib/site";

// Indexable pages only. The feed, draft journal posts and the printable
// gift-promise card are deliberately left out.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "", "/objects", "/gift-guide", "/gift-promise", "/process", "/why-look-here",
    "/journal", "/contact", "/shipping-returns", "/privacy", "/terms",
  ];
  return [
    ...staticRoutes.map((r) => ({ url: `${BASE}${r}`, lastModified: now, priority: r === "" ? 1 : 0.8 })),
    ...collections.map((c) => ({ url: `${BASE}/collections/${c.slug}`, lastModified: now, priority: 0.7 })),
    ...edits.map((e) => ({ url: `${BASE}/gift-guide/edits/${e.slug}`, lastModified: now, priority: 0.6 })),
    ...products.map((p) => ({ url: `${BASE}/objects/${p.slug}`, lastModified: now, priority: 0.6 })),
    ...publishedPosts.map((j) => ({ url: `${BASE}/journal/${j.slug}`, lastModified: new Date(j.date), priority: 0.5 })),
  ];
}
