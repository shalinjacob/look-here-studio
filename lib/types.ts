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
  | "festival"
  | "tee";

/** gift-guide occasions (/objects?occasion=…) */
export type Occasion = "housewarming" | "wedding" | "just-because";

export interface ProcessStep {
  step: string; // "01"
  label: string; // "CUT"
  note?: string;
}

/** a selectable version of one product (e.g. which word a panel spells) */
export interface ProductVariant {
  id: string;
  label: string; // "LOVE + MORE"
  note?: string; // "Set of two panels"
  price: number;
  /** gallery image to jump to when this variant is picked */
  image?: string;
  /** customer types their own text (confirmed on WhatsApp) */
  custom?: boolean;
}

export interface QA {
  q: string;
  a: string;
}

/** a free-text detail the customer fills in before adding (confirmed on WhatsApp) */
export interface PersonaliseField {
  id: string;
  label: string; // "YOUR TEXT"
  /** short name used in the cart line + WhatsApp message */
  cartLabel: string; // "Text"
  placeholder: string;
  maxLength: number;
}

/** one choice inside a product option (e.g. "Oversized", "L", "Black") */
export interface OptionChoice {
  id: string;
  label: string;
  note?: string;
  /** added to the product price (e.g. oversized +300) */
  priceDelta?: number;
  /** gallery image to jump to when chosen */
  image?: string;
}

/** an independent choice the buyer makes (fit, size, colour…) */
export interface ProductOption {
  id: string;
  legend: string; // "CHOOSE YOUR FIT"
  choices: OptionChoice[];
  /** no default: the buyer must pick (e.g. size) */
  required?: boolean;
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
  images: string[]; // /objects/*.webp — first is primary
  lifestyleImages: string[]; // /lifestyle/*.webp
  /** how the primary image sits in tiles/hero: contain (cutouts) or cover (photos) */
  imageFit?: "contain" | "cover";
  /** optional versions to choose from; `price` is then the starting price */
  variants?: ProductVariant[];
  /** heading above the variant picker (default "CHOOSE YOUR WORD") */
  variantLegend?: string;
  /** several independent choices (fit × size × colour); price = price + deltas */
  options?: ProductOption[];
  /** show a size chart on the product page */
  sizeChart?: "tee";
  /** false = genuinely can't be ordered right now (shows the waitlist). Default true. */
  orderable?: boolean;
  /** made with the customer's own text/object: final sale (see /shipping-returns) */
  custom?: boolean;
  occasions?: Occasion[];
  /** free-text fields to fill in before adding to cart (custom text, colour…) */
  personalise?: PersonaliseField[];
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
  /** unpublished stub: not routed, listed or in the sitemap */
  draft?: boolean;
  /** last substantive edit (ISO), for "Updated" + dateModified */
  updated?: string;
  /** answer-first lead: 2–3 sentences that directly answer the post's question */
  answer?: string;
  /** question-led sections (paragraph text supports [label](/path) links and
   *  {price:slug} tokens filled from product data) */
  sections?: { heading: string; paras: string[] }[];
  faq?: QA[];
  /** products the post mentions (shown as tiles + internal links) */
  products?: string[];
  /** meta description (falls back to excerpt) */
  description?: string;
  /** draft outline: planned H2s */
  outline?: string[];
}
