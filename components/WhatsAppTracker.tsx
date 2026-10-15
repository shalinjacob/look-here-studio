"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

// One delegated listener reports whatsapp_click for every link to WhatsApp
// (wa.me / api.whatsapp.com), wherever it sits. Links open normally.
function linkLocation(a: Element, path: string): string {
  if (a.closest(".wa-float")) return "product_page_floating";
  if (a.closest(".announce")) return "banner";
  if (a.closest("footer")) return "footer";
  if (a.closest("header, nav")) return "header";
  if (path === "/") return a.closest("section") === document.querySelector("main section") ? "home_hero" : "home";
  if (path.startsWith("/objects/")) return "product_page";
  if (path.startsWith("/journal")) return "journal";
  return path.split("/")[1] || "other";
}

export default function WhatsAppTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href*="wa.me"], a[href*="api.whatsapp.com"]');
      if (!a) return;
      const path = window.location.pathname;
      const isProduct = path.startsWith("/objects/");
      track("whatsapp_click", {
        link_location: linkLocation(a, path),
        product_name: isProduct ? document.querySelector("h1")?.textContent?.trim() ?? "" : "",
        page_path: path,
      });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
