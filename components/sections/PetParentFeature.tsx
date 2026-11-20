import CTA from "../CTA";
import PetTeeStacker from "../PetTeeStacker";
import { getProduct, formatPrice } from "@/data/products";
import { altFor } from "@/data/images";

// 03 / PET PARENT — the custom dog tee, given its own spot under Small Runs.
const SLUG = "tee-custom-pet-parent";

export default function PetParentFeature() {
  const p = getProduct(SLUG);
  if (!p) return null;
  const href = `/objects/${p.slug}`;
  const [worn, flat, art] = p.images;

  return (
    <section className="section petfeat" id="pet-parent" aria-label="Custom Pet Parent tee">
      <div className="wrap">
        <div className="slabel">
          <span>03 / MADE FOR YOUR DOG</span>
          <span className="slabel__note">MADE TO ORDER.<br />PROOF BEFORE PRINT.</span>
        </div>

        <div className="petfeat__grid">
          <div className="petfeat__text">
            <h2 className="objects__title">Your dog&rsquo;s name, on a tee.</h2>
            <p className="objects__intro">
              You&rsquo;ve been &ldquo;Luca&rsquo;s mom&rdquo; at the vet, the park and every
              group chat since the day they came home. Now it&rsquo;s official: in gold, four
              times over, with their face right in the middle.
            </p>
            <ul className="petfeat__points">
              <li>Send a photo on WhatsApp, we cut your pet out and get the art ready for print.</li>
              <li>You approve a proof before anything is printed.</li>
              <li>Heat-pressed vinyl on an oversized black cotton tee, XS to XXL.</li>
            </ul>
            <p className="petfeat__price">{formatPrice(p.price, p.currency)} · personalised, so no returns</p>
            <PetTeeStacker href={href} />
            <div className="objects__foot">
              <CTA href={href} variant="link">SEE THE PET PARENT TEE</CTA>
            </div>
          </div>

          <div className="petfeat__media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="petfeat__hero" src={worn} alt={altFor(worn, p.name)} loading="lazy" decoding="async" />
            <div className="petfeat__strip">
              {[flat, art].filter(Boolean).map((src) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={src} src={src} alt={altFor(src, `${p.name} detail`)} loading="lazy" decoding="async" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
