"use client";

import { useRef, useState } from "react";

// Real HTML5 video with a poster + custom play overlay. Clicking play starts
// the film and exposes native controls; it genuinely plays and pauses.

export default function VideoPlayer({
  src,
  poster,
  label,
  aspect,
}: {
  src: string;
  poster: string;
  label?: string;
  /** CSS aspect-ratio for the frame, e.g. "16 / 9" (default 16 / 10) */
  aspect?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  function play() {
    const v = ref.current;
    if (!v) return;
    v.play();
    setStarted(true);
  }

  return (
    <div className="video">
      <div className="video__frame" style={aspect ? { aspectRatio: aspect } : undefined}>
        <video
          ref={ref}
          src={src}
          poster={poster}
          preload="metadata"
          controls={started}
          playsInline
          onPause={() => {
            /* keep controls visible once started */
          }}
        />
        {!started && (
          <button className="video__play" onClick={play} aria-label="Play process film">
            <span className="video__playbtn" aria-hidden>
              ▶
            </span>
          </button>
        )}
      </div>
      {label && (
        <div className="video__cap">
          <span>{label}</span>
          <span>ACRYLIC / MIRROR / METAL</span>
        </div>
      )}
    </div>
  );
}
