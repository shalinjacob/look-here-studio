"use client";

import { useEffect, useState } from "react";

// Shows a real image once it successfully loads; until then (or if the file
// doesn't exist yet) it renders `fallback`. This lets us wire real photography
// and the real logo PNG into the site *now* — the assets simply appear the
// moment they're dropped into /public, with no code changes and no broken-image
// flash.

interface Props {
  src?: string;
  alt: string;
  fallback: React.ReactNode;
  className?: string;
  /** object-fit for the loaded image */
  fit?: "cover" | "contain";
}

export default function SmartImage({
  src,
  alt,
  fallback,
  className,
  fit = "contain",
}: Props) {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (!src) return;
    let alive = true;
    const img = new window.Image();
    img.onload = () => alive && setOk(true);
    img.onerror = () => alive && setOk(false);
    img.src = src;
    return () => {
      alive = false;
    };
  }, [src]);

  if (src && ok) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        style={{ width: "100%", height: "100%", objectFit: fit }}
        loading="lazy"
      />
    );
  }
  return <>{fallback}</>;
}
