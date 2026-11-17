"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "./cart/CartContext";
import AnimatedLogo from "./AnimatedLogo";

const SHOP = [
  { href: "/small-runs", label: "SMALL RUNS" },
  { href: "/objects", label: "OBJECTS" },
  { href: "/custom", label: "CUSTOM" },
  { href: "/gift-guide", label: "GIFTS" },
];

// Shown under SMALL RUNS in the SHOP menu (desktop dropdown + mobile menu).
const SMALL_RUNS_SUB = [
  { href: "/small-runs/wall-decals", label: "WALL DECALS" },
  { href: "/small-runs/art", label: "ART" },
  { href: "/small-runs/fridge-magnets", label: "FRIDGE MAGNETS" },
  { href: "/small-runs/tees", label: "TEES" },
];

const AFTER_SHOP = [
  { href: "/why-look-here", label: "WHY LOOK HERE" },
  { href: "/journal", label: "JOURNAL" },
  { href: "/contact", label: "CONTACT" },
];

export default function Nav() {
  const pathname = usePathname();
  const { count, ready, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
    setShopOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!shopOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setShopOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [shopOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  const inShop = SHOP.some((l) => isActive(l.href)) || pathname.startsWith("/collections");

  const subLink = (l: { href: string; label: string }) => (
    <Link key={l.href} href={l.href} className="nav__link nav__link--sub" aria-current={pathname === l.href ? "page" : undefined}>
      {l.label}
    </Link>
  );

  const link = (l: { href: string; label: string }) => (
    <Link key={l.href} href={l.href} className="nav__link" aria-current={isActive(l.href) ? "page" : undefined}>
      {l.label}
    </Link>
  );

  return (
    <>
      <nav className="nav" aria-label="Primary">
        <div className="wrap">
          <div className="nav__top">
            <button
              className="nav__burger"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              MENU ☰
            </button>

            <span className="nav__corner">
              BENGALURU, INDIA
              <br />
              EST. 2026
            </span>

            <Link href="/" className="nav__logo" aria-label="Look Here Studio — home">
              <AnimatedLogo width={120} />
            </Link>

            <span className="nav__corner nav__corner--right">
              <button className="nav__cartbtn" onClick={openCart} aria-label={ready ? `Open cart, ${count} items` : "Open cart"}>
                <span className="nav__cartword">OBJECTS</span>{ready ? ` (${count})` : ""} <span className="nav__bag" aria-hidden>▢</span>
              </button>
            </span>
          </div>

          <div className="nav__links">
            {link({ href: "/", label: "HOME" })}
            <div
              className={`nav__shop${shopOpen ? " is-open" : ""}`}
              onMouseEnter={() => setShopOpen(true)}
              onMouseLeave={() => setShopOpen(false)}
              onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setShopOpen(false); }}
            >
              <button
                className="nav__link nav__shopbtn"
                aria-expanded={shopOpen}
                aria-controls="nav-shop-menu"
                aria-current={inShop ? "page" : undefined}
                // hover already opened it for mouse users; keyboard (detail 0) toggles
                onClick={(e) => setShopOpen((o) => (e.detail === 0 ? !o : true))}
              >
                SHOP <span className="nav__caret" aria-hidden>▾</span>
              </button>
              <div className="nav__shopmenu" id="nav-shop-menu">
                {SHOP.map((l) => (
                  <span key={l.href} className="nav__shopitem">
                    {link(l)}
                    {l.href === "/small-runs" && SMALL_RUNS_SUB.map(subLink)}
                  </span>
                ))}
              </div>
            </div>
            {AFTER_SHOP.map(link)}
          </div>
        </div>
      </nav>

      {/* mobile menu */}
      <div className={`mobilemenu${menuOpen ? " is-open" : ""}`} aria-hidden={!menuOpen}>
        <div className="mobilemenu__head">
          <span className="nav__corner" style={{ display: "block" }}>
            BENGALURU, INDIA · EST. 2026
          </span>
          <button className="mobilemenu__close" onClick={() => setMenuOpen(false)}>
            CLOSE ✕
          </button>
        </div>
        <div className="mobilemenu__links">
          <Link href="/" className="mobilemenu__link">HOME</Link>
          <span className="mobilemenu__group">SHOP</span>
          {SHOP.map((l) => (
            <span key={l.href} style={{ display: "contents" }}>
              <Link href={l.href} className="mobilemenu__link mobilemenu__link--sub">
                {l.label}
              </Link>
              {l.href === "/small-runs" &&
                SMALL_RUNS_SUB.map((s) => (
                  <Link key={s.href} href={s.href} className="mobilemenu__link mobilemenu__link--sub2">
                    {s.label}
                  </Link>
                ))}
            </span>
          ))}
          {AFTER_SHOP.map((l) => (
            <Link key={l.href} href={l.href} className="mobilemenu__link">
              {l.label}
            </Link>
          ))}
          <button
            className="mobilemenu__link"
            style={{ textAlign: "left" }}
            onClick={() => { setMenuOpen(false); openCart(); }}
          >
            CART{ready ? ` (${count})` : ""}
          </button>
        </div>
        <p className="mobilemenu__foot">Objects for the home designed to be noticed.</p>
      </div>
    </>
  );
}
