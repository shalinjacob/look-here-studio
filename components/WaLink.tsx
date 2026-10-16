"use client";

import { buildWhatsAppLink } from "@/lib/whatsapp";

// A WhatsApp link to the studio (clicks are reported by WhatsAppTracker).
export default function WaLink({
  text,
  className,
  children,
  ariaLabel,
}: {
  text: string;
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
}) {
  return (
    <a
      href={buildWhatsAppLink({ text })}
      target="_blank"
      rel="noreferrer"
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
