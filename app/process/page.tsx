import type { Metadata } from "next";
import VideoPlayer from "@/components/VideoPlayer";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "Process — From sheet to object",
  description: "How Look Here Studio objects are made: material, cut, print, finish, assemble, test, pack. Mostly here, between the machines and the mistakes.",
};

const STEPS: [string, string, string][] = [
  ["01", "MATERIAL", "Acrylic, brass, mirror, MDF. We pick the material for what it does with light, not what's cheapest."],
  ["02", "CUT", "Laser and CNC. One clean pass where we can; test cuts on offcuts where we can't."],
  ["03", "PRINT", "Screen, UV and etch. Colour goes on — or, with acrylic, all the way through."],
  ["04", "FINISH", "Flame-polishing, brushing, deburring. The part nobody sees and everybody feels."],
  ["05", "ASSEMBLE", "Standoffs, folds, wiring, and a fair amount of quiet swearing."],
  ["06", "TEST", "Lights get switched on. Clocks get set. Wonky things go back to step 02."],
  ["07", "PACK", "Corners first, always. Then it leaves the studio and becomes yours."],
];

export default function ProcessPage() {
  return (
    <div className="section wrap" style={{ paddingTop: "clamp(24px,4vw,56px)" }}>
      <div className="pagehead" style={{ padding: 0 }}>
        <div className="pagehead__row"><span>MADE HERE</span><span>REAL PEOPLE / ACTUAL HANDS</span></div>
        <h1 className="pagehead__title">From sheet to object.</h1>
        <p className="pagehead__sub">
          Not sent off into an invisible supply chain. Most of what you see starts
          here — between sheets of acrylic, metal, machines, drawings, mistakes and
          a lot of &ldquo;what if we tried this?&rdquo;
        </p>
      </div>

      <div style={{ marginTop: "clamp(32px,5vw,64px)" }}>
        <VideoPlayer
          src="/media/process-film.mp4"
          poster="/media/process-poster.jpg"
          label="PROCESS FILM 01 / FROM SHEET TO OBJECT"
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
        <CTA href="/objects" variant="link">SEE WHAT COMES OUT OF IT</CTA>
        <CTA href="/contact" variant="link">WORK WITH US</CTA>
      </div>
    </div>
  );
}
