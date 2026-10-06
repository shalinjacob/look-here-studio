import type { Metadata } from "next";
import Link from "next/link";
import { getProduct } from "@/data/products";
import { dispatchDate, formatYmd } from "@/lib/workdays";
import PrintButton from "@/components/PrintButton";

// Printable Gift Promise card. Personal details come from the query string,
// are only rendered into this page, and are never stored or logged.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Your Gift Promise card",
  robots: { index: false, follow: false },
};

const clean = (v: string | string[] | undefined) =>
  String(Array.isArray(v) ? v[0] : v ?? "").replace(/\s+/g, " ").trim().slice(0, 40);

export default function GiftPromiseCard({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const product = getProduct(clean(searchParams.object));
  const to = clean(searchParams.to) || "You";
  const from = clean(searchParams.from) || "Someone who thinks you're great";
  const objectName = product?.name ?? "something special";
  const leaves = formatYmd(dispatchDate(), { weekday: false });
  const article = /^[aeiou]/i.test(objectName) ? "an" : "a";

  return (
    <div className="promisecard-page wrap">
      <div className="promisecard__actions no-print">
        <Link href="/gift-promise" className="pdp__back">← GIFT PROMISE</Link>
        <PrintButton />
      </div>

      <section className="promisecard promisecard--front" aria-label="Card front">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-stacked.webp" alt="Look Here Studio" className="promisecard__logo" />
        <p className="promisecard__headline">Something is being made for you.</p>
      </section>

      <section className="promisecard promisecard--inside" aria-label="Card inside">
        <p className="promisecard__text">
          {to}, {article} <strong>{objectName}</strong> is on its way from the Look Here studio in
          Bengaluru. Leaving the studio by <strong>{leaves}</strong>.
        </p>
        <p className="promisecard__from">With love, {from}.</p>
        <p className="promisecard__foot">lookherestudio.in · Same spaces. A little more you.</p>
      </section>
    </div>
  );
}
