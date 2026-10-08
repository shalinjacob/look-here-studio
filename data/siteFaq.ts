import type { QA } from "@/lib/types";

// The /faq hub. Answers restate the published policies (/shipping-returns,
// /terms) and how ordering works — keep them in step if a policy changes.
export const siteFaq: { group: string; items: QA[] }[] = [
  {
    group: "Ordering & payment",
    items: [
      { q: "How do I order from Look Here Studio?", a: "Add objects to your cart and tap “Send product request”. That opens WhatsApp with your order filled in. We confirm the price, details and dispatch date with you there, then send you payment details." },
      { q: "Can I pay on the website?", a: "No. Nothing is paid on the website. Payment is arranged on WhatsApp after we confirm your order. We'll never ask for your card details, an OTP or a PIN." },
      { q: "When is my order confirmed?", a: "When we confirm the price, details and dispatch date with you on WhatsApp." },
      { q: "Can I ask a question before ordering?", a: "Of course. WhatsApp +91 93806 70901 or email hello@lookherestudio.in, or use the “Ask on WhatsApp” button on any product page." },
    ],
  },
  {
    group: "Delivery",
    items: [
      { q: "How long does delivery take?", a: "Everything is made to order and dispatched within 10 working days of your order being confirmed. Weekends and studio holidays don't count as working days. We send you the courier tracking on WhatsApp or email once it ships." },
      { q: "Is shipping free?", a: "Yes, free shipping anywhere in India, with no minimum order." },
      { q: "Do you ship outside India?", a: "Not currently. If you're outside India, [write to us](/contact) and we'll see what we can do." },
      { q: "Can I get it in time for Diwali or a birthday?", a: "Tell us your date when you order and we'll be straight with you about whether it'll make it. Missed it? Our [Gift Promise](/gift-promise) gives you a printable card to hand over on the day." },
    ],
  },
  {
    group: "Made to order & personalisation",
    items: [
      { q: "What does made to order mean?", a: "Your piece is made after you order it, in our Bengaluru studio, not pulled from a warehouse. More in [What does 'made to order' mean?](/journal/why-we-make-things-in-small-runs)" },
      { q: "Which objects can be personalised?", a: "The [Custom Lightbox](/objects/custom-lightbox) (your words, any language, any light colour), [Four-Letter Words](/objects/four-letter-words) (your own words) and the [Pickleball Shadow Box](/objects/pickleball-shadow-box) (names, scores or a club crest). See all [personalised gifts](/personalised-gifts)." },
      { q: "Can I change the colour or size?", a: "On many made-to-order pieces, yes. The [Clear Ledge](/objects/clear-ledge) comes in clear, orange, red, cyan, blue or purple. For anything else, ask us on WhatsApp before you order." },
      { q: "Do you take commissions or bulk orders?", a: "Yes: commissions, custom words, and corporate and wedding gifting, made to order in small runs. [Tell us what you need](/contact)." },
    ],
  },
  {
    group: "Off The Wall tees",
    items: [
      { q: "What are Off The Wall tees?", a: "Our art, made to wear: 100% cotton tees (190–240 GSM), regular or oversized, XS–XXL, each with a big print on the front. [See all tees](/off-the-wall)." },
      { q: "Can I exchange a tee for another size?", a: "Yes, free within 7 days of delivery if it's unworn, unwashed and the tags are on. Tees aren't refundable unless damaged or wrong." },
    ],
  },
  {
    group: "Returns & damage",
    items: [
      { q: "Can I return something?", a: "Unused standard objects (not tees, which are size-exchange only) can be returned within 7 days of delivery, in their original packaging. We arrange the pickup and pay for it, and refund you within 7 working days of receiving it. Full details on [shipping and returns](/shipping-returns)." },
      { q: "Can personalised pieces be returned?", a: "Custom and personalised pieces are final sale, unless they arrive damaged or aren't what you ordered." },
      { q: "What if my order arrives damaged?", a: "Record a video while you unbox, and tell us within 48 hours of delivery with the video and photos. We'll replace it or refund you in full, and arrange the pickup at our cost." },
    ],
  },
  {
    group: "Gifting",
    items: [
      { q: "Can you add a gift note?", a: "Yes. Tick “This is a gift” in your cart and add a short note; we handwrite it on a card." },
      { q: "Do you have gift ideas?", a: "Our [gift guide](/gift-guide) sorts objects by budget, person and occasion, with ready-made edits of three objects at their usual prices." },
    ],
  },
  {
    group: "The studio",
    items: [
      { q: "Where is Look Here Studio?", a: "In Bengaluru, Karnataka, India. Everything is designed and made in our own studio, which grew out of a signage workshop. [More about us](/why-look-here)." },
      { q: "What materials do you use?", a: "Mostly acrylic, steel and MDF, plus mirror glass, wood and LED light. See [how our objects are made](/process)." },
    ],
  },
];
