import Link from "next/link";
import ProductTile from "../ProductTile";
import CTA from "../CTA";
import { getFeatured } from "@/data/products";

// 03 / OBJECTS — a preview of the catalogue. Each tile is fully clickable.
export default function ObjectsPreview() {
  const featured = getFeatured();
  return (
    <section className="section" id="objects" aria-label="Objects">
      <div className="wrap">
        <div className="slabel"><span>03 / OBJECTS</span></div>

        <div className="objects__head">
          <h2 className="objects__title">A few things we&apos;re making.</h2>
          <p className="objects__intro">
            Objects for brighter spaces and a slower way of living. The whole
            object is the link — tap anything to open it.
          </p>
        </div>

        <div className="tilegrid">
          {featured.map((p, i) => (
            <ProductTile key={p.slug} product={p} delay={(i % 4) * 60} />
          ))}
        </div>

        <div className="objects__foot">
          <CTA href="/objects" variant="link">SEE ALL OBJECTS</CTA>
          <span className="objects__foot-links">
            <Link href="/objects">SPACES</Link>
            <Link href="/objects">OBJECTS</Link>
            <Link href="/collections/editions">EDITIONS</Link>
          </span>
        </div>
      </div>
    </section>
  );
}
