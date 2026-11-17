import { SITE_URL, WHATSAPP_NUMBER } from "@/lib/site";
import { getProduct, isComingSoon } from "@/data/products";
import { getCategory, getSubCategory } from "@/data/categories";
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
  /** listing/collection page name, e.g. "Small runs" */
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
  if (path === "/custom") return { type: "listing", pageName: "custom orders", url };
  if (path === "/gift-guide") return { type: "listing", pageName: "the gift guide", url };
  if (parts[0] === "collections" && parts[1]) {
    const c = getCollection(parts[1]);
    return { type: "listing", pageName: `the ${c ? titleCase(c.name.toLowerCase()) : titleCase(parts[1])} collection`, url };
  }
  if (parts[0] === "small-runs" && parts.length === 2) {
    const sc = getSubCategory(parts[0], parts[1]);
    if (sc) return { type: "listing", pageName: sc.name, url };
  }
  if (parts.length === 1 && getCategory(parts[0])) {
    return { type: "listing", pageName: getCategory(parts[0])!.name, url };
  }
  return { type: "other", url };
}

/** Nov 2026: nothing but Small Runs can be asked about on WhatsApp. True on coming-soon
 *  product pages and on listings made up only of coming-soon products. */
export function waHidden(pathname: string): boolean {
  const path = pathname.replace(/\/+$/, "") || "/";
  const parts = path.split("/").filter(Boolean);
  if (parts[0] === "objects" && parts[1]) {
    const p = getProduct(parts[1]);
    return !!p && isComingSoon(p);
  }
  if (path === "/objects") return true;
  if (parts[0] === "collections") return true;
  if (parts[0] === "gift-guide") return true;
  if (parts.length === 1 || parts.length === 2) {
    const c = parts.length === 2 ? getSubCategory(parts[0], parts[1]) : getCategory(parts[0]);
    if (c) {
      const ps = c.products.map(getProduct).filter(Boolean);
      return ps.length > 0 && ps.every((x) => isComingSoon(x!));
    }
  }
  return false;
}
