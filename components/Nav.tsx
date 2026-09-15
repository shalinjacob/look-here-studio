"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "./cart/CartContext";
import AnimatedLogo from "./AnimatedLogo";

const LINKS = [
  { href: "/", label: "HOME" },
  { href: "/objects", label: "OBJECTS" },
  { href: "/gift-guide", label: "GIFTS" },
  { href: "/why-look-here", label: "WHY LOOK HERE" },
  { href: "/process", label: "PROCESS" },
  { href: "/journal", label: "JOURNAL" },
  { href: "/contact", label: "CONTACT" },
];

export default function Nav() {
  const pathname = usePathname();
  const { count, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

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
              <button className="nav__cartbtn" onClick={openCart} aria-label={`Open cart, ${count} items`}>
                OBJECTS ({count}) <span className="nav__bag" aria-hidden>▢</span>
              </button>
            </span>
          </div>

          <div className="nav__links">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="nav__link"
                aria-current={isActive(l.href) ? "page" : undefined}
              >
                {l.label}
              </Link>
            ))}
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
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="mobilemenu__link">
              {l.label}
            </Link>
          ))}
          <button
            className="mobilemenu__link"
            style={{ textAlign: "left" }}
            onClick={() => { setMenuOpen(false); openCart(); }}
          >
            CART ({count})
          </button>
        </div>
        <p className="mobilemenu__foot">Objects for the home designed to be noticed.</p>
      </div>
    </>
  );
}
