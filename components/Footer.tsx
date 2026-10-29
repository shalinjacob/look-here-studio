import Link from "next/link";
import { INSTAGRAM_URL, PINTEREST_URL } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <div>
            <Link href="/" className="footer__logo" aria-label="Look Here Studio — home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-stacked.webp" width={480} height={480} alt="LOOK HERE STUDIO" loading="lazy" decoding="async" />
            </Link>
            <p className="footer__sub">BENGALURU / INDIA</p>
          </div>

          <div className="footer__cols">
            <div className="footer__col">
              <h4>SHOP</h4>
              <Link href="/objects">Objects</Link>
              <Link href="/collections/editions">Editions</Link>
              <Link href="/small-runs">Small runs</Link>
              <Link href="/custom">Custom orders</Link>
              <Link href="/gift-guide">Gift guide</Link>
              <Link href="/why-look-here#process">Process</Link>
            </div>
            <div className="footer__col">
              <h4>STUDIO</h4>
              <Link href="/why-look-here">Why Look Here</Link>
              <Link href="/journal">Journal</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/size-guide">Size guide</Link>
              <Link href="/shipping-returns">Shipping &amp; returns</Link>
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
            </div>
            <div className="footer__col">
              <h4>ELSEWHERE</h4>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram →</a>
              {PINTEREST_URL && <a href={PINTEREST_URL} target="_blank" rel="noreferrer">Pinterest →</a>}
              <a href="mailto:hello@lookherestudio.in">Email →</a>
            </div>
          </div>
        </div>

        <div className="footer__baseline">
          <span>© {new Date().getFullYear()} LOOK HERE STUDIO</span>
          <span>THINGS WORTH A SECOND LOOK.</span>
        </div>
      </div>
    </footer>
  );
}
