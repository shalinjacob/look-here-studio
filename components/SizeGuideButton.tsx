"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ProductSize } from "./SizeGuide";
import { SIZES } from "@/data/sizes";

// "SIZE GUIDE" link on a product page: opens the guide in a pop-up with this product highlighted.
export default function SizeGuideButton({ slug }: { slug: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  // only wall objects have a size guide
  if (!SIZES.some((e) => e.slugs.includes(slug))) return null;

  return (
    <>
      <button type="button" className="sizebtn" onClick={() => setOpen(true)}>
        SIZE GUIDE →
      </button>
      {open &&
        createPortal(
          <div className="sizemodal" role="dialog" aria-modal="true" aria-labelledby="sizemodal-title">
            <div className="sizemodal__scrim" onClick={() => setOpen(false)} />
            <div className="sizemodal__panel">
              <div className="sizemodal__head">
                <h2 id="sizemodal-title">Size guide</h2>
                <button type="button" className="sizemodal__close" onClick={() => setOpen(false)} aria-label="Close">
                  CLOSE ✕
                </button>
              </div>
              <ProductSize slug={slug} />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
