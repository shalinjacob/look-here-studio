import type { Collection } from "@/lib/types";

export const collections: Collection[] = [
  {
    slug: "editions",
    index: "01",
    name: "EDITIONS",
    title: "Lit from within.",
    tagline: "Art in an LED slim frame.",
    intro: [
      "A small run of prints set into edge-lit LED slim frames — so the picture doesn't just hang on the wall, it quietly glows off it.",
      "Old masters with modern habits, botanical plates, collages and one very moody moon. Plug it in and the room changes.",
    ],
    drawnFrom: ["old masters", "botany", "collage", "the slightly surreal"],
    note: "Wall art that turns itself on.",
    heroImage: "/objects/blood-moon.jpg",
    gallery: [
      "/objects/pomegranate-study.jpg",
      "/objects/smoke-and-feathers.jpg",
    ],
    productSlugs: [
      "old-habits",
      "smoke-and-feathers",
      "pomegranate-study",
      "blood-moon",
    ],
    seoTitle: "Editions — art in an LED slim frame",
    seoDescription:
      "Look Here Studio's Editions: a small run of prints set into edge-lit LED slim frames.",
  },
];

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}
