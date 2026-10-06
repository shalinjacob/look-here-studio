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
  const ref = useRef<HTMLImageElement>(null);

  // an error that fired before hydration has no listener yet, so check once
  useEffect(() => {
    setFailed(false);
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, [src]);

  if (!src || failed) return <>{fallback}</>;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={className}
      style={{ width: "100%", height: "100%", objectFit: fit }}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
