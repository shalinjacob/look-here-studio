import type { Collection } from "@/lib/types";

export const collections: Collection[] = [
  {
    slug: "festival-01",
    index: "01",
    name: "FESTIVAL 01",
    title: "Made for Diwali. Made to stay.",
    tagline: "The first collection.",
    intro: [
      "Familiar ideas of light, thresholds, kolam and gathering — turned into objects we'd happily leave out long after the festival.",
      "No marigolds. No festive gradients. Just brass, light, and a few shapes that know what day it is.",
    ],
    drawnFrom: ["light", "thresholds", "kolam", "jasmine", "gathering"],
    note: "Designed for the festival. Not designed to disappear after it.",
    heroImage: "/lifestyle/diya-toran-1.jpg",
    gallery: [
      "/objects/a-house-full-of-light.jpg",
      "/objects/kolam-coasters.jpg",
    ],
    productSlugs: [
      "kolam-coasters",
      "motif-coasters",
      "leaf-coasters",
      "diya-toran",
      "knot-toran",
      "diya-ring-toran",
      "the-threshold",
      "kolam-constellation",
      "a-house-full-of-light",
      "jasmine-at-dusk",
      "x-plus-o",
    ],
    seoTitle: "Festival 01 — Made for Diwali. Made to stay.",
    seoDescription:
      "Look Here Studio's first collection: brass, light and threshold objects for Diwali, built to stay up all year.",
  },
];

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}
