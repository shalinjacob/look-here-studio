import type { QA } from "@/lib/types";

// ---------------------------------------------------------------------------
// Category landing pages (/wall-clocks, /mirrors, …). Each answers "where can I
// buy X" directly, lists the objects and links the journal posts that go deeper.
// Copy only states facts from data/products.ts and the published policies.
// Text supports [label](/path) links and {price:slug} tokens.
// ---------------------------------------------------------------------------

export interface Category {
  slug: string;
  name: string; // H1 + nav label
  metaTitle: string;
  metaDescription: string;
  answer: string; // answer-first intro
  sections: { heading: string; paras: string[] }[];
  faq: QA[];
  products: string[];
  posts: string[]; // journal slugs
}

export const categories: Category[] = [
  {
    slug: "wall-clocks",
    name: "Wall clocks",
    metaTitle: "Designer Wall Clocks, Made in Bengaluru | Look Here Studio",
    metaDescription:
      "Two silent designer wall clocks made to order in Bengaluru: the layered orange Layer Clock and the Memphis-style Layered Wall Clock. Free shipping across India.",
    answer:
      "Look Here Studio makes two designer wall clocks in its Bengaluru studio: the [Layer Clock](/objects/layer-clock) ({price:layer-clock}), 30 cm of stacked wavy layers in a terracotta-to-orange gradient, and the [Layered Wall Clock](/objects/layered-wall-clock) ({price:layered-wall-clock}), 34 cm of overlapping primary-colour acrylic shapes. Both have silent sweep movements, are made to order and ship free anywhere in India.",
    sections: [
      {
        heading: "Which clock should I choose?",
        paras: [
          "The Layer Clock is the calm one: warm colours, made in layered MDF and acrylic, at home above a desk, console or kitchen counter. The Layered Wall Clock is the loud one: part clock, part small Memphis painting, made to be the thing people notice on a bigger wall.",
          "Not sure about size? Hold a sheet of newspaper cut to the clock's size against the wall before you order. More tips in [How to choose a wall clock you'll actually look at](/journal/why-we-started-with-a-clock).",
        ],
      },
    ],
    faq: [
      { q: "Are your wall clocks silent?", a: "Yes. Both use silent sweep movements, so there's no ticking." },
      { q: "How are they hung?", a: "Each hangs on a single wall screw. The Layer Clock runs on one AA battery." },
      { q: "How long does a clock take to arrive?", a: "Each clock is made to order and dispatched within 10 working days of your order being confirmed, with free shipping anywhere in India." },
    ],
    products: ["layer-clock", "layered-wall-clock"],
    posts: ["why-we-started-with-a-clock", "in-defence-of-the-slightly-wrong"],
  },
  {
    slug: "mirrors",
    name: "Mirrors",
    metaTitle: "Wavy & Statement Mirrors, Made in Bengaluru | Look Here Studio",
    metaDescription:
      "Wavy, full-length and lettered statement mirrors in pink, butter yellow and oxblood, made to order in Bengaluru. Free shipping across India.",
    answer:
      "Look Here Studio makes three statement mirrors in Bengaluru: the [Pink Wavy Mirror](/objects/pink-wavy-mirror) ({price:pink-wavy-mirror}, 50 × 60 cm), the full-length [Ripple Mirror](/objects/ripple-mirror) in butter yellow ({price:ripple-mirror}, 80 × 160 cm) and [Well, Look At You](/objects/well-look-at-you), an oxblood wavy mirror with lettering around the rim ({price:well-look-at-you}, 60 × 60 cm). All are made to order and ship free across India.",
    sections: [
      {
        heading: "Which mirror goes where?",
        paras: [
          "The Pink Wavy Mirror is small enough for an entryway and loud enough to notice on the way out. The Ripple Mirror is the full-length one: lean it against a wall or fix it with the included bracket. Well, Look At You is a mirror and a small daily compliment, made for the spot by the front door.",
        ],
      },
    ],
    faq: [
      { q: "Do you make a full-length mirror?", a: "Yes, the [Ripple Mirror](/objects/ripple-mirror): 80 × 160 cm, in butter yellow. It leans against the wall or can be wall-fixed with the included bracket." },
      { q: "How are the smaller mirrors hung?", a: "The Pink Wavy Mirror and Well, Look At You hang on two D-rings with a wire." },
      { q: "How do I clean them?", a: "Spray glass cleaner on the cloth, never directly on the frame." },
    ],
    products: ["pink-wavy-mirror", "ripple-mirror", "well-look-at-you"],
    posts: ["in-defence-of-the-slightly-wrong"],
  },
  {
    slug: "led-wall-art",
    name: "LED wall art",
    metaTitle: "LED Backlit Wall Art & Light Boxes in India | Look Here Studio",
    metaDescription:
      "Backlit art prints, bold quote frames and custom light boxes in slim LED frames. Plug in and the wall glows. Made to order in Bengaluru, free shipping in India.",
    answer:
      "Look Here Studio makes backlit wall art in slim LED frames: four art-print [Editions](/collections/editions) (A2, {price:blood-moon} each), the [Slim LED Quote Frame](/objects/slim-led-quote-frame) with five bold quotes (A1, {price:slim-led-quote-frame}) and the [Custom Lightbox](/objects/custom-lightbox), which lights up your own words in any language ({price:custom-lightbox}). Each plugs into a regular socket and is made to order in Bengaluru.",
    sections: [
      {
        heading: "What is backlit wall art?",
        paras: [
          "It's a print or panel lit from behind by LEDs inside a slim frame, so the image glows instead of just hanging there. Switched off, it reads as a framed print; switched on, it's often the last thing glowing in the room.",
        ],
      },
      {
        heading: "Which one should I choose?",
        paras: [
          "For art: the Editions, from an old-master portrait with a twist to a botanical pomegranate plate. For a line to live by: the Slim LED Quote Frame. For your own words, a name or a favourite line of poetry: the Custom Lightbox.",
        ],
      },
    ],
    faq: [
      { q: "Does LED wall art need a power socket?", a: "Yes. Each piece plugs into a regular socket. The Slim LED Quote Frame runs at 12 V, 13.5 W." },
      { q: "What sizes are available?", a: "Editions are A2 (420 × 594 mm). The Slim LED Quote Frame is A1 (650 × 900 mm overall). The Custom Lightbox is 900 × 150 mm." },
      { q: "Can I get my own words lit up?", a: "Yes, with the [Custom Lightbox](/objects/custom-lightbox): any text, any language, any light colour." },
    ],
    products: ["old-habits", "smoke-and-feathers", "pomegranate-study", "blood-moon", "slim-led-quote-frame", "custom-lightbox"],
    posts: [],
  },
  {
    slug: "wall-art",
    name: "Wall art",
    metaTitle: "Metal & Typographic Wall Art, Made in Bengaluru | Look Here Studio",
    metaDescription:
      "Laser-cut steel wall art, mirror-gold lettering, cut-through word panels and backlit quote frames. Made to order in Bengaluru, free shipping across India.",
    answer:
      "Look Here Studio's wall art is laser-cut and lettered in its Bengaluru studio: steel silhouettes like [Cat Got Your Heart](/objects/cat-got-your-heart) ({price:cat-got-your-heart}) and [Small Planet](/objects/small-planet) ({price:small-planet}), mirror-gold [Love More](/objects/love-more) lettering ({price:love-more}), [Four-Letter Words](/objects/four-letter-words) panels ({price:four-letter-words} for two) and the backlit [Slim LED Quote Frame](/objects/slim-led-quote-frame). All made to order, shipped free across India.",
    sections: [
      {
        heading: "Metal or words?",
        paras: [
          "The steel pieces are cut from a single sheet, so the wall behind becomes part of the design: the heart in Cat Got Your Heart, the sky in Small Planet. The word pieces say something: LOVE MORE in chunky mirror-gold, or a four-letter word routed straight through a glossy panel. You can see how they're made in [Notes from the laser bed](/journal/notes-from-the-laser-bed).",
        ],
      },
    ],
    faq: [
      { q: "Can I choose my own word?", a: "Yes. [Four-Letter Words](/objects/four-letter-words) comes in LOOK + HERE, LOVE + MORE, KISS, or your own words." },
      { q: "How is the metal wall art hung?", a: "Cat Got Your Heart has two keyholes and sits flush; Small Planet uses keyhole fixings and sits a few millimetres off the wall for a soft shadow." },
      { q: "Is there wall art for kids' rooms?", a: "[Small Planet](/objects/small-planet), two friends on a tiny planet under the stars, is made for nurseries, reading corners and kids' rooms." },
    ],
    products: ["cat-got-your-heart", "small-planet", "love-more", "four-letter-words", "slim-led-quote-frame"],
    posts: ["notes-from-the-laser-bed", "in-defence-of-the-slightly-wrong"],
  },
  {
    slug: "personalised-gifts",
    name: "Personalised gifts",
    metaTitle: "Personalised Home Gifts, Made in Bengaluru | Look Here Studio",
    metaDescription:
      "Custom name and quote lightboxes, your-own-word wall panels and personalised pickleball paddle frames. Made to order in Bengaluru, free shipping across India.",
    answer:
      "Look Here Studio makes three personalised objects for the home: the [Custom Lightbox](/objects/custom-lightbox) with your words in any language and any light colour ({price:custom-lightbox}), [Four-Letter Words](/objects/four-letter-words) panels cut with your own words ({price:four-letter-words} for two), and the [Pickleball Shadow Box](/objects/pickleball-shadow-box), which frames a paddle with names, a score or a club crest ({price:pickleball-shadow-box}). Each is made to order in Bengaluru.",
    sections: [
      {
        heading: "How does personalisation work?",
        paras: [
          "For the Custom Lightbox and Four-Letter Words, type your text on the product page before adding it to your cart. For the Pickleball Shadow Box, share the details on WhatsApp after you send your request. Either way, we confirm everything with you on WhatsApp before we start making it.",
          "For more gift ideas, see [What makes a good gift?](/journal/what-a-good-gift-actually-is) or the [gift guide](/gift-guide).",
        ],
      },
    ],
    faq: [
      { q: "Can personalised gifts be returned?", a: "Personalised pieces are final sale, unless they arrive damaged or aren't what you ordered. See [shipping and returns](/shipping-returns)." },
      { q: "Can you add a gift note?", a: "Yes. Tick “This is a gift” in your cart and add a short note; we handwrite it on a card." },
      { q: "Do you do corporate or wedding gifting?", a: "Yes, made to order in small runs. [Tell us what you need](/contact)." },
    ],
    products: ["custom-lightbox", "four-letter-words", "pickleball-shadow-box"],
    posts: ["what-a-good-gift-actually-is", "why-we-make-things-in-small-runs"],
  },
  {
    slug: "frames-and-shelves",
    name: "Frames & shelves",
    metaTitle: "Photo Frames & Picture Ledges, Made in Bengaluru | Look Here Studio",
    metaDescription:
      "Oversized-mount photo frames, a photobooth strip frame, acrylic picture ledges and a pickleball shadow box. Made to order in Bengaluru, free shipping in India.",
    answer:
      "Look Here Studio makes frames and shelves for showing off the things you love: the [Square Frame](/objects/square-frame) set of three ({price:square-frame}), the [Strip Frame](/objects/strip-frame) for photobooth strips ({price:strip-frame}), the [Clear Ledge](/objects/clear-ledge), a 60 cm acrylic picture ledge in clear or colours ({price:clear-ledge} each), and the [Pickleball Shadow Box](/objects/pickleball-shadow-box). All made to order in Bengaluru.",
    sections: [
      {
        heading: "Frame or ledge?",
        paras: [
          "Frames fix a picture in place: the Square Frame floats a small print in a wide mount, and the Strip Frame is sized exactly for a photobooth strip. A ledge lets you lean and rearrange: frames, records, spice jars, whatever you like, with no new nail holes each time.",
        ],
      },
    ],
    faq: [
      { q: "How much can the Clear Ledge hold?", a: "Up to 5 kg per ledge. It's 60 cm long and 10.5 cm deep." },
      { q: "What colours does the Clear Ledge come in?", a: "Clear, orange, red, cyan, blue or purple, all at the same price. Ask on WhatsApp for other colours." },
      { q: "How are the frames hung?", a: "The Square Frames take one screw each (a template is included); the Strip Frame hangs on a single screw via a keyhole mount." },
    ],
    products: ["square-frame", "strip-frame", "clear-ledge", "pickleball-shadow-box"],
    posts: [],
  },
  {
    slug: "table-decor",
    name: "Table decor",
    metaTitle: "Designer Table Decor: Lamp, Coasters & Brass Game | Look Here Studio",
    metaDescription:
      "A fluorescent acrylic table lamp, wavy patterned coasters and a brass-and-marble noughts and crosses set. Made to order in Bengaluru, free shipping in India.",
    answer:
      "For tables and shelves, Look Here Studio makes the [Acrylic Lamp](/objects/acrylic-lamp), a glowing slab of fluorescent orange acrylic ({price:acrylic-lamp}), [Patterned Coasters](/objects/patterned-coasters), four wavy resin coasters with cork bases ({price:patterned-coasters}), and [X + O](/objects/x-plus-o), noughts and crosses in solid brass on marble ({price:x-plus-o}). All made to order in Bengaluru.",
    sections: [
      {
        heading: "What makes a good coffee-table object?",
        paras: [
          "Something people pick up. The coasters get used every day, the brass game starts arguments, and the lamp makes the corner glow. Read more in [Do you really need coasters?](/journal/coasters-deserve-better) and [Does brass tarnish?](/journal/brass-gets-better-when-you-ignore-it).",
        ],
      },
    ],
    faq: [
      { q: "Is there a good table gift under ₹5,000?", a: "Yes: [Patterned Coasters](/objects/patterned-coasters) ({price:patterned-coasters} for four) or [X + O](/objects/x-plus-o) ({price:x-plus-o})." },
      { q: "Does the Acrylic Lamp come with a bulb?", a: "Yes, a globe bulb is included. It plugs into a regular socket." },
      { q: "How do I care for the coasters?", a: "Hand wash them. The cork base keeps your table safe." },
    ],
    products: ["acrylic-lamp", "patterned-coasters", "x-plus-o"],
    posts: ["coasters-deserve-better", "brass-gets-better-when-you-ignore-it", "acrylic-is-not-plastic"],
  },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const categoriesFor = (productSlug: string) => categories.filter((c) => c.products.includes(productSlug));
