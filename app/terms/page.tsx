import type { Metadata } from "next";
import Link from "next/link";
import { EMAIL, BRAND_NAME } from "@/lib/site";

// DRAFT. OWNER + legal review required: legal entity, GST wording, governing law.
const UPDATED = "6 October 2026";

export const metadata: Metadata = {
  alternates: { canonical: "/terms" },
  title: { absolute: `Terms of Sale | ${BRAND_NAME}` },
  description: "The terms for ordering made-to-order objects from Look Here Studio: pricing, personalisation, shipping in India and returns.",
};

export default function TermsPage() {
  return (
    <div className="section wrap" style={{ paddingTop: "clamp(24px,4vw,56px)" }}>
      <div className="pagehead" style={{ padding: 0 }}>
        <div className="pagehead__row"><span>TERMS</span><span>DRAFT</span></div>
        <h1 className="pagehead__title">Terms of Sale</h1>
        <p className="pagehead__sub draftline">Draft, last updated {UPDATED}.</p>
      </div>

      <div className="article" style={{ marginTop: "clamp(32px,5vw,64px)" }}>
        <div className="article__body policy">
          <h2>How ordering works</h2>
          <p>
            Your cart sends us an order request on WhatsApp. An order is confirmed only when we
            confirm the price, details and dispatch date with you there.
          </p>

          <h2>Made to order</h2>
          <p>
            Every object is made to order in our Bengaluru studio and dispatched within 10 working
            days of your order being confirmed.
          </p>

          <h2>Prices and payment</h2>
          <p>
            Prices are shown in Indian rupees (₹). Nothing is paid on this website. Once we&apos;ve
            confirmed your order on WhatsApp, we send you payment details and you pay by bank transfer
            or UPI.
          </p>

          <h2>Shipping</h2>
          <p>We ship within India only, free of charge.</p>

          <h2>Returns, damage and custom pieces</h2>
          <p>
            Returns, damaged or wrong items, and custom pieces are covered by our{" "}
            <Link href="/shipping-returns">Shipping &amp; Returns policy</Link>, which forms part of
            these terms.
          </p>

          <h2>Personalisation</h2>
          <p>
            For personalised pieces (your own words, text, colour or object), we confirm the details
            with you before we start making it. Please check spelling, language and colour
            carefully: we make exactly what you approve.
          </p>

          <h2>Photos and visualisations</h2>
          <p>
            Some images are visualisations rather than photographs, and are labelled as such. Your
            piece is made to the specifications on its product page. Handmade objects, natural
            materials and screens can show small variations in colour and finish.
          </p>

          <h2>Liability</h2>
          <p>
            To the extent the law allows, our liability for any order is limited to the amount you
            paid for it. Nothing here limits rights you have under Indian consumer law.
          </p>

          <h2>Governing law</h2>
          <p>These terms are governed by the laws of India.</p>

          <h2>Contact</h2>
          <p>
            Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>, or see our <Link href="/contact">contact page</Link>{" "}
            and <Link href="/privacy">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
