"use client";

import { useState } from "react";
import { TEE_SIZE_CHART } from "@/data/sizeChart";

// Tee size chart: garment measurements, switch fit + inches/cm.
export default function SizeChart() {
  const [fit, setFit] = useState<"regular" | "oversized">("oversized");
  const [cm, setCm] = useState(false);
  const v = (n: number) => (cm ? Math.round(n * 2.54) : n);
  return (
    <div className="sizechart">
      <div className="sizechart__toggles" role="group" aria-label="Size chart options">
        {(["regular", "oversized"] as const).map((f) => (
          <button key={f} type="button" className={`sizechart__tab${fit === f ? " is-active" : ""}`} aria-pressed={fit === f} onClick={() => setFit(f)}>
            {f === "regular" ? "Regular fit" : "Oversized fit"}
          </button>
        ))}
        <button type="button" className="sizechart__unit" onClick={() => setCm((c) => !c)}>
          Show in {cm ? "inches" : "cm"}
        </button>
      </div>
      <div className="sizechart__scroll">
        <table className="sizechart__table">
          <thead>
            <tr><th>Size</th><th>To fit chest</th><th>Garment chest</th><th>Length</th><th>Shoulder</th></tr>
          </thead>
          <tbody>
            {TEE_SIZE_CHART[fit].map((r) => (
              <tr key={r.size}><td>{r.size}</td><td>{v(r.toFit)}</td><td>{v(r.chest)}</td><td>{v(r.length)}</td><td>{v(r.shoulder)}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="sizechart__note">
        Measurements in {cm ? "cm" : "inches"}. &ldquo;To fit chest&rdquo; is your body; the rest are the tee laid flat, ±0.5&Prime;.
        Chest: measure around the fullest part with your arms slightly raised. Length: from the highest point of the shoulder
        to the hem. Shoulder: seam to seam. <strong>Regular</strong> sits close without clinging; <strong>oversized</strong> has
        dropped shoulders and falls loose. Between sizes? Go up for regular, stay true for oversized.
      </p>
    </div>
  );
}
