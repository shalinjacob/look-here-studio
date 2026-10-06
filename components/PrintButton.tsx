"use client";

export default function PrintButton() {
  return (
    <button className="cta cta--stamp" onClick={() => window.print()}>
      <span className="cta__label">PRINT OR SAVE AS PDF</span>
      <span className="cta__arrow">→</span>
    </button>
  );
}
