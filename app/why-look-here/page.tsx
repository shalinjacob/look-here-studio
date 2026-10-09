import type { Metadata } from "next";
import VideoPlayer from "@/components/VideoPlayer";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  alternates: { canonical: "/why-look-here" },
  title: { absolute: "About Look Here Studio: Who We Are and How We Make" },
  description: "A Bengaluru studio that grew out of a signage workshop, now making playful objects for the home in small runs: cut, printed, finished and tested in our own studio.",
};

const STEPS: [string, string, string][] = [
  ["01", "MATERIAL", "Acrylic, steel, mirror, MDF. We pick the material for what it does with light, not what's cheapest."],
  ["02", "CUT", "Laser and CNC. One clean pass where we can; test cuts on offcuts where we can't."],
  ["03", "PRINT", "Screen, UV and etch. Colour goes on — or, with acrylic, all the way through."],
  ["04", "FINISH", "Flame-polishing, brushing, deburring. The part nobody sees and everybody feels."],
  ["05", "ASSEMBLE", "Standoffs, folds, wiring, and a fair amount of quiet swearing."],
  ["06", "TEST", "Lights get switched on. Clocks get set. Wonky things go back to step 02."],
  ["07", "PACK", "Corners first, always. Then it leaves the studio and becomes yours."],
];

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

      </div>

      <section id="process" style={{ marginTop: "clamp(56px,8vw,112px)", scrollMarginTop: "160px" }}>
        <div className="pagehead" style={{ padding: 0 }}>
          <div className="pagehead__row"><span>MADE HERE</span><span>REAL PEOPLE / ACTUAL HANDS</span></div>
          <h2 className="pagehead__title">From sheet to object.</h2>
          <p className="pagehead__sub">
            Not sent off into an invisible supply chain. Most of what you see starts
            here — between sheets of acrylic, metal, machines, drawings, mistakes and
            a lot of &ldquo;what if we tried this?&rdquo;
          </p>
        </div>

        <div style={{ marginTop: "clamp(32px,5vw,64px)" }}>
          <VideoPlayer
            src="/media/process-film-02.mp4"
            poster="/media/process-film-02-poster.webp"
            aspect="16 / 9"
            label="PROCESS FILM 01 / FROM PROCESS TO OBJECT"
          />
        </div>

        <div className="process__steps">
          {STEPS.map(([n, label, desc]) => (
            <div className="process__step" key={n}>
              <span className="process__n">{n}</span>
              <span className="process__label">{label}</span>
              <p className="process__desc">{desc}</p>
            </div>
          ))}
        </div>

        <div className="objects__foot">
          <CTA href="/objects" variant="stamp">SEE THE OBJECTS</CTA>
          <CTA href="/off-the-wall" variant="link">SEE THE TEES</CTA>
          <CTA href="/contact" variant="link">WORK WITH US</CTA>
        </div>
      </section>
    </div>
  );
}
