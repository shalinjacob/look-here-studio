import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductTile from "@/components/ProductTile";
import AddEditToCart from "@/components/AddEditToCart";
import { edits, getEdit, editProducts, editTotal } from "@/data/edits";
import { getProduct, formatPrice } from "@/data/products";
import { BRAND_NAME } from "@/lib/site";
import type { Product } from "@/lib/types";

export function generateStaticParams() {
  return edits.map((e) => ({ slug: e.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const e = getEdit(params.slug);
  if (!e) return { title: "Edit not found" };
  const names = editProducts(e).map((p) => p.name).join(", ");
  return {
    title: { absolute: `${e.title}: A Ready-Made Gift Edit | ${BRAND_NAME}` },
    description: `${e.blurb} ${names}: ${formatPrice(editTotal(e))} together, free shipping across India.`,
    alternates: { canonical: `/gift-guide/edits/${e.slug}` },
  };
}

export default function EditPage({ params }: { params: { slug: string } }) {
  const e = getEdit(params.slug);
  if (!e) notFound();
  const items = editProducts(e);
  const options = (e.choose?.from.map(getProduct).filter(Boolean) ?? []) as Product[];

  return (
    <div className="section wrap" style={{ paddingTop: "clamp(24px,4vw,56px)" }}>
      <div className="pdp__top" style={{ marginBottom: 0 }}>
        <Link href="/gift-guide" className="pdp__back">← GIFT GUIDE</Link>
        <span className="pdp__marker">READY-MADE EDIT</span>
      </div>
      <div className="pagehead" style={{ padding: 0, marginTop: "clamp(24px,4vw,48px)" }}>
        <h1 className="pagehead__title">{e.title}</h1>
        <p className="pagehead__sub">{e.blurb}</p>
      </div>

      <div className="tilegrid" style={{ marginTop: "clamp(32px,5vw,56px)" }}>
        {items.map((p, i) => (
          <ProductTile key={p.slug} product={p} delay={i * 50} />
        ))}
      </div>

      <AddEditToCart
        items={items}
        choose={e.choose && { label: e.choose.label, options, defaultSlug: e.choose.defaultSlug }}
      />
      <p className="editbuy__fine">
        No bundle discount, no catch: it&apos;s the same objects at their usual prices, added in
        one go. Each is made to order and dispatched within 10 working days.
      </p>
    </div>
  );
}
