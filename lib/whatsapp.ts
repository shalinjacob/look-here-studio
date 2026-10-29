import { SITE_URL, WHATSAPP_NUMBER } from "@/lib/site";
import { getProduct } from "@/data/products";
import { getCategory } from "@/data/categories";
import { getCollection } from "@/data/collections";

// ONE place that builds every wa.me link on the site.

export type WaPageType = "product" | "listing" | "other";

/** window event the product picker fires so the site-wide button can name the choice */
export const WA_SELECTION_EVENT = "lhs:wa-selection";

const HELLO = "Hi Look Here Studio!";

/** encodeURIComponent leaves ' raw; encode it too so no &#x27; surprises */
const encode = (s: string) => encodeURIComponent(s).replace(/'/g, "%27");

export interface WaOptions {
  /** full custom message (wishlist, cart request…): used as-is */
  text?: string;
  productName?: string;
  productCode?: string;
  /** "size: L, colour: Black" */
  option?: string;
  /** listing/collection page name, e.g. "Off The Wall" */
  pageName?: string;
  url?: string;
}

export function whatsAppMessage(o: WaOptions = {}): string {
  if (o.text) return o.text;
  if (o.productName) {
    const code = o.productCode ? ` (${o.productCode})` : "";
    const opt = o.option ? `, ${o.option}` : "";
    return `${HELLO} I'm interested in the ${o.productName}${code}${opt}.${o.url ? ` ${o.url}` : ""}`;
  }
  if (o.pageName) {
    return `${HELLO} I'm browsing ${o.pageName} and have a question.${o.url ? ` ${o.url}` : ""}`;
  }
  return `${HELLO} I'd like to ask about: `;
}

export function buildWhatsAppLink(o: WaOptions = {}): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encode(whatsAppMessage(o))}`;
}

/** "ask for customisations": a message that already asks for the details we need before payment */
export function customisationMessage(name: string, code: string, url: string): string {
  return [
    `${HELLO} I'd like to ask about customising the ${name} (${code}). ${url}`,
    "",
    "What I'd like changed:",
    "",
    "Full name:",
    "Address:",
    "Email:",
    "Mobile number:",
    "Pincode:",
  ].join("\n");
}

const titleCase = (s: string) => s.replace(/-/g, " ").replace(/(^|\s)\S/g, (c) => c.toUpperCase());

export interface PageContext {
  type: WaPageType;
  productSlug?: string;
  productName?: string;
  productCode?: string;
  pageName?: string;
  url: string;
}

/** what the visitor is looking at, from the pathname */
export function pageContext(pathname: string): PageContext {
  const path = pathname.replace(/\/+$/, "") || "/";
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  const parts = path.split("/").filter(Boolean);

  if (parts[0] === "objects" && parts[1]) {
    const p = getProduct(parts[1]);
    if (p) return { type: "product", productSlug: p.slug, productName: p.name, productCode: p.objectNumber, url };
  }
  if (path === "/objects") return { type: "listing", pageName: "our objects", url };
  if (path === "/off-the-wall") return { type: "listing", pageName: "Off The Wall", url };
  if (path === "/custom") return { type: "listing", pageName: "custom orders", url };
  if (path === "/gift-guide") return { type: "listing", pageName: "the gift guide", url };
  if (parts[0] === "collections" && parts[1]) {
    const c = getCollection(parts[1]);
    return { type: "listing", pageName: `the ${c ? titleCase(c.name.toLowerCase()) : titleCase(parts[1])} collection`, url };
  }
  if (parts.length === 1 && getCategory(parts[0])) {
    return { type: "listing", pageName: getCategory(parts[0])!.name, url };
  }
  return { type: "other", url };
}
