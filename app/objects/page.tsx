import type { Metadata } from "next";
import CatalogueGrid from "@/components/CatalogueGrid";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import Link from "next/link";

export const metadata: Metadata = {
  alternates: { canonical: "/objects" },
  title: { absolute: "Shop Home Decor Objects: Mirrors, Clocks, Wall Art | Look Here Studio" },
  description:
    "Every Look Here object: wall clocks, wavy mirrors, LED wall art, frames and table pieces. Made to order in Bengaluru, free shipping across India.",
};

export default function ObjectsPage() {
  return (
    <section className="section wrap" style={{ paddingTop: "clamp(24px,4vw,56px)" }}>
      <div className="pagehead" style={{ padding: 0 }}>
        <div className="pagehead__row">
          <span>OBJECTS</span>
          <span>{products.length} ENTRIES</span>
        </div>
        <h1 className="pagehead__title">Objects</h1>
        <p className="pagehead__sub">Things for walls, tables, shelves and wherever else.</p>
      </div>

      <nav className="catnav" aria-label="Shop by category">
        <span className="catnav__label">SHOP BY CATEGORY</span>
        {categories.map((c) => (
          <Link key={c.slug} href={`/${c.slug}`} className="catnav__link">{c.name}</Link>
        ))}
      </nav>
      <CatalogueGrid products={products} />
    </section>
  );
}
