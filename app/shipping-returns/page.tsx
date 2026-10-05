import type { Metadata } from "next";
import Link from "next/link";
import CTA from "@/components/CTA";
import { EMAIL, WHATSAPP_NUMBER } from "@/lib/site";

// Keep in step with Merchant Center (Settings → Shipping and returns) — Google
// checks that what's configured there matches this page.

export const metadata: Metadata = {
  alternates: { canonical: "/shipping-returns" },
  title: "Shipping & Returns",
  description:
    "Free shipping across India on every Look Here Studio order. 7-day returns on unused in-stock objects, with free pickup. Damaged in transit? We replace or refund.",
};

const WA = `https://wa.me/${WHATSAPP_NUMBER}`;
const WA_DISPLAY = "+91 93806 70901";

export default function ShippingReturnsPage() {
  return (
    <div className="section wrap" style={{ paddingTop: "clamp(24px,4vw,56px)" }}>
      <div className="pagehead" style={{ padding: 0 }}>
        <div className="pagehead__row"><span>SHIPPING &amp; RETURNS</span><span>INDIA-WIDE / FREE</span></div>
        <h1 className="pagehead__title">Getting it to you. And back, if it has to.</h1>
        <p className="pagehead__sub">
          The short version: shipping is free, unused in-stock objects can come back within
          7 days, and anything that arrives damaged gets replaced or refunded.
        </p>
      </div>

      <div className="article" style={{ marginTop: "clamp(32px,5vw,64px)" }}>
        <div className="article__body policy">
          <h2>Shipping</h2>
          <ul>
            <li><strong>Free on every order</strong>, anywhere in India. No minimum, no surprise fee at the end.</li>
            <li><strong>In-stock objects</strong> are dispatched within <strong>7–10 days</strong> of your order being confirmed.</li>
            <li><strong>Made-to-order objects</strong> are made after you order. Each product page shows its lead time (usually 1–3 weeks), and we dispatch as soon as it&apos;s done.</li>
            <li>Once your order ships, we send you the courier and tracking details on WhatsApp or email.</li>
            <li>Everything is packed corners-first, with acrylic and mirrors in protective film. Peel it off when it reaches you.</li>
            <li>We currently ship within India only. If you&apos;re outside India, <Link href="/contact">write to us</Link> and we&apos;ll see what we can do.</li>
          </ul>

          <h2>How orders work</h2>
          <p>
            Your cart sends us a product request on WhatsApp. We confirm availability, lead
            time and the total with you before you pay, so nothing is charged until you&apos;ve
            said yes.
          </p>

          <h2>Returns</h2>
          <ul>
            <li>You can return <strong>unused in-stock objects within 7 days of delivery</strong>, in their original packaging.</li>
            <li>To start a return, message us on <a href={WA} target="_blank" rel="noreferrer">WhatsApp</a> or email <a href={`mailto:${EMAIL}`}>{EMAIL}</a> with your name and order details.</li>
            <li><strong>We arrange the pickup and pay for it</strong>. You don&apos;t need to find a courier.</li>
            <li>Once the object reaches us and we&apos;ve checked it, we refund you to your original payment method within <strong>7 working days</strong>.</li>
          </ul>

          <h2>What can&apos;t be returned</h2>
          <ul>
            <li><strong>Made-to-order objects</strong>, which are made specifically for you after you order. The product page says &ldquo;Made to order&rdquo; on these.</li>
            <li><strong>Custom and personalised pieces</strong>, such as Four-Letter Words with your own text or a Pickleball Shadow Box built around your paddle.</li>
            <li><strong>Preorders</strong>, which are also made for you.</li>
          </ul>
          <p>
            These are final sale unless they arrive damaged or aren&apos;t what you ordered. In
            that case the section below applies.
          </p>

          <h2>Damaged or wrong item</h2>
          <ul>
            <li>Please <strong>record a video while you unbox</strong>. It makes a claim quick and painless.</li>
            <li>Tell us <strong>within 48 hours of delivery</strong>, with the unboxing video and a few photos of the damage, on <a href={WA} target="_blank" rel="noreferrer">WhatsApp</a> or by email.</li>
            <li>We&apos;ll <strong>replace the object or refund you in full</strong>, whichever you prefer, and arrange the pickup at our cost.</li>
            <li>This applies to every order, including made-to-order and custom pieces.</li>
          </ul>

          <h2>Questions</h2>
          <p>
            WhatsApp <a href={WA} target="_blank" rel="noreferrer">{WA_DISPLAY}</a> or email{" "}
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. A real person in the Bengaluru studio
            reads every message.
          </p>
        </div>

        <div style={{ marginTop: "clamp(32px,5vw,56px)", display: "flex", gap: "40px", flexWrap: "wrap" }}>
          <CTA href="/objects" variant="stamp">SEE THE OBJECTS</CTA>
          <CTA href="/contact" variant="link">CONTACT THE STUDIO</CTA>
        </div>
      </div>
    </div>
  );
}
