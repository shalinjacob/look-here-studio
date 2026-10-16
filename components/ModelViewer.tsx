"use client";

import { useEffect, useRef, useState } from "react";

// Interactive 3D view (.glb). The model-viewer library + model only load once
// the block is near the viewport, so it costs nothing on first paint.

export default function ModelViewer({
  src,
  alt,
  poster,
  label = "VIEW IN 3D",
}: {
  src: string;
  alt: string;
  poster?: string;
  label?: string;
}) {
  const box = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el || load) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [load]);

  useEffect(() => {
    if (load) import("@google/model-viewer").then(() => setReady(true));
  }, [load]);

  // This model's colours were authored as sRGB values, but glTF reads
  // baseColorFactor as linear, so everything renders pale. Convert on load.
  useEffect(() => {
    if (!ready) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mv = box.current?.querySelector("model-viewer") as any;
    if (!mv) return;
    const fix = () => {
      if (mv.dataset.fixed) return;
      mv.dataset.fixed = "1";
      const lin = (c: number) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
      for (const m of mv.model?.materials ?? []) {
        const f = m.pbrMetallicRoughness.baseColorFactor;
        // the front glass pane only adds haze: hide it
        const a = m.name === "Glass front" ? 0 : f[3];
        m.pbrMetallicRoughness.setBaseColorFactor([lin(f[0]), lin(f[1]), lin(f[2]), a]);
      }
    };
    if (mv.loaded) fix();
    else mv.addEventListener("load", fix, { once: true });
  }, [ready]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MV = "model-viewer" as any;

  return (
    <div className="model3d" ref={box}>
      <div className="model3d__stage">
        {load && (
          <MV
            src={src}
            alt={alt}
            poster={poster}
            camera-controls=""
            auto-rotate=""
            shadow-intensity="0"
            interaction-prompt="auto"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", background: "transparent" }}
          />
        )}
        {!ready && <span className="model3d__loading">LOADING 3D…</span>}
      </div>
      <p className="model3d__label">
        <span>{label}</span>
        <span>DRAG TO ROTATE · PINCH TO ZOOM</span>
      </p>
    </div>
  );
}
