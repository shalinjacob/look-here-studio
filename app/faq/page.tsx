import type { Metadata } from "next";
import Link from "next/link";
import { siteFaq } from "@/data/siteFaq";
import { categories } from "@/data/categories";
import { faqLd } from "@/data/faq";
import { BRAND_NAME } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import Faq from "@/components/Faq";

export const metadata: Metadata = {
  alternates: { canonical: "/faq" },
  title: { absolute: `FAQ: Ordering, Delivery, Returns & Gifting | ${BRAND_NAME}` },
  description:
    "How ordering on WhatsApp works, delivery times across India, returns, personalisation and gifting at Look Here Studio, Bengaluru. Quick, straight answers.",
};

export default function FaqPage() {
  return (
    <div className="section wrap" style={{ paddingTop: "clamp(24px,4vw,56px)" }}>
      <JsonLd data={faqLd(siteFaq.flatMap((g) => g.items))} />
      <div className="pagehead" style={{ padding: 0 }}>
        <div className="pagehead__row"><span>FAQ</span><span>STRAIGHT ANSWERS</span></div>
        <h1 className="pagehead__title">Questions, answered.</h1>
        <p className="pagehead__sub">
          Everything is made to order in Bengaluru, dispatched within 10 working days and shipped
          free across India. Ordering happens on WhatsApp. The details are below.
        </p>
      </div>

      <div className="article" style={{ margin: "clamp(32px,5vw,56px) 0 0", maxWidth: 760 }}>
        {siteFaq.map((g) => (
          <section key={g.group} className="article__faq">
            <h2>{g.group}</h2>
            <Faq items={g.items} />
          </section>
        ))}

        <p className="catlinks" style={{ marginTop: "clamp(40px,6vw,64px)" }}>
          Shop by category:{" "}
          {categories.map((c, i) => (
            <span key={c.slug}>
              {i > 0 && " · "}
              <Link href={`/${c.slug}`}>{c.name}</Link>
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
