import type { Metadata } from "next";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "Why Look Here",
  description: "Why the studio exists — a small design label from a signage and fabrication background in Bengaluru, making playful objects for the home in small runs.",
};

export default function WhyPage() {
  return (
    <div className="section wrap" style={{ paddingTop: "clamp(24px,4vw,56px)" }}>
      <div className="pagehead" style={{ padding: 0 }}>
        <div className="pagehead__row"><span>WHY LOOK HERE</span><span>A SMALL STUDIO / FOR A BRIGHTER HOME</span></div>
        <h1 className="pagehead__title">Some things disappear into a room. These shouldn&apos;t.</h1>
      </div>

      <div className="article" style={{ marginTop: "clamp(32px,5vw,64px)" }}>
        <div className="article__body">
          <p>
            Look Here Studio started in a workshop that already knew how to make things
            noticed — signage. Acrylic, dimensional lettering, metal, light, colour.
            The stuff built to catch your eye from across a street.
          </p>
          <p>
            We kept wondering what would happen if you pointed all that at the home
            instead of the high street. Not louder. Just more alive. A clock you
            actually glance at on purpose. A mirror shaped like a good mood. A shelf
            that earns its wall.
          </p>
          <p>
            So Look Here makes playful, graphic objects for the home using colour,
            reflection, type, shape and light — the same materials and machines, aimed
            somewhere quieter and more personal.
          </p>
          <p>
            Everything is made in small runs, often after you order, here in Bengaluru.
            Designed here. Made here. Changed several times here. A little unnecessary,
            occasionally — which, again, is sort of the point.
          </p>
          <p>
            We believe the objects you live with should be chosen, not inherited by
            accident. That the most-looked-at things in a home deserve to be worth the
            look. And that &ldquo;useful&rdquo; and &ldquo;fun&rdquo; were never actually opposites.
          </p>
        </div>

        <div style={{ marginTop: "clamp(32px,5vw,56px)", display: "flex", gap: "40px", flexWrap: "wrap" }}>
          <CTA href="/objects" variant="stamp">SEE THE OBJECTS</CTA>
          <CTA href="/process" variant="link">HOW WE MAKE THEM</CTA>
        </div>
      </div>
    </div>
  );
}
