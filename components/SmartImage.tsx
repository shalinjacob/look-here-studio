"use client";

import { useEffect, useRef, useState } from "react";

// Renders the real <img> straight away (so it's in the server HTML for Google
// and starts loading before JS), and swaps to `fallback` only if the file
// fails to load — e.g. a photo that hasn't been dropped into /public yet.
// `priority` marks the above-the-fold hero/gallery image: eager + high priority.

interface Props {
  src?: string;
  alt: string;
  fallback: React.ReactNode;
  className?: string;
  /** object-fit for the loaded image */
  fit?: "cover" | "contain";
  priority?: boolean;
}

export default function SmartImage({
  src,
  alt,
  fallback,
  className,
  fit = "contain",
  priority = false,
}: Props) {
  const [failed, setFailed] = useState(false);
  // "cover" crops to fill the frame, which wrecks photos whose shape is far
  // from the frame's (e.g. a landscape shot in a 4:5 gallery). Until we know the
  // image's shape we show it uncropped, and only use cover when it roughly matches.
  const [coverOk, setCoverOk] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  const measure = () => {
    const img = ref.current;
    if (!img || !img.naturalWidth || !img.clientWidth || !img.clientHeight) return;
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const frameRatio = img.clientWidth / img.clientHeight;
    setCoverOk(Math.abs(imgRatio / frameRatio - 1) <= 0.2);
  };

  // an error that fired before hydration has no listener yet, so check once
  useEffect(() => {
    setFailed(false);
    setCoverOk(false);
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
    else measure();
  }, [src]);

  if (!src || failed) return <>{fallback}</>;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={className}
      style={{ width: "100%", height: "100%", objectFit: fit === "cover" && coverOk ? "cover" : "contain" }}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      onLoad={measure}
      onError={() => setFailed(true)}
    />
  );
}
