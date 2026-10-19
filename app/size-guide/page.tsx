import type { Metadata } from "next";
import SizeCards from "@/components/SizeGuide";
import { BRAND_NAME } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/size-guide" },
  title: { absolute: `Size Guide: Every Piece Drawn to Scale | ${BRAND_NAME}` },
  description:
    "See how big every Look Here Studio clock, mirror, frame and lightbox is, drawn to scale against an armchair and a console table, with sizes in centimetres and inches.",
};

export default function SizeGuidePage() {
  return (
    <div className="section wrap" style={{ paddingTop: "clamp(24px,4vw,56px)" }}>
      <div className="pagehead" style={{ padding: 0 }}>
        <div className="pagehead__row"><span>SIZE GUIDE</span><span>TO SCALE</span></div>
        <h1 className="pagehead__title">How big is it?</h1>
        <p className="pagehead__sub">Every piece, with its real size, so you know exactly what you&apos;re getting before you order.</p>
      </div>
      <div style={{ marginTop: "clamp(28px,4vw,48px)", maxWidth: 900 }}>
        <SizeCards />
      </div>
    </div>
  );
}
