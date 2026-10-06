import { getProduct, products } from "./products";
import type { Product } from "@/lib/types";

// ---------------------------------------------------------------------------
// Gift-guide "ready-made edits". No bundle discount: the total is always the
// sum of the items' own prices. OWNER: confirm the contents.
// `choose` = one slot where the customer picks from a set (e.g. any Edition).
// ---------------------------------------------------------------------------

export interface GiftEdit {
  slug: string;
  title: string;
  blurb: string;
  slugs: string[];
  /** one slot the customer chooses from these slugs; slugs[] holds the default */
  choose?: { label: string; from: string[]; defaultSlug: string };
}

const EDITION_SLUGS = products.filter((p) => p.collection === "editions").map((p) => p.slug);

export const edits: GiftEdit[] = [
  {
    slug: "the-coffee-table",
    title: "The Coffee Table",
    blurb: "Everything the coffee table needs. Coasters, a little light, and something to argue over.",
    slugs: ["patterned-coasters", "acrylic-lamp", "x-plus-o"],
  },
  {
    slug: "the-gallery-wall",
    title: "The Gallery Wall",
    blurb: "A backlit art edition, a cat with a heart cut out of it, and a set of floating frames.",
    slugs: ["blood-moon", "cat-got-your-heart", "square-frame"],
    choose: { label: "Pick your Edition", from: EDITION_SLUGS, defaultSlug: "blood-moon" },
  },
  {
    slug: "the-new-home",
    title: "The New Home",
    blurb: "A housewarming that isn't another scented candle. A mirror, a frame, and a clock worth glancing at.",
    slugs: ["pink-wavy-mirror", "strip-frame", "layer-clock"],
  },
];

export const getEdit = (slug: string) => edits.find((e) => e.slug === slug);

export const editProducts = (e: GiftEdit): Product[] =>
  e.slugs.map((s) => getProduct(s)).filter((p): p is Product => !!p);

export const editTotal = (e: GiftEdit) => editProducts(e).reduce((n, p) => n + (p.price ?? 0), 0);
