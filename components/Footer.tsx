import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <div>
            <Link href="/" className="footer__logo" aria-label="Look Here Studio — home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-stacked.png" alt="LOOK HERE STUDIO" />
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
            </div>
            <div className="footer__col">
              <h4>ELSEWHERE</h4>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram →</a>
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
