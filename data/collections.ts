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
    heroImage: "/objects/blood-moon.webp",
    gallery: [
      "/objects/pomegranate-study.webp",
      "/objects/smoke-and-feathers.webp",
    ],
    productSlugs: [
      "old-habits",
      "smoke-and-feathers",
      "pomegranate-study",
      "blood-moon",
    ],
    seoTitle: "LED Backlit Wall Art Prints (A2) | Editions | Look Here Studio",
    // {price} is filled from the first product's price
    seoDescription:
      "Old masters, botany and collage set in edge-lit LED slim frames. Plug it in and the room changes. Made to order in Bengaluru, {price}.",
  },
];

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}
