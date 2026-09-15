import type { Metadata } from "next";
import CatalogueGrid from "@/components/CatalogueGrid";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Objects",
  description: "Things for walls, tables, shelves and wherever else. The full Look Here Studio catalogue.",
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

      <CatalogueGrid products={products} />
    </section>
  );
}
