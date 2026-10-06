"use client";

import { waLink } from "@/lib/site";
import { track } from "@/lib/analytics";

// A WhatsApp link to the studio that reports a whatsapp_click event.
export default function WaLink({
  text,
  location,
  className,
  children,
  ariaLabel,
}: {
  text: string;
  location: "product" | "floating" | "banner" | "at_home" | "contact";
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
}) {
  return (
    <a
      href={waLink(text)}
      target="_blank"
      rel="noreferrer"
      className={className}
      aria-label={ariaLabel}
      onClick={() => track("whatsapp_click", { location })}
    >
      {children}
    </a>
  );
}
