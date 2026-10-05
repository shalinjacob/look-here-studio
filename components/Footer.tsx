import Link from "next/link";
import { FACEBOOK_URL, INSTAGRAM_URL } from "@/lib/site";

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
              <Link href="/gift-guide">Gift guide</Link>
              <Link href="/process">Process</Link>
            </div>
            <div className="footer__col">
              <h4>STUDIO</h4>
              <Link href="/why-look-here">Why Look Here</Link>
              <Link href="/journal">Journal</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/shipping-returns">Shipping &amp; returns</Link>
            </div>
            <div className="footer__col">
              <h4>ELSEWHERE</h4>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram →</a>
              <a href={FACEBOOK_URL} target="_blank" rel="noreferrer">Facebook →</a>
              <a href="https://pinterest.com" target="_blank" rel="noreferrer">Pinterest →</a>
              <a href="mailto:hello@lookherestudio.in">Email →</a>
            </div>
          </div>

          <div className="footer__end">
            SAME SPACES.
            <br />
            A LITTLE MORE YOU.
          </div>
        </div>

        <div className="footer__baseline">
          <span>© {new Date().getFullYear()} LOOK HERE STUDIO</span>
          <span>FOR HOMES THAT NOTICE.</span>
        </div>
      </div>
    </footer>
  );
}
