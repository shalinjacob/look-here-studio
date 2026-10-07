import Link from "next/link";
import { getProduct, formatPrice } from "@/data/products";

// Tiny inline formatter for editorial copy: [label](/path) links and
// {price:slug} tokens (filled from product data so prices never drift).

export function fillTokens(text: string): string {
  return text.replace(/\{price:([a-z0-9-]+)\}/g, (_, slug: string) => {
    const p = getProduct(slug);
    return p ? formatPrice(p.price, p.currency) : "";
  });
}

/** plain text (for JSON-LD, llms.txt): tokens filled, links reduced to labels */
export function plain(text: string): string {
  return fillTokens(text).replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1");
}

export function Rich({ text }: { text: string }) {
  const out: React.ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  const s = fillTokens(text);
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(s))) {
    if (m.index > last) out.push(s.slice(last, m.index));
    const [, label, href] = m;
    out.push(
      href.startsWith("/") ? (
        <Link key={m.index} href={href}>{label}</Link>
      ) : (
        <a key={m.index} href={href} target="_blank" rel="noreferrer">{label}</a>
      )
    );
    last = m.index + m[0].length;
  }
  if (last < s.length) out.push(s.slice(last));
  return <>{out}</>;
}
