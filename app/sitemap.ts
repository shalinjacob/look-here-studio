import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { collections } from "@/data/collections";
import { journal } from "@/data/journal";

const BASE = "https://lookherestudio.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/objects", "/gift-guide", "/process", "/why-look-here", "/journal", "/contact"];
  return [
    ...staticRoutes.map((r) => ({ url: `${BASE}${r}`, lastModified: now, priority: r === "" ? 1 : 0.8 })),
    ...collections.map((c) => ({ url: `${BASE}/collections/${c.slug}`, lastModified: now, priority: 0.7 })),
    ...products.map((p) => ({ url: `${BASE}/objects/${p.slug}`, lastModified: now, priority: 0.6 })),
    ...journal.map((j) => ({ url: `${BASE}/journal/${j.slug}`, lastModified: now, priority: 0.5 })),
  ];
}
