"use client";

import { useEffect, useState } from "react";
import SmartImage from "./SmartImage";

// Interactive product gallery: main image + clickable thumbnails + prev/next
// arrows + keyboard (←/→). Falls back to a single static image when there's
// only one.

export default function ProductGallery({
  images,
  alt,
  fit = "contain",
  fallbackNumber,
}: {
  images: string[];
  alt: string;
  fit?: "contain" | "cover";
  fallbackNumber?: string;
}) {
  const [i, setI] = useState(0);
  const many = images.length > 1;
  const go = (d: number) => setI((prev) => (prev + d + images.length) % images.length);

  useEffect(() => {
    if (!many) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [many, images.length]);

  return (
    <div className="gallery">
      <div className="pdp__gallery-main">
        <SmartImage
          key={images[i]}
          src={images[i]}
          alt={alt}
          fit={fit}
          fallback={<div className="tile__ph">{fallbackNumber}</div>}
        />
        {many && (
          <>
            <button
              className="gallery__nav gallery__nav--prev"
              onClick={() => go(-1)}
              aria-label="Previous image"
            >
              ←
            </button>
            <button
              className="gallery__nav gallery__nav--next"
              onClick={() => go(1)}
              aria-label="Next image"
            >
              →
            </button>
            <span className="gallery__count" aria-live="polite">
              {i + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {many && (
        <div className="pdp__thumbs">
          {images.map((src, idx) => (
            <button
              key={src}
              className={`pdp__thumb${idx === i ? " is-active" : ""}`}
              onClick={() => setI(idx)}
              aria-label={`View image ${idx + 1}`}
              aria-current={idx === i}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
