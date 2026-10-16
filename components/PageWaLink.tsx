"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { buildWhatsAppLink, pageContext, WA_SELECTION_EVENT } from "@/lib/whatsapp";

// A WhatsApp link whose message follows the page: product page -> that product
// (plus the size/colour currently picked), listing page -> that page, anywhere
// else -> a prompt to type the object name. Clicks are reported by WhatsAppTracker.
export default function PageWaLink({
  className,
  children,
  ariaLabel,
}: {
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
}) {
  const pathname = usePathname() ?? "/";
  const ctx = pageContext(pathname);
  const [pick, setPick] = useState<{ slug: string; text: string } | null>(null);

  useEffect(() => {
    const on = (e: Event) => setPick((e as CustomEvent<{ slug: string; text: string }>).detail);
    const last = (window as unknown as { __waSelection?: { slug: string; text: string } }).__waSelection;
    if (last) setPick(last);
    window.addEventListener(WA_SELECTION_EVENT, on);
    return () => window.removeEventListener(WA_SELECTION_EVENT, on);
  }, []);

  const option = ctx.type === "product" && pick && pick.slug === ctx.productSlug ? pick.text : undefined;
  const href = buildWhatsAppLink({
    productName: ctx.productName,
    productCode: ctx.productCode,
    option,
    pageName: ctx.pageName,
    url: ctx.type === "other" ? undefined : ctx.url,
  });
  const label = ctx.productName ? `Ask on WhatsApp about the ${ctx.productName}` : ariaLabel;

  return (
    <a href={href} target="_blank" rel="noreferrer" className={className} aria-label={label}>
      {children}
    </a>
  );
}
