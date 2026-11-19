import ProductTile from "../ProductTile";
import CTA from "../CTA";
import { getProduct } from "@/data/products";

// 02 / SMALL RUNS — the range that is available now, front and centre on the home page.
const SLUGS = [
  "no-insurance-magnet",
  "swan-revolt-magnet",
  "starry-road-trip-magnet",
  "photo-frame-magnet",
  "trying-to-get-my-shit-together",
  "gold-elephant-decals",
];

export default function SmallRunsFeature() {
  const items = SLUGS.map(getProduct).filter(Boolean) as NonNullable<ReturnType<typeof getProduct>>[];
  if (items.length === 0) return null;
  return (
    <section className="section" id="small-runs" aria-label="Small Runs">
      <div className="wrap">
        <div className="slabel">
          <span>02 / SMALL RUNS</span>
          <span className="slabel__note">SHORT BATCHES.<br />MADE TO ORDER IN BENGALURU.</span>
        </div>

        <div className="objects__head">
          <h2 className="objects__title">Small runs, ready to order.</h2>
          <p className="objects__intro">
            Fridge magnets, vinyl tees, fabric art and wall decals, cut and
            pressed by hand in short batches. A design can retire when its batch is done,
            and any of them can be made as a custom piece.
          </p>
        </div>

        <div className="tilegrid">
          {items.map((p, i) => (
            <ProductTile key={p.slug} product={p} delay={(i % 4) * 60} />
          ))}
        </div>

        <div className="objects__foot">
          <CTA href="/small-runs" variant="link">SEE ALL SMALL RUNS</CTA>
          <span className="objects__foot-links">
            <a href="/custom">CUSTOM ORDERS</a>
          </span>
        </div>
      </div>
    </section>
  );
}
