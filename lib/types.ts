// ---------------------------------------------------------------------------
// LOOK HERE STUDIO — data contract
// Deliberately generic so `data/products.ts` can later be replaced by a CMS or
// a commerce backend (Shopify / Stripe) without touching components.
// ---------------------------------------------------------------------------

export type ProductStatus =
  | "available"
  | "preorder"
  | "coming-soon"
  | "sold-out"
  | "waitlist";

/** filter keys used on /objects */
export type FilterTag =
  | "wall"
  | "table"
  | "light"
  | "mirror"
  | "frame"
  | "art"
  | "festival";

export interface ProcessStep {
  step: string; // "01"
  label: string; // "CUT"
  note?: string;
}

export interface Product {
  id: string;
  objectNumber: string; // "001"
  slug: string;
  name: string;
  shortName: string;
  category: string; // "Wall Object", "Floor Object", "Table Object"...
  subcategory: string;
  /** filter keys this product answers to */
  tags: FilterTag[];
  description: string; // long, product page
  shortDescription: string; // one line, index + cards
  material: string;
  finish: string;
  colour: string;
  dimensions: string;
  price: number | null; // null => "PRICE COMING SOON"
  currency: "INR";
  status: ProductStatus;
  images: string[]; // /objects/*.jpg — first is primary
  lifestyleImages: string[]; // /lifestyle/*.jpg
  /** how the primary image sits in tiles/hero: contain (cutouts) or cover (photos) */
  imageFit?: "contain" | "cover";
  /** optional product video (mp4 under /public/media) */
  video?: string;
  collection?: string; // collection slug
  leadTime: string;
  care: string;
  installation: string;
  featured: boolean; // show in homepage objects preview
  process: ProcessStep[];
  seoTitle: string;
  seoDescription: string;
}

export interface Collection {
  slug: string;
  index: string; // "01"
  name: string; // "FESTIVAL 01"
  title: string; // "Made for Diwali. Made to stay."
  tagline: string;
  intro: string[];
  drawnFrom: string[];
  note: string;
  heroImage: string;
  gallery: string[];
  productSlugs: string[];
  seoTitle: string;
  seoDescription: string;
}

export interface JournalPost {
  slug: string;
  index: string;
  title: string;
  date: string; // ISO
  category: string;
  excerpt: string;
  readingTime: string;
  body: string[]; // paragraphs
}
