import Link from "next/link";
import SmartImage from "./SmartImage";
import Reveal from "./Reveal";
import { STATUS_LABEL, formatPrice, isPurchasable } from "@/data/products";
import type { Product } from "@/lib/types";

// The clickable object tile used across the site. The whole tile is the link —
// image, name and object number all open the product page (per spec 6F/6A).

export default function ProductTile({
  product: p,
  delay = 0,
}: {
  product: Product;
  delay?: number;
}) {
  return (
    <Reveal as="article" delay={delay} className="tile">
      <Link href={`/objects/${p.slug}`} className="tile__link">
        <div className={`tile__frame${p.imageFit === "cover" ? " tile__frame--cover" : ""}`}>
          <SmartImage
            src={p.images[0]}
            alt={p.name}
            fit={p.imageFit ?? "contain"}
            className="tile__img"
            fallback={<div className="tile__ph">{p.objectNumber}</div>}
          />
          <span className="tile__open" aria-hidden>
            OPEN →
          </span>
        </div>
        <div className="tile__meta">
          <span className="tile__num">{p.objectNumber}</span>
          <h3 className="tile__name">{p.name}</h3>
          <span className="tile__cat">{p.category}</span>
          <div className="tile__foot">
            <span className="tile__price">
              {isPurchasable(p) ? formatPrice(p.price, p.currency) : STATUS_LABEL[p.status]}
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
