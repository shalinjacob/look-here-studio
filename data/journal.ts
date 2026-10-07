import type { JournalPost } from "@/lib/types";

// The "Journal" / Notes. Editorial entries. Add one and it gets a route at
// /journal/<slug> automatically.

export const journal: JournalPost[] = [
  {
    slug: "why-we-started-with-a-clock",
    index: "001",
    title: "How to choose a wall clock you'll actually look at (and why we started with one)",
    date: "2026-08-18",
    updated: "2026-10-07",
    category: "Guide",
    excerpt:
      "The most looked-at object in most homes is also the most ignored. How to pick a wall clock worth the glance, and why it was the first thing we made.",
    description:
      "How to choose a wall clock: readable at a glance, silent, sized to the wall, and worth looking at. Plus why a Bengaluru design studio started with one.",
    readingTime: "",
    answer:
      "A good wall clock does three things: you can read it in half a second from across the room, it doesn't tick at you at 2 a.m., and it's sized for the wall it's on. Get those right and it's allowed to be interesting too. That's why the [Layer Clock](/objects/layer-clock) was the first thing we ever made.",
    body: [],
    sections: [
      {
        heading: "Why start a design studio with a clock?",
        paras: [
          "Every home has a clock. Almost nobody chose it. It came with the wall, or the wedding, or the hardware shop down the road, and now it just hangs there being correct.",
          "That's a strange thing for an object you look at fifty times a day. So the [Layer Clock](/objects/layer-clock) came first: not to reinvent timekeeping, but to make the glance worth something. It's built from stacked, wavy layers that step down into the dial, so the time sits at the bottom of a small warm crater.",
        ],
      },
      {
        heading: "What makes a wall clock easy to read?",
        paras: [
          "Contrast and clear hands. A plain dial under bold hands beats a busy face with tiny numerals every time, and you don't actually need numbers at all: twelve o'clock, three, six and nine do the work. Both of ours keep the dial plain and let the hands do the talking.",
        ],
      },
      {
        heading: "Ticking or silent?",
        paras: [
          "If the clock lives in a bedroom, study or anywhere quiet, choose a silent sweep movement: the second hand glides instead of stepping, so there's no tick. The [Layer Clock](/objects/layer-clock) and the [Layered Wall Clock](/objects/layered-wall-clock) both use silent sweep movements.",
        ],
      },
      {
        heading: "What size wall clock do I need?",
        paras: [
          "Hold a sheet of newspaper cut to the clock's size against the wall before you buy. Around 30 cm (the Layer Clock is 30 × 30 cm) sits well above a desk, a console or a kitchen counter. Around 34 cm (the Layered Wall Clock) holds its own on a bigger stretch of wall. On a really large wall, pair the clock with a frame or two rather than buying a giant clock.",
        ],
      },
      {
        heading: "Which of our clocks should I pick?",
        paras: [
          "The [Layer Clock](/objects/layer-clock) ({price:layer-clock}) is the warm, calm one: a terracotta-to-orange gradient in layered MDF and acrylic. The [Layered Wall Clock](/objects/layered-wall-clock) ({price:layered-wall-clock}) is the loud one: overlapping primary-colour acrylic shapes with a floating yellow dial, part clock, part small painting. Both are made to order in Bengaluru and dispatched within 10 working days.",
        ],
      },
    ],
    faq: [
      { q: "Are Look Here Studio clocks silent?", a: "Yes. Both the Layer Clock and the Layered Wall Clock use silent sweep movements, so there's no ticking." },
      { q: "How do you hang the Layer Clock?", a: "On a single wall screw. It runs on one AA battery." },
      { q: "How long does a clock take to arrive?", a: "Each clock is made to order and dispatched within 10 working days of your order being confirmed, with free shipping anywhere in India." },
    ],
    products: ["layer-clock", "layered-wall-clock"],
  },
  {
    slug: "acrylic-is-not-plastic",
    index: "002",
    title: "Is acrylic plastic? What cast acrylic actually is (a small rant)",
    date: "2026-07-30",
    updated: "2026-10-07",
    category: "Material",
    excerpt:
      "People hear 'acrylic' and picture a cheap phone case. Here's what we actually mean, and why we use it.",
    description:
      "Is acrylic a plastic? Technically yes, but cast acrylic is optically clear, coloured all the way through and glows at the edge. How it differs, and how to care for it.",
    readingTime: "",
    answer:
      "Technically, yes: acrylic (PMMA) is a plastic. But cast acrylic has very little in common with the flimsy stuff the word suggests. It's rigid, optically clear, holds colour all the way through and glows at its cut edges, which is why signage makers and designers have used it for decades.",
    body: [],
    sections: [
      {
        heading: "So why does acrylic get a bad name?",
        paras: [
          "Because it shares a shelf, in most minds, with disposable tat. Thin, scratched, yellowing plastic is what people picture. Thick cast acrylic sheet is a different thing: dense, glassy and heavy enough that people are surprised when they pick it up.",
        ],
      },
      {
        heading: "What can acrylic do that wood or brass can't?",
        paras: [
          "It carries colour all the way through, so there's no paint to chip. It glows at the cut edge, catching light and channelling it to the edges. And it can be translucent, so an acrylic object changes completely depending on what's behind it and what time of day it is.",
          "That edge glow is the whole idea behind the [Acrylic Lamp](/objects/acrylic-lamp): a single 20 mm slab of fluorescent orange acrylic that lights up where the light catches it.",
        ],
      },
      {
        heading: "Is it hard to work with?",
        paras: [
          "It fights back. It scratches. It melts if the laser lingers. It cracks if you drill it wrong. Test 04 was too red. Test 09 cracked at the corner. Test 14 was, finally, right. We came to acrylic from a signage workshop, so we've had years to learn its moods.",
        ],
      },
      {
        heading: "How do you clean acrylic without scratching it?",
        paras: [
          "Use a soft cloth, slightly damp, and nothing abrasive: no scouring pads, no paper towels rubbed hard, no harsh cleaners. Dust it gently. That's all our acrylic pieces need.",
        ],
      },
    ],
    faq: [
      { q: "Is acrylic the same as plastic?", a: "Acrylic (PMMA) is a type of plastic, but cast acrylic sheet is rigid, glass-clear and coloured right through, unlike thin everyday plastics." },
      { q: "Does acrylic scratch?", a: "It can. Clean it with a soft, slightly damp cloth and avoid anything abrasive." },
      { q: "Which Look Here objects are made of acrylic?", a: "The [Acrylic Lamp](/objects/acrylic-lamp), the [Layered Wall Clock](/objects/layered-wall-clock), [Love More](/objects/love-more) (mirror-gold acrylic) and the face of the [Layer Clock](/objects/layer-clock), among others." },
    ],
    products: ["acrylic-lamp", "layered-wall-clock", "love-more"],
  },
  {
    slug: "in-defence-of-the-slightly-wrong",
    index: "003",
    title: "What makes a statement piece? In defence of the slightly wrong",
    date: "2026-09-10",
    updated: "2026-10-07",
    category: "Object",
    excerpt:
      "A clock that's also a painting. A game nobody finishes. On why a little friction is the entire point.",
    description:
      "What makes a home object a statement piece: it does an ordinary job in an unexpected form. How to choose one and where to put it, from a Bengaluru design studio.",
    readingTime: "",
    answer:
      "A statement piece does an ordinary job (telling the time, reflecting your face, holding a game) in a form you didn't expect. It still works; it just refuses to disappear. One per wall or surface is usually enough.",
    body: [],
    sections: [
      {
        heading: "Why do most home objects disappear?",
        paras: [
          "Most objects try to disappear into usefulness: do the job, ask nothing, be forgotten. We keep making things that refuse to do that.",
          "The [Layered Wall Clock](/objects/layered-wall-clock) is a small Memphis painting that happens to have hands. [X + O](/objects/x-plus-o) is noughts-and-crosses in solid brass on marble, permanently mid-argument. [Well, Look At You](/objects/well-look-at-you) is a mirror that compliments you back.",
        ],
      },
      {
        heading: "Why a little friction works",
        paras: [
          "An object you have to meet halfway is an object you actually notice. Frictionless is only another word for invisible.",
          "We're not against useful. Every one of these still tells the time, frames the face, settles the argument. They just decline to be furniture about it.",
        ],
      },
      {
        heading: "How do I style a statement piece?",
        paras: [
          "Give it room. One bold object per wall or surface, with quieter things around it. Put it where people already look: opposite the front door, above a console, at the end of a corridor. If it's colourful, let it be the only strong colour in that view.",
        ],
      },
    ],
    faq: [
      { q: "What counts as a statement piece in home decor?", a: "An object that does a normal job in an unexpected form, so it gets noticed: a clock that reads like a painting, a mirror with lettering, a brass game on the coffee table." },
      { q: "How many statement pieces should a room have?", a: "Usually one per wall or surface, with calmer objects around it so it has room to work." },
    ],
    products: ["layered-wall-clock", "x-plus-o", "well-look-at-you"],
  },
  {
    slug: "notes-from-the-laser-bed",
    index: "004",
    title: "How laser-cut home decor is made: notes from the laser bed",
    date: "2026-09-08",
    updated: "2026-10-07",
    category: "Process",
    excerpt:
      "Test 04 was too red. Test 09 cracked. Test 14 was, finally, right. How our objects are actually made, offcut bin included.",
    description:
      "How laser-cut home decor is made, step by step: cut, finish, print or etch, assemble, pack. An honest look inside a Bengaluru design studio.",
    readingTime: "",
    answer:
      "Every Look Here object goes through the same five steps in our Bengaluru studio: cut (laser, one clean pass), finish (edges eased by hand), print or etch (colour and detail), assemble, and pack (corners first, always). Most designs only arrive on the fourth or fifth attempt.",
    body: [],
    sections: [
      {
        heading: "What actually happens on the laser bed?",
        paras: [
          "The design goes in as a drawing; the laser follows it through the sheet. For acrylic, the beam melts a clean path, and if it lingers half a second too long the edge bubbles. For steel pieces like [Cat Got Your Heart](/objects/cat-got-your-heart) and [Small Planet](/objects/small-planet), the whole silhouette comes out of a single sheet, and the gaps are as much the design as the metal.",
        ],
      },
      {
        heading: "What happens after cutting?",
        paras: [
          "Edges are eased by hand. Then colour and detail go on by printing or etching, the pieces are assembled (standoffs and patience), and everything is packed corners-first. You can see the full sequence on our [process page](/process).",
        ],
      },
      {
        heading: "Why keep the failures?",
        paras: [
          "People imagine the studio as clean drawings turning smoothly into objects. It's mostly a bin of offcuts and a shelf of things that didn't work. Test 04, too red. Test 09, cracked at the corner. Test 14, right. It's the least glamorous shelf in the building and easily the most useful one.",
          "Nothing arrives fully formed. It arrives on the fourth try, usually, and only because we bothered to keep the first three.",
        ],
      },
    ],
    faq: [
      { q: "Where are Look Here objects made?", a: "In our own studio in Bengaluru: cut, finished, assembled and packed in-house." },
      { q: "What materials do you laser-cut?", a: "Mostly acrylic, steel and MDF, plus wood for frames and brass for [X + O](/objects/x-plus-o)." },
      { q: "How long does it take to make an object?", a: "Everything is made to order and dispatched within 10 working days of your order being confirmed." },
    ],
    products: ["cat-got-your-heart", "small-planet", "layer-clock"],
  },
  {
    slug: "why-we-make-things-in-small-runs",
    index: "005",
    title: "What does 'made to order' mean? Why we make things in small runs",
    date: "2026-09-01",
    updated: "2026-10-07",
    category: "Studio",
    excerpt:
      "We make it after you order. The unglamorous economics, and the real point, of not filling a warehouse.",
    description:
      "Made to order means your piece is made after you order. At Look Here Studio that's dispatch within 10 working days and free shipping across India. Here's why we work this way.",
    readingTime: "",
    answer:
      "Made to order means your piece is made after you order it, not pulled off a warehouse shelf. At Look Here Studio, everything is made to order in Bengaluru and dispatched within 10 working days of your order being confirmed, with free shipping anywhere in India.",
    body: [],
    sections: [
      {
        heading: "Why not just keep stock?",
        paras: [
          "Partly honesty. We don't yet know which objects people will love most, so filling a warehouse would just be a guess wearing the costume of confidence.",
          "Partly because it's better. A small run means we can change the finish on object twelve because object eleven taught us something. Mass production can't do that; it's already committed to its own first mistake.",
        ],
      },
      {
        heading: "How long does made to order take?",
        paras: [
          "Up to 10 working days from confirmation to dispatch, then the courier's time to reach you. Weekends and studio holidays don't count as working days. If you're buying for a date, tell us when you order and we'll be straight with you about whether it'll make it.",
        ],
      },
      {
        heading: "When does the clock start?",
        paras: [
          "When we confirm your order. Your cart sends us a request on WhatsApp; we confirm the price, details and dispatch date with you there, and that's day zero.",
        ],
      },
      {
        heading: "What do I get in return for waiting?",
        paras: [
          "Something made recently, by people who could still change their mind (which, occasionally, we do). It also means colour and size tweaks are often possible, and personalised pieces like the [Custom Lightbox](/objects/custom-lightbox) or [Four-Letter Words](/objects/four-letter-words) in your own words are simply how we work anyway.",
        ],
      },
    ],
    faq: [
      { q: "How long does Look Here Studio take to dispatch?", a: "Everything is made to order and dispatched within 10 working days of your order being confirmed." },
      { q: "Is shipping free?", a: "Yes, free shipping anywhere in India, with no minimum order. We ship within India only." },
      { q: "Can I return a made-to-order piece?", a: "Unused standard objects can be returned within 7 days of delivery, with free pickup. Personalised pieces are final sale unless they arrive damaged. Full details on our [shipping and returns page](/shipping-returns)." },
    ],
    products: ["custom-lightbox", "four-letter-words"],
  },
  {
    slug: "brass-gets-better-when-you-ignore-it",
    index: "006",
    title: "Does brass tarnish? Patina, polish, and why we don't lacquer ours",
    date: "2026-08-25",
    updated: "2026-10-07",
    category: "Material",
    excerpt:
      "On patina, and why we don't lacquer the life out of our brass.",
    description:
      "Yes, unlacquered brass darkens over time. That patina is harmless, and a little polish brings the shine back. How to care for brass, and why we let ours age.",
    readingTime: "",
    answer:
      "Yes. Unlacquered brass slowly darkens as it reacts with the air and your hands. That patina is harmless and, to our eyes, an improvement. If you prefer it bright, a soft cloth and a little brass polish bring the shine back in a minute.",
    body: [],
    sections: [
      {
        heading: "What is patina?",
        paras: [
          "New brass is loud: mirror-bright, a little showy, trying hard. Left alone, it calms down. The shine softens, the tone deepens, and it slowly starts to look like it belongs to you. That change is patina.",
        ],
      },
      {
        heading: "Why don't you lacquer your brass?",
        paras: [
          "Most brass products are sealed under a thick lacquer that freezes the factory shine in place. We mostly don't. Our brass is meant to age, and you get to decide how far.",
        ],
      },
      {
        heading: "How do I clean brass?",
        paras: [
          "To restore the shine, rub gently with a soft cloth and a little brass polish, then buff dry. To keep the softened look, do nothing at all: the more honest option, and free.",
          "It's the rare object that improves while you neglect it. Enjoy that. It isn't going to happen with your phone.",
        ],
      },
    ],
    faq: [
      { q: "Does brass go dark over time?", a: "Unlacquered brass does. It's a natural, harmless patina, not damage." },
      { q: "How do I make brass shiny again?", a: "A soft cloth and a little brass polish, then buff dry." },
      { q: "Which Look Here object is brass?", a: "[X + O](/objects/x-plus-o): solid brass Xs and Os on a white marble board." },
    ],
    products: ["x-plus-o"],
  },
  {
    slug: "coasters-deserve-better",
    index: "007",
    title: "Do you really need coasters? (Yes. And they deserve better.)",
    date: "2026-08-12",
    updated: "2026-10-07",
    category: "Object",
    excerpt:
      "The most-used object on your table is usually the ugliest. It really doesn't have to be.",
    description:
      "Coasters stop condensation and heat from leaving rings on wood and stone. Why they matter, what to look for, and why ours are wavy, patterned and cork-backed.",
    readingTime: "",
    answer:
      "Yes. A cold glass drips condensation and a hot mug leaves heat, and either one can leave a pale ring on wood or a mark on stone. A coaster with a soft, absorbent base, like cork, stops that. It also doesn't have to be the ugliest thing on your table.",
    body: [],
    sections: [
      {
        heading: "Why are coasters usually so boring?",
        paras: [
          "Coasters are the last thing anyone designs and the first thing anyone reaches for. Cork, or a freebie from a bank, or nothing at all: a ring on the wood and a small domestic argument ten minutes later.",
          "That seemed backwards. The object that meets every cup, every day, every guest, somehow gets the least thought. So we gave it the most.",
        ],
      },
      {
        heading: "What should I look for in a coaster?",
        paras: [
          "A base that won't scratch your table (cork is ideal), a top that wipes clean, and a size that fits your mugs; 10 cm square covers most. Then pick something you actually like looking at, because you'll see it every day.",
        ],
      },
      {
        heading: "What are Look Here coasters like?",
        paras: [
          "Our [Patterned Coasters](/objects/patterned-coasters) come as a set of four, each 10 × 10 cm with a wavy edge and its own pattern: stripes, checks, ripples, no two the same. They're cast resin with a cork base, so they protect the table and wash clean by hand. {price:patterned-coasters} for the set.",
          "Small object, bigger day. That's the whole coaster manifesto, and we're standing by it.",
        ],
      },
    ],
    faq: [
      { q: "Do coasters protect wooden tables?", a: "Yes. They stop condensation and heat from leaving rings, especially if the base is cork." },
      { q: "How do I clean resin coasters?", a: "Hand wash them. The cork base keeps your table safe." },
      { q: "Are coasters a good housewarming gift?", a: "A good set is: everyone uses them, nobody buys nice ones for themselves. Pair them with [X + O](/objects/x-plus-o) for a coffee-table gift." },
    ],
    products: ["patterned-coasters", "x-plus-o"],
  },
  {
    slug: "what-a-good-gift-actually-is",
    index: "008",
    title: "What makes a good gift? A short theory, and home decor gift ideas",
    date: "2026-09-14",
    updated: "2026-10-07",
    category: "Gifting",
    excerpt:
      "It isn't about price, and it definitely isn't a scented candle. A short theory, ahead of the season.",
    description:
      "A good gift proves you were paying attention. Home decor gift ideas sorted by person and budget, from under ₹5,000 to statement pieces, with free shipping across India.",
    readingTime: "",
    answer:
      "A good gift is proof you were paying attention. The price matters far less than how specific it is to the person. Start from who they are (the host, the one who has everything, the design obsessive), not from a budget.",
    body: [],
    sections: [
      {
        heading: "Why does the scented candle fail?",
        paras: [
          "Not because it's cheap, but because it's a shrug. It says “I know you have a nose.” A gift should say “I know you.”",
        ],
      },
      {
        heading: "Gift ideas by person",
        paras: [
          "For the host: [Patterned Coasters](/objects/patterned-coasters) and the [X + O](/objects/x-plus-o) board, to settle who does the dishes. For the one who has everything: something gloriously unnecessary, like the [Layered Wall Clock](/objects/layered-wall-clock). For the design obsessive: a backlit [Edition](/collections/editions). For someone with a line they live by: a [Custom Lightbox](/objects/custom-lightbox) with it written in light, in any language.",
        ],
      },
      {
        heading: "Gift ideas by budget",
        paras: [
          "Under ₹5,000: [Patterned Coasters](/objects/patterned-coasters) ({price:patterned-coasters}) or [X + O](/objects/x-plus-o) ({price:x-plus-o}). Under ₹10,000: the [Layer Clock](/objects/layer-clock) ({price:layer-clock}), the [Acrylic Lamp](/objects/acrylic-lamp) ({price:acrylic-lamp}) or a [Custom Lightbox](/objects/custom-lightbox) ({price:custom-lightbox}). Statement gifts: the [Pink Wavy Mirror](/objects/pink-wavy-mirror) ({price:pink-wavy-mirror}) or [Love More](/objects/love-more) ({price:love-more}).",
          "Want it done for you? Our [ready-made edits](/gift-guide) put three objects together, at their usual prices.",
        ],
      },
      {
        heading: "Can you add a gift note?",
        paras: [
          "Yes. Tick “This is a gift” in your cart and add a short note, and we'll write it on a card by hand. Keep it short; the object is doing the talking.",
          "Missed a date? Our [Gift Promise](/gift-promise) lets you hand over a printable card on the day, with the object following soon after.",
        ],
      },
    ],
    faq: [
      { q: "What's a good housewarming gift in India?", a: "Something they'll use and see every day but wouldn't buy themselves: coasters, a wall clock, a mirror or a frame. See our [gift guide](/gift-guide) for ideas sorted by budget." },
      { q: "Can you add a gift note?", a: "Yes. Tick “This is a gift” in your cart and add a note; we handwrite it on a card." },
      { q: "Do you do corporate or wedding gifting?", a: "Yes, made to order in small runs. [Tell us what you need](/contact)." },
    ],
    products: ["x-plus-o", "patterned-coasters", "layered-wall-clock", "custom-lightbox"],
  },
  {
    slug: "made-here-in-bengaluru",
    index: "009",
    title: "Made in Bengaluru: a design studio that grew out of signage",
    date: "2026-07-20",
    updated: "2026-10-07",
    category: "Studio",
    excerpt:
      "The studio grew out of a signage workshop. That's not a footnote; it's the whole accent.",
    description:
      "Look Here Studio is a small design studio in Bengaluru making playful home objects in acrylic, mirror, metal and light. Made to order, shipped free across India.",
    readingTime: "",
    answer:
      "Look Here Studio is a small design studio in Bengaluru, Karnataka, that grew out of a signage workshop. We design and make playful objects for the home (mirrors, clocks, lights, wall pieces and backlit art) in our own studio, made to order and shipped free across India.",
    body: [],
    sections: [
      {
        heading: "Why does signage matter?",
        paras: [
          "Before it made objects for the home, this workshop made things for streets: acrylic, dimensional letters, metal and light, built to catch your eye from across four lanes of traffic.",
          "So when we point all that at a mirror or a clock, a certain accent comes through. We think about how a thing reads from across a room, how it takes the light, how it announces itself without shouting. The [Custom Lightbox](/objects/custom-lightbox) is the most direct example: signage skills, aimed at home.",
        ],
      },
      {
        heading: "Is everything really made in Bengaluru?",
        paras: [
          "Yes. It's all done here: cut, finished, assembled, argued over and packed. Not sent off into an invisible supply chain and shipped back with a story stapled on. Designed here. Made here. Changed several times here.",
        ],
      },
      {
        heading: "How do I order, and where do you ship?",
        paras: [
          "Add objects to your cart and tap “Send product request”. That opens WhatsApp with your order filled in. We confirm the details, then send you payment details. Everything is dispatched within 10 working days of confirmation, with free shipping anywhere in India.",
        ],
      },
    ],
    faq: [
      { q: "Where is Look Here Studio based?", a: "In Bengaluru, Karnataka, India." },
      { q: "Do you ship outside Bengaluru?", a: "Yes, free shipping anywhere in India. We don't currently ship outside India." },
      { q: "How do I contact Look Here Studio?", a: "WhatsApp +91 93806 70901 or email hello@lookherestudio.in." },
      { q: "Do you take custom or commission work?", a: "Yes: custom words, commissions, and corporate and wedding gifting. [Get in touch](/contact)." },
    ],
    products: ["custom-lightbox", "four-letter-words", "love-more"],
  },
  {
    // DRAFT stub: not routed, listed or in the sitemap until written.
    // Link to: /objects/x-plus-o, /objects/layered-wall-clock, /objects/layer-clock, /objects/four-letter-words, /objects/pickleball-shadow-box
    slug: "unique-diwali-gift-ideas-for-home",
    index: "010",
    title: "Unique Diwali Gift Ideas for the Home (That Aren't Another Scented Candle)",
    date: "2026-10-06",
    category: "Guide",
    excerpt: "Diwali gifts for the home that people actually keep: clocks, mirrors, backlit art and a brass game, sorted by who you're buying for. Order by 14 Oct.",
    description: "Diwali gifts for the home that people actually keep: clocks, mirrors, backlit art and a brass game, sorted by who you're buying for. Order by 14 Oct.",
    readingTime: "",
    draft: true,
    outline: ["Why home objects make good Diwali gifts", "For the friend who has everything (X + O, Layered Wall Clock)", "For the new address (Layer Clock, Four-Letter Words)", "For the design obsessive (Editions)", "For the pickleball-obsessed friend (Pickleball Shadow Box)", "Order by Wed 14 Oct for delivery before Diwali", "Missed it? The Gift Promise", "FAQ: delivery, gift notes, personalisation"],
    body: [],
  },
  {
    // DRAFT stub: not routed, listed or in the sitemap until written.
    // Link to: /objects/old-habits, /objects/smoke-and-feathers, /objects/pomegranate-study, /objects/blood-moon
    slug: "led-wall-art-india",
    index: "011",
    title: "LED Wall Art in India: What Backlit Art Is and Where to Hang It",
    date: "2026-10-06",
    category: "Guide",
    excerpt: "What edge-lit LED slim-frame art is, where backlit wall art works best at home, and how to power and care for it. With our four Editions.",
    description: "What edge-lit LED slim-frame art is, where backlit wall art works best at home, and how to power and care for it. With our four Editions.",
    readingTime: "",
    draft: true,
    outline: ["What edge-lit LED slim frames are", "The four Editions", "Where backlit art works (dark corners, hallways, bedrooms)", "Power, cables and care", "FAQ"],
    body: [],
  },
  {
    // DRAFT stub: not routed, listed or in the sitemap until written.
    // Link to: /objects/pickleball-shadow-box
    slug: "pickleball-gifts-india",
    index: "012",
    title: "Pickleball Gifts in India for the Player Who Already Has Every Paddle",
    date: "2026-10-06",
    category: "Guide",
    excerpt: "A pickleball gift that isn't another paddle: a personalised oak shadow box that frames theirs, with names, scores or a club crest.",
    description: "A pickleball gift that isn't another paddle: a personalised oak shadow box that frames theirs, with names, scores or a club crest.",
    readingTime: "",
    draft: true,
    outline: ["Why frame a paddle", "Personalisation ideas (crest, score, names)", "Size and materials (oak, acrylic mounts, 30 × 60 cm)", "Made to order, dispatched within 10 working days", "FAQ"],
    body: [],
  },
  {
    // DRAFT stub: not routed, listed or in the sitemap until written.
    // Link to: /objects/layer-clock, /objects/layered-wall-clock
    slug: "acrylic-wall-clocks",
    index: "013",
    title: "Acrylic Wall Clocks: Why Acrylic Isn't Plastic (and How to Choose One)",
    date: "2026-10-06",
    category: "Guide",
    excerpt: "Acrylic vs MDF vs metal wall clocks, choosing a size for your wall, silent sweep movements and care. From a Bengaluru studio that makes them.",
    description: "Acrylic vs MDF vs metal wall clocks, choosing a size for your wall, silent sweep movements and care. From a Bengaluru studio that makes them.",
    readingTime: "",
    draft: true,
    outline: ["Acrylic vs MDF vs metal", "Choosing a size for your wall", "Silent sweep movements", "Care", "Our two clocks"],
    body: [],
  },
  {
    // DRAFT stub: not routed, listed or in the sitemap until written.
    // Link to: /objects/four-letter-words, /objects/layer-clock, /objects/strip-frame, /objects/patterned-coasters
    slug: "housewarming-gift-ideas-renters-india",
    index: "014",
    title: "Housewarming Gift Ideas in India for Renters (No Painting Required)",
    date: "2026-10-06",
    category: "Guide",
    excerpt: "Rental-friendly housewarming gifts: lean-it panels, single-screw clocks and frames, sorted by budget from ₹3,200 to ₹9,500.",
    description: "Rental-friendly housewarming gifts: lean-it panels, single-screw clocks and frames, sorted by budget from ₹3,200 to ₹9,500.",
    readingTime: "",
    draft: true,
    outline: ["Rental-friendly decor (lean-it panels, single-screw clocks, frames)", "Gifts by budget (₹3,200 to ₹9,500)", "Picking colours for someone else's home", "Link to the gift guide"],
    body: [],
  },
];

/** live posts only: drafts are never routed, listed or put in the sitemap */
export const publishedPosts = journal.filter((p) => !p.draft);

/** "4 min read", from the actual words (answer, body, sections, FAQ) */
export function readingTime(p: JournalPost): string {
  const text = [p.answer ?? "", ...p.body, ...(p.sections ?? []).flatMap((s) => [s.heading, ...s.paras]), ...(p.faq ?? []).flatMap((f) => [f.q, f.a])].join(" ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 220))} min`;
}

export function getPost(slug: string): JournalPost | undefined {
  return publishedPosts.find((p) => p.slug === slug);
}
