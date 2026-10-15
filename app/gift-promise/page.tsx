import type { Metadata } from "next";
import CTA from "@/components/CTA";
import { products, isPurchasable } from "@/data/products";
import { BRAND_NAME, WISHLIST_MODE } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/gift-promise" },
  title: { absolute: `Gift Promise: Give It on Diwali, Delivered Soon After | ${BRAND_NAME}` },
  description:
    WISHLIST_MODE
      ? "Hand over a printable Gift Promise card on the day, and join the wishlist for the object. We'll message you as soon as it's ready to order."
      : "Order now and hand over a printable Gift Promise card on the day. The object follows, made to order and dispatched within 10 working days.",
};

// OWNER: the "change your mind before we start making it" line is a promise to
// customers. Confirm it before this page goes live.
export default function GiftPromisePage() {
  const orderable = products.filter(isPurchasable);
  return (
    <div className="section wrap" style={{ paddingTop: "clamp(24px,4vw,56px)" }}>
      <div className="pagehead" style={{ padding: 0 }}>
        <div className="pagehead__row"><span>GIFT PROMISE</span><span>FOR THE LATE AND THE LOVING</span></div>
        <h1 className="pagehead__title">Something is being made for you.</h1>
      </div>

      <div className="article" style={{ marginTop: "clamp(32px,5vw,64px)" }}>
        <div className="article__body">
          {WISHLIST_MODE ? (
          <p>
            Want to give something that isn&apos;t ready yet? Join the wishlist on the
            object&apos;s page and we&apos;ll message you as soon as it&apos;s ready to order.
            Meanwhile, make a Gift Promise card below to print or forward on the day, so
            they know something is being made for them. Once you order, it&apos;s made in
            Bengaluru and dispatched within 10 working days.
          </p>
          ) : (
          <p>
            Diwali got here faster than our lasers. So: order the object now, and we&apos;ll send
            you a Gift Promise card to print or forward on the day. It shows what&apos;s coming and
            when it leaves the studio. The real thing follows, made to order in Bengaluru and
            dispatched within 10 working days. Change your mind before we start making it? Just
            tell us.
          </p>
          )}
        </div>

        <div className="policy article__body" style={{ marginTop: "clamp(32px,5vw,56px)" }}>
          <h2>How it works</h2>
          <ul>
            {WISHLIST_MODE ? (
              <li>Pick the object and tap &ldquo;Join the wishlist&rdquo; on its page.</li>
            ) : (
              <li>Pick the object and order it as usual. Tick &ldquo;This is a gift&rdquo; in your cart.</li>
            )}
            <li>Make the card below, then print it or send it on WhatsApp.</li>
            <li>
              {WISHLIST_MODE
                ? "Hand it over on the day. We message you when it's ready to order, and the object follows."
                : "Hand it over on the day. The object follows, with tracking sent to you."}
            </li>
          </ul>
        </div>

        <form action="/gift-promise/card" method="get" className="promiseform">
          <h2 className="promiseform__title">Make the card</h2>
          <label>
            <span>The object</span>
            <select name="object" required defaultValue="">
              <option value="" disabled>Choose an object</option>
              {orderable.map((p) => (
                <option key={p.slug} value={p.slug}>{p.name}</option>
              ))}
            </select>
          </label>
          <label>
            <span>To</span>
            <input name="to" maxLength={40} placeholder="Their name" required />
          </label>
          <label>
            <span>From</span>
            <input name="from" maxLength={40} placeholder="Your name" required />
          </label>
          <button type="submit" className="cta cta--stamp">
            <span className="cta__label">MAKE MY CARD</span>
            <span className="cta__arrow">→</span>
          </button>
          <p className="promiseform__fine">Nothing you type here is saved. It only goes onto the card.</p>
        </form>

        <div style={{ marginTop: "clamp(32px,5vw,56px)", display: "flex", gap: "40px", flexWrap: "wrap" }}>
          <CTA href="/gift-guide" variant="stamp">SEE GIFT IDEAS</CTA>
          <CTA href="/shipping-returns" variant="link">SHIPPING &amp; RETURNS</CTA>
        </div>
      </div>
    </div>
  );
}
