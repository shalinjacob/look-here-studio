import { getProduct } from "@/data/products";

export interface OrderLineInput {
  slug: string;
  price: number;
  qty: number;
  variant?: string;
}

/** every price a product can legitimately sell at: base, a variant, or base + one delta per option */
function allowedPrices(slug: string): Set<number> {
  const p = getProduct(slug);
  const out = new Set<number>();
  if (!p || p.price == null) return out;
  let sums = [p.price];
  for (const o of p.options ?? []) {
    sums = sums.flatMap((s) => o.choices.map((c) => s + (c.priceDelta ?? 0)));
  }
  sums.forEach((s) => out.add(s));
  (p.variants ?? []).forEach((v) => out.add(v.price));
  return out;
}

/** server-side total in rupees; null when any line doesn't match the catalogue */
export function priceCart(lines: unknown): { total: number; ok: true } | { ok: false; error: string } {
  if (!Array.isArray(lines) || lines.length === 0) return { ok: false, error: "Cart is empty" };
  let total = 0;
  for (const l of lines as OrderLineInput[]) {
    const qty = Number(l?.qty);
    const price = Number(l?.price);
    if (!l?.slug || !Number.isInteger(qty) || qty < 1 || qty > 20) return { ok: false, error: "Invalid cart line" };
    if (!allowedPrices(l.slug).has(price)) return { ok: false, error: `Price mismatch for ${l.slug}` };
    total += price * qty;
  }
  return { ok: true, total };
}
