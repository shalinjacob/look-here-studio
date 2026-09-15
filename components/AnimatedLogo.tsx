"use client";

import { useEffect, useRef, useState } from "react";

// ---------------------------------------------------------------------------
// <AnimatedLogo /> — "LIQUID SETTLE"
//
// The real supplied logo raster (never redrawn) fades + rises into place with a
// viscous jelly settle, a one-off SVG turbulence/displacement that resolves to
// ZERO (so the final frame is the pristine artwork), and a single specular
// sheen sweep. After ~1.9s the SVG filter is removed entirely, guaranteeing a
// sharp, undistorted logo on retina. Desktop hover gives one tiny jelly wobble.
// prefers-reduced-motion => a short fade only. No library, CSS + SVG only.
// ---------------------------------------------------------------------------

let uid = 0;

export default function AnimatedLogo({
  src = "/logo-stacked.png",
  alt = "LOOK HERE STUDIO",
  width = 560,
  className,
}: {
  src?: string;
  alt?: string;
  width?: number;
  className?: string;
}) {
  const [phase, setPhase] = useState<"idle" | "playing" | "done">("idle");
  const [reduced, setReduced] = useState(false);
  const filterId = useRef(`liquid-settle-${uid++}`).current;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setReduced(true);
      setPhase("done");
      return;
    }
    setPhase("playing");
    // remove the SVG filter once the settle has fully resolved -> pristine art
    const t = setTimeout(() => setPhase("done"), 1950);
    return () => clearTimeout(t);
  }, []);

  const playing = phase === "playing" && !reduced;

  return (
    <div
      className={`alogo${reduced ? " alogo--reduced" : ""}${className ? " " + className : ""}`}
      data-phase={phase}
      style={{ width }}
    >
      {playing && (
        <svg className="alogo__defs" width="0" height="0" aria-hidden focusable="false">
          <filter
            id={filterId}
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.02 0.03"
              numOctaves={2}
              seed={4}
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                dur="1.3s"
                begin="0.12s"
                values="0.02 0.03;0.013 0.018;0.006 0.008"
                keyTimes="0;0.5;1"
                fill="freeze"
              />
              <animate
                attributeName="seed"
                dur="1.3s"
                begin="0.12s"
                values="3;7;10"
                fill="freeze"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="11"
              xChannelSelector="R"
              yChannelSelector="G"
            >
              <animate
                attributeName="scale"
                dur="1.25s"
                begin="0.15s"
                values="11;8;3;0"
                keyTimes="0;0.4;0.75;1"
                fill="freeze"
              />
            </feDisplacementMap>
          </filter>
        </svg>
      )}

      <div className="alogo__inner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="alogo__img"
          draggable={false}
          style={playing ? { filter: `url(#${filterId})` } : undefined}
        />
        {playing && <span className="alogo__sheen" aria-hidden />}
      </div>
    </div>
  );
}
