import type { JournalPost } from "@/lib/types";

// The "Journal" / Notes. Editorial entries. Add one and it gets a route at
// /journal/<slug> automatically.

export const journal: JournalPost[] = [
  {
    slug: "why-we-started-with-a-clock",
    index: "001",
    title: "How to choose a wall clock you'll actually look at (and why we started with one)",
    metaTitle: "How to Choose a Wall Clock You'll Actually Look At",
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
      { q: "How long does a clock take to arrive?", a: "Each clock is made to order and dispatched within 10 working days of your order being confirmed, with free shipping on orders over ₹999 (₹599 in Bengaluru)." },
    ],
    products: ["layer-clock", "layered-wall-clock"],
  },
  {
    slug: "acrylic-is-not-plastic",
    index: "002",
    title: "Is acrylic plastic? What cast acrylic actually is (a small rant)",
    metaTitle: "Is Acrylic Plastic? What Cast Acrylic Actually Is",
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
    metaTitle: "What Makes a Statement Piece? A Case for the Slightly Wrong",
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
          "The [Layered Wall Clock](/objects/layered-wall-clock) is a small Memphis painting that happens to have hands. [X + O](/objects/x-plus-o) is noughts-and-crosses that looks like brass on marble, permanently mid-argument. [Well, Look At You](/objects/well-look-at-you) is a mirror that compliments you back.",
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
      { q: "What counts as a statement piece in home decor?", a: "An object that does a normal job in an unexpected form, so it gets noticed: a clock that reads like a painting, a mirror with lettering, a gold-and-marble game on the coffee table." },
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
          "The design goes in as a drawing; the laser follows it through the sheet. For acrylic, the beam melts a clean path, and if it lingers half a second too long the edge bubbles. For metal pieces like [Cat Got Your Heart](/objects/cat-got-your-heart) and [Small Planet](/objects/small-planet), the whole silhouette comes out of a single sheet, and the gaps are as much the design as the metal.",
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
      { q: "What materials do you laser-cut?", a: "Mostly acrylic (including the brass-look [X + O](/objects/x-plus-o)), steel and MDF, plus wood for frames." },
      { q: "How long does it take to make an object?", a: "Everything is made to order and dispatched within 10 working days of your order being confirmed." },
    ],
    products: ["cat-got-your-heart", "small-planet", "layer-clock"],
  },
  {
    slug: "why-we-make-things-in-small-runs",
    index: "005",
    title: "What does 'made to order' mean? Why we make things in small runs",
    metaTitle: "What Does 'Made to Order' Mean? Small-Run Making",
    date: "2026-09-01",
    updated: "2026-10-07",
    category: "Studio",
    excerpt:
      "We make it after you order. The unglamorous economics, and the real point, of not filling a warehouse.",
    description:
      "Made to order means your piece is made after you order. At Look Here Studio that's dispatch within 10 working days and free shipping on orders over ₹999 (₹599 in Bengaluru). Here's why we work this way.",
    readingTime: "",
    answer:
      "Made to order means your piece is made after you order it, not pulled off a warehouse shelf. At Look Here Studio, everything is made to order in Bengaluru and dispatched within 10 working days of your order being confirmed, with free shipping on orders over ₹999 (₹599 in Bengaluru).",
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
      { q: "How much is shipping?", a: "A flat fee per order, set by your delivery pincode. You see it in your cart before you pay. We ship within India only." },
      { q: "Can I return a made-to-order piece?", a: "Unused standard objects can be returned within 7 days of delivery, with free pickup. Personalised pieces are final sale unless they arrive damaged. Full details on our [shipping and returns page](/shipping-returns)." },
    ],
    products: ["custom-lightbox", "four-letter-words"],
  },
  {
    slug: "brass-gets-better-when-you-ignore-it",
    index: "006",
    title: "Does brass tarnish? Real brass vs brass-look acrylic",
    date: "2026-08-25",
    updated: "2026-10-08",
    category: "Material",
    excerpt:
      "On patina, polish, and why our X + O only looks like brass.",
    description:
      "Yes, unlacquered brass darkens over time. How patina works, how to clean brass, and when a brass-look acrylic piece is the easier choice for everyday use.",
    readingTime: "",
    answer:
      "Yes. Unlacquered brass slowly darkens as it reacts with the air and your hands. That patina is harmless, and a soft cloth with a little brass polish brings the shine back. If you want the gold look without the upkeep, a brass-look acrylic piece, like our [X + O](/objects/x-plus-o), gives you the look and needs only a wipe.",
    body: [],
    sections: [
      {
        heading: "What is patina?",
        paras: [
          "New brass is loud: mirror-bright, a little showy, trying hard. Left alone, it calms down. The shine softens, the tone deepens and it slowly starts to look lived-in. That change is patina, and plenty of people love it.",
        ],
      },
      {
        heading: "How do I clean brass?",
        paras: [
          "To restore the shine, rub gently with a soft cloth and a little brass polish, then buff dry. To keep the softened look, do nothing at all. Lacquered brass is different: it's sealed, so skip the polish and just dust it.",
        ],
      },
      {
        heading: "Real brass or brass-look?",
        paras: [
          "Real brass is heavy and changes with time, which is the charm and the chore. Brass-look acrylic gives you the warm gold colour in something lighter that doesn't need polishing, which suits things that get handled every day.",
          "That's why our [X + O](/objects/x-plus-o) noughts-and-crosses set is made entirely in acrylic: a marble-look board with brass-look Xs and Os. It looks like an heirloom on the coffee table, and looking after it is a quick wipe with a soft, slightly damp cloth. More on the material in [Is acrylic plastic?](/journal/acrylic-is-not-plastic)",
        ],
      },
    ],
    faq: [
      { q: "Does brass go dark over time?", a: "Unlacquered brass does. It's a natural, harmless patina, not damage." },
      { q: "How do I make brass shiny again?", a: "A soft cloth and a little brass polish, then buff dry." },
      { q: "Is the Look Here X + O made of brass?", a: "No. [X + O](/objects/x-plus-o) is made entirely in acrylic: a marble-look board with brass-look Xs and Os. Wipe it with a soft, slightly damp cloth." },
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
    metaTitle: "What Makes a Good Gift? Home Decor Gift Ideas",
    date: "2026-09-14",
    updated: "2026-10-07",
    category: "Gifting",
    excerpt:
      "It isn't about price, and it definitely isn't a scented candle. A short theory, ahead of the season.",
    description:
      "A good gift proves you were paying attention. Home decor gift ideas sorted by person and budget, from under ₹5,000 to statement pieces, with free shipping on orders over ₹999 (₹599 in Bengaluru).",
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
      "Look Here Studio is a small design studio in Bengaluru making playful home objects in acrylic, mirror, metal and light. Made to order, shipped across India.",
    readingTime: "",
    answer:
      "Look Here Studio is a small design studio in Bengaluru, Karnataka, that grew out of a signage workshop. We design and make playful objects for the home (mirrors, clocks, lights, wall pieces and backlit art) in our own studio, made to order and shipped across India.",
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
          "Add objects to your cart and tap “Send product request”. That opens WhatsApp with your order filled in. We confirm the details, then send you payment details. Everything is dispatched within 10 working days of confirmation, with free shipping on orders over ₹999 (₹599 in Bengaluru).",
        ],
      },
    ],
    faq: [
      { q: "Where is Look Here Studio based?", a: "In Bengaluru, Karnataka, India." },
      { q: "Do you ship outside Bengaluru?", a: "Yes, anywhere in India; the shipping fee depends on your pincode. We don't currently ship outside India." },
      { q: "How do I contact Look Here Studio?", a: "WhatsApp +91 93806 70901 or email hello@lookherestudio.in." },
      { q: "Do you take custom or commission work?", a: "Yes: custom words, commissions, and corporate and wedding gifting. [Get in touch](/contact)." },
    ],
    products: ["custom-lightbox", "four-letter-words", "love-more"],
  },
  {
    slug: "unique-gift-ideas-for-home",
    index: "010",
    title: "Unique gift ideas for the home (that aren't another scented candle)",
    metaTitle: "Unique Gift Ideas for the Home (Not a Scented Candle)",
    date: "2026-10-08",
    updated: "2026-10-08",
    category: "Gifting",
    excerpt:
      "Gifts for the home that people actually keep: clocks, lightboxes, word panels and a gold-and-marble-look game, sorted by who you're buying for.",
    description:
      "Unique gifts for the home, sorted by who you're buying for: clocks, personalised lightboxes, word panels and a table game. Every piece is made to order and dispatched within 10 working days.",
    readingTime: "",
    answer:
      "The best gifts for the home are objects people will see every day but would never buy for themselves: a clock that's also a small painting, their own words lit up on the wall, a table game that starts arguments. Pick for the person, not the price. Every piece is made to order and dispatched within 10 working days.",
    body: [],
    sections: [
      {
        heading: "Why give something for the home?",
        paras: [
          "Gifts already come with sweets, dry fruits and a respectable mountain of candles. A home object lasts longer than all of them. It goes up on the wall or onto the coffee table and quietly reminds them of you every time they walk past, which is the whole point of a gift.",
          "It also suits the occasion. A home is where people gather, and something that makes it a little more theirs always fits right in.",
        ],
      },
      {
        heading: "What do you give the friend who has everything?",
        paras: [
          "Something gloriously unnecessary. [X + O](/objects/x-plus-o) ({price:x-plus-o}) is noughts and crosses for the coffee table, made in acrylic with a marble-look board and brass-look pieces. It settles nothing and starts everything, which is exactly what you want at a card party.",
          "Or the [Layered Wall Clock](/objects/layered-wall-clock) ({price:layered-wall-clock}): overlapping primary-colour shapes with a floating yellow dial. Part clock, part small Memphis painting, and very hard to already own.",
        ],
      },
      {
        heading: "What's a good gift for someone in a new home?",
        paras: [
          "New homes have bare walls and no idea what to put on them. The [Layer Clock](/objects/layer-clock) ({price:layer-clock}) is warm, calm and useful from day one. [Four-Letter Words](/objects/four-letter-words) ({price:four-letter-words} for a set of two panels) says something on the wall: LOOK + HERE, LOVE + MORE, KISS, or a pair of words you choose for them. They can lean the panels on a shelf if they're renting and not ready to drill.",
          "More ideas in our [housewarming picks](/objects?occasion=housewarming) and the [new home edit](/gift-guide/edits/the-new-home).",
        ],
      },
      {
        heading: "What about the person who loves design?",
        paras: [
          "Give them art that does something. Our [Editions](/collections/editions) are prints set in slim LED frames, so the picture glows rather than just hanging there: an old-master portrait with an anachronistic twist, a botanical pomegranate study, a collage, a very moody moon. Each is A2 and {price:blood-moon}.",
        ],
      },
      {
        heading: "Is there a personalised gift?",
        paras: [
          "Yes, and it's the gift people remember. The [Custom Lightbox](/objects/custom-lightbox) ({price:custom-lightbox}) lights up any words you like, in any language and any light colour: a family saying, a line of poetry, their name. For the pickleball-obsessed, the [Pickleball Shadow Box](/objects/pickleball-shadow-box) ({price:pickleball-shadow-box}) frames their paddle with names, a score or a club crest. See all [personalised gifts](/personalised-gifts).",
          "Personalised pieces are made just for them, so they're final sale unless they arrive damaged. We confirm the wording with you on WhatsApp before we make anything.",
        ],
      },
      {
        heading: "How long does an order take?",
        paras: [
          "Every piece is made to order and dispatched within 10 working days of your order being confirmed. Shipping is free on orders over ₹999 (₹599 in Bengaluru); below that, delivery is included in the total you see in your cart.",
          "Tick “This is a gift” in your cart and add a short note, and we'll handwrite it on a card.",
        ],
      },
    ],
    faq: [
      { q: "What is a good gift for the home?", a: "Something they'll see every day but wouldn't buy themselves: a statement clock, a lightbox with their own words, a word panel for a bare wall, or a table game for card night. See our [gift guide](/gift-guide) for more, sorted by budget." },
      { q: "Is there a gift under ₹5,000?", a: "Yes: [X + O](/objects/x-plus-o) ({price:x-plus-o}) or the [Patterned Coasters](/objects/patterned-coasters) ({price:patterned-coasters} for a set of four)." },
      { q: "How long does an order take?", a: "Every piece is made to order and dispatched within 10 working days. Free shipping on orders over ₹999 (₹599 in Bengaluru)." },
      { q: "Can you add a gift note?", a: "Yes. Tick “This is a gift” in your cart and add a note; we handwrite it on a card." },
      { q: "Can I personalise a gift?", a: "Yes, with the [Custom Lightbox](/objects/custom-lightbox), [Four-Letter Words](/objects/four-letter-words) or the [Pickleball Shadow Box](/objects/pickleball-shadow-box). We confirm the details on WhatsApp before we make it." },
    ],
    products: ["x-plus-o", "layered-wall-clock", "four-letter-words", "custom-lightbox", "pickleball-shadow-box"],
  },
  {
    slug: "some-stories-stay-with-you",
    index: "015",
    title: "Some stories stay with you. This one became an object.",
    date: "2026-10-21",
    updated: "2026-10-21",
    category: "Studio",
    excerpt: "Our founder gives the same book to every child she buys a present for. Her love for it needed somewhere else to go, so we made this: the story behind Small Planet, and how a book became a piece of aluminium for the wall.",
    description: "The story behind Small Planet, a laser-cut aluminium wall piece made out of our founder's lifelong love for The Little Prince, the book she gifts to every child.",
    readingTime: "",
    answer:
      "Small Planet is a laser-cut aluminium wall piece our founder made out of her love for The Little Prince, the book she gives to every child she buys a present for. This is the story behind it.",
    body: [
      "Our founder has a little tradition. Every time she has to buy a present for a child, she reaches for the same book: The Little Prince.",
      "It's her favourite. Always has been.",
      "She's gifted it countless times, read it countless more, and somehow, her love for the story still needed somewhere else to go.",
      "So, we made this.",
      "A little piece of a world she's carried with her for years. Something to look at on an ordinary Tuesday and be reminded of all the things that made her fall in love with the story in the first place.",
      "Because some stories aren't meant to stay tucked away on a bookshelf.",
      "They deserve to be told again. Loved again. Looked at again.",
      "And sometimes, they deserve a little space on your wall.",
    ],
    sections: [
      {
        heading: "Why turn a book into something for the wall?",
        paras: [
          "Books go back on shelves. That's what they're for, and it's lovely, but it also means the stories we love most spend most of their lives with only their spines showing.",
          "A wall is different. You pass it every day, usually on the way to somewhere else, and it gets to say something quietly each time. That's what we wanted from this piece: not a poster, not a souvenir, just a small reminder of a world worth visiting, hung where you'll catch it out of the corner of your eye.",
        ],
      },
      {
        heading: "What did we make?",
        paras: [
          "[Small Planet](/objects/small-planet) is cut from a single sheet of aluminium, painted white: a tiny planet with two friends sitting on top, a scarf caught in the wind, and a sky of stars rising on long stems above them. A boy, a fox and not much else, which is exactly why it works.",
          "It's finished in a soft matte white, so the wall does the colour and the shadows do the drawing. It sits a few millimetres off the wall, and the shadow behind it moves as the light moves through the day. At roughly 60 × 85 cm it's big enough to be a feature and small enough for a reading corner.",
        ],
      },
      {
        heading: "Why a cut-out in white aluminium?",
        paras: [
          "Because a cut-out behaves differently from a print. Every line in the piece is a gap in the metal, cut by a laser in one clean pass and then eased by hand, so the edges are kind to fingers. Aluminium is light, which also makes it easy to hang.",
          "It's also a very Look Here way to tell a story: take a flat sheet, remove everything that isn't the idea, and let the light fill in the rest. Each piece is made to order in our Bengaluru studio, in small runs, one at a time.",
        ],
      },
      {
        heading: "Where does it live?",
        paras: [
          "Above a bookshelf, naturally. Also in nurseries, kids' rooms, reading corners, a hallway you walk through every morning, or beside the desk of an adult who has never quite stopped looking up. It hangs on keyhole fixings, so it's up in a minute. Our [size guide](/size-guide) shows exactly how big it is, drawn to scale.",
        ],
      },
      {
        heading: "Is it a good gift?",
        paras: [
          "It began as one, so yes. For a child's room, for new parents, for a friend who also owns three copies of the same book. Tick “This is a gift” in your cart and add a note, and we'll handwrite it on a card.",
          "Every piece is made to order and dispatched within 10 working days of your order being confirmed. Shipping across India is free on orders over ₹999 (₹599 in Bengaluru); below that, delivery is included in the total you see in your cart.",
        ],
      },
      {
        heading: "Meet Small Planet",
        paras: [
          "[Small Planet](/objects/small-planet) is {price:small-planet}: a very personal piece of Look Here.",
        ],
      },
    ],
    faq: [
      { q: "What is Small Planet?", a: "A laser-cut aluminium wall piece, painted white: two friends on a tiny planet under a sky of stars, made in Bengaluru. It was inspired by our founder's lifelong love for The Little Prince." },
      { q: "How big is Small Planet?", a: "Approximately 600 × 850 × 3 mm (about 23.5 × 33.5 inches). See the [size guide](/size-guide) for it drawn to scale." },
      { q: "What is Small Planet made of?", a: "Laser-cut aluminium, painted white. It hangs on keyhole fixings, a few millimetres off the wall." },
      { q: "Can I give Small Planet as a gift?", a: "Yes. Tick “This is a gift” in your cart and add a note; we handwrite it on a card. It's made to order and dispatched within 10 working days." },
    ],
    products: ["small-planet", "cat-got-your-heart"],
  },
  {
    slug: "wall-stickers-vs-wallpaper-rented-home",
    index: "015",
    title: "Wall Stickers or Wallpaper? What Works in a Rented Home",
    metaTitle: "Wall Stickers vs Wallpaper for a Rented Home",
    date: "2026-11-23",
    updated: "2026-11-23",
    category: "Guide",
    excerpt:
      "Wallpaper needs paste and a landlord's blessing. Wall stickers need a clean wall and a hairdryer for later. How to choose, and where each one falls short.",
    description:
      "Wall stickers vs wallpaper for a rented home: what each does well, where stickers fall short, how much wall a set covers and how to take them off again.",
    readingTime: "",
    answer:
      "For a rented home, wall stickers are usually the easier call: no paste, no scraping, and you decide how much wall to cover. Wallpaper wins only when you want one seamless pattern across a whole wall and you're sure you can live with the removal. Our wall stickers are cut from printed vinyl and go on clean, dry, smooth painted walls.",
    body: [],
    sections: [
      {
        heading: "Why is wallpaper a gamble in a rented home?",
        paras: [
          "Wallpaper is a commitment in two directions. Putting it up needs paste and a steady hand, and taking it down can mean scraping, patching and repainting, which is exactly the conversation most tenants would rather not have with a landlord.",
          "It's also an all-or-nothing look. You paper a wall or you don't, and a half-finished wall looks like a mistake.",
        ],
      },
      {
        heading: "What do wall stickers do better?",
        paras: [
          "They scale to how much you're willing to do. Six carnations up a stairwell is a finished idea; so is a whole wall of lotus flowers. There's no paste, no frame and no pattern repeat to match, so you can start small and add to it later.",
          "They also come off. To remove one, warm it with a hairdryer and peel slowly. Test a hidden spot first, because vinyl can lift paint when it's removed, and that's worth knowing before the deposit is involved.",
        ],
      },
      {
        heading: "Where do wall stickers fall short?",
        paras: [
          "They aren't a seamless wallpaper. Each sticker is its own shape, so you get a pattern with gaps, which is the point, but not an unbroken print edge to edge.",
          "They also want the right wall: clean, dry, smooth and painted. That's how we make and test them. If your wall is damp, dusty or heavily textured, sort that out first or expect a weaker hold.",
        ],
      },
      {
        heading: "How much wall does one set cover?",
        paras: [
          "It depends on the spacing, and you can stretch a set. One [Lotus & Bud](/objects/lotus-wall-stickers) set (24 stickers, {price:lotus-wall-stickers}) covers about 8 × 8 ft at the spacing shown in the photos, and the [Poppy](/objects/poppy-wall-stickers) set ({price:poppy-wall-stickers}) does about the same. Space them wider and the set covers a bigger wall, with a lighter look.",
        ],
      },
      {
        heading: "Which look should I pick?",
        paras: [
          "For a block-print wallpaper feel, stagger the Lotus & Bud set in a loose grid, flower, bud, flower. For a wild meadow, scatter the Poppy set at different heights. For a nursery or a reading corner, the [Watercolour Clouds](/objects/cloud-wall-stickers) ({price:cloud-wall-stickers}) make a quiet sky. See everything on the [wall decals page](/small-runs/wall-decals).",
          "Want a shape or colour we don't make yet? [Custom wall decals](/custom) can be cut from vinyl in a set to your design.",
        ],
      },
    ],
    faq: [
      { q: "Will wall stickers damage my paint?", a: "They're made for clean, dry, smooth painted walls. To remove one, warm it with a hairdryer and peel slowly. Vinyl can lift paint when it's removed, so test a hidden spot first." },
      { q: "Can I use wall stickers on a textured wall?", a: "We make and describe them for smooth painted walls. On a heavily textured wall they may not hold as well, so try one in a corner before committing a whole set." },
      { q: "How long do wall stickers take to arrive?", a: "Wall stickers are made to order and dispatched within 10 working days of your order being confirmed." },
      { q: "Can I get wall stickers in my own design?", a: "Yes. Send the idea on WhatsApp from our [custom orders page](/custom) and we'll confirm how it will look and the price before you pay." },
    ],
    products: ["lotus-wall-stickers", "poppy-wall-stickers", "cloud-wall-stickers"],
  },
  {
    slug: "how-to-put-up-wall-stickers",
    index: "016",
    title: "How to Put Up Wall Stickers So They Look Planned, Not Random",
    metaTitle: "How to Put Up Wall Stickers: Layouts That Work",
    date: "2026-11-23",
    updated: "2026-11-23",
    category: "Guide",
    excerpt:
      "Grid, scatter or trail? How to plan a wall sticker layout on the floor first, so the wall only gets the version you've already approved.",
    description:
      "How to put up wall stickers neatly: prep the wall, plan the layout on the floor, choose between a grid, a scatter or a trail, and stick them without bubbles.",
    readingTime: "",
    answer:
      "Clean the wall, lay the stickers out on the floor first, then stick them from the middle outwards. Choose a loose grid for a wallpaper look, a scatter at mixed heights for a meadow or a sky, or a trail for a staircase. Planning on the floor is the step that stops a wall from looking random.",
    body: [],
    sections: [
      {
        heading: "How do I prepare the wall?",
        paras: [
          "Stick onto a clean, dry, smooth painted wall. Wipe off dust and any greasy marks, let the wall dry fully, and only then start. If the paint is fresh, give it time to cure before you stick anything on it.",
        ],
      },
      {
        heading: "Why plan the layout on the floor?",
        paras: [
          "Because a wall forgives nothing once a sticker is on it. Lay the whole set out on a bedsheet or the floor, shuffle until the gaps feel even, and take a photo. Then work from the photo, wall in front of you, middle first.",
          "It also tells you early whether one set is enough. If it looks thin, spread it wider on purpose rather than squeezing a second set into a gap.",
        ],
      },
      {
        heading: "Grid, scatter or trail: which layout suits which wall?",
        paras: [
          "A grid reads as wallpaper. The [Apricot Daisy](/objects/apricot-daisy-wall-stickers) sheet (12 daisies, about 5 cm each) is made for it: line them up neatly, and they look best on a coloured wall such as sage green, blue, pink or deep brown. The [Lotus & Bud](/objects/lotus-wall-stickers) set works as a staggered grid, flower, bud, flower.",
          "A scatter reads as a meadow or a sky. Vary the heights and angles, and keep the spacing uneven on purpose. A trail suits a staircase or a hallway: the [Gold Elephant Decals](/objects/gold-elephant-decals) work well as a loose herd across a bathroom or a line up the stairs.",
        ],
      },
      {
        heading: "How do I get them on without bubbles?",
        paras: [
          "Take your time and press from the centre of each sticker outwards, smoothing as you go. Stand back after every few and check the spacing from across the room, because that's where uneven gaps show.",
        ],
      },
      {
        heading: "What if I change my mind later?",
        paras: [
          "Warm a sticker with a hairdryer and peel slowly. Vinyl can lift paint on its way off, so try a hidden spot first if the wall matters to you. For help choosing a set, start on the [wall decals page](/small-runs/wall-decals).",
        ],
      },
    ],
    faq: [
      { q: "How many wall stickers do I need for one wall?", a: "It depends on the look. One Lotus & Bud set (24 stickers) or one Poppy set covers about 8 × 8 ft at the spacing shown, and you can space them wider to cover more." },
      { q: "How do I take wall stickers off?", a: "Warm the sticker with a hairdryer and peel it off slowly. Test a hidden spot first, since vinyl can lift paint when removed." },
      { q: "Do the Gold Elephant Decals come as a set?", a: "Yes. One sheet holds 25 small elephants, each 4.35 × 2.94 cm, cut from permanent gold vinyl." },
      { q: "Can I order only one sheet of daisies or a small set?", a: "Yes. The Apricot Daisy sheet and the six-piece Carnation set are small, single purchases, made to order and dispatched within 10 working days." },
    ],
    products: ["apricot-daisy-wall-stickers", "lotus-wall-stickers", "gold-elephant-decals"],
  },
  {
    slug: "custom-tshirts-small-quantities-india",
    index: "017",
    title: "How to Order Custom T-Shirts in Small Quantities in India",
    metaTitle: "Custom T-Shirts in Small Quantities, From 1 Piece",
    date: "2026-11-23",
    updated: "2026-11-23",
    category: "Guide",
    excerpt:
      "No minimum, a proof before you pay, and a price that drops from the fifth piece. How custom tee orders work at a small Bengaluru studio.",
    description:
      "Order custom T-shirts from one piece in India: how pricing tiers work, what files to send, how long it takes and what you approve before paying.",
    readingTime: "",
    answer:
      "You can order a custom tee from a single piece. One piece is the standard price plus a small design setup fee; from 5 pieces of the same design the setup fee goes and each tee is cheaper, with a bigger discount from 10. You see a proof and the exact price before you pay.",
    body: [],
    sections: [
      {
        heading: "Is there a minimum order for custom tees?",
        paras: [
          "No. One piece is fine. A single custom tee is priced at the standard price plus a one-off design setup fee, because we still have to redraw your art for cutting.",
          "Each design is priced on its own. Ten tees in the same design get the 10-piece discount; ten different designs are ten single orders.",
        ],
      },
      {
        heading: "How do the quantity tiers work?",
        paras: [
          "From 5 pieces of the same design the setup fee is waived and you get 10% off. From 10 pieces it's 20% off. From 25 pieces we quote by hand, because the plan, the date and the sizes matter more than a formula. Our oversized tees start at {price:tee-uninstall-astrology}, and the [custom orders page](/custom) has a price check you can try with your own quantity.",
        ],
      },
      {
        heading: "What do I send, and what happens next?",
        paras: [
          "Send the idea on WhatsApp: a clean logo, a sketch, a photo or just words, plus how many you need and by when. We redraw it for cutting and send back how it will look and the exact price, usually within a day. Nothing is paid until you approve.",
          "Simple, bold shapes cut best. Very fine detail may need simplifying, and we tell you at the proof rather than after.",
        ],
      },
      {
        heading: "Can I send my own tee or garment?",
        paras: [
          "Yes. A plain tee, polo, tote or hoodie works best. Message us before sending anything, and we'll say whether the fabric takes a heat-pressed print and where to send it.",
        ],
      },
      {
        heading: "How long does a custom tee order take?",
        paras: [
          "Up to 10 pieces dispatch within 10 working days. Bigger runs get a date at the proof stage, so tell us early if the tees are for an event. Team tees, wedding favours and café uniforms are what the 10 and 25-piece tiers are for.",
        ],
      },
      {
        heading: "Can I use a cartoon character, a logo or a team crest?",
        paras: [
          "Only if you own the rights or have permission to use it. We don't cut licensed characters or other people's brand logos without that. If you're after something personal and original, the [Custom Pet Parent Tee](/objects/tee-custom-pet-parent) is a good example: your pet's name stacked in gold, with their face over the middle.",
        ],
      },
    ],
    faq: [
      { q: "What is the minimum order for a custom tee?", a: "There isn't one. A single piece costs the standard price plus a design setup fee. From 5 pieces of the same design the setup fee is waived and each piece is cheaper." },
      { q: "Can custom tees be returned?", a: "Custom and personalised pieces are final sale unless they arrive damaged or aren't what we agreed at the proof. Details on [shipping and returns](/shipping-returns)." },
      { q: "What file format do you need?", a: "Anything is a start: a clean logo, a sketch or a photo of what you have in mind. We redraw it for cutting." },
      { q: "How is the print applied?", a: "Our vinyl tees are heat-pressed, cut and weeded by hand. The result is a raised vinyl print on an oversized cotton tee." },
    ],
    products: ["tee-custom-pet-parent", "tee-uninstall-astrology", "tee-chic-sheeps"],
  },
  {
    slug: "how-to-display-photo-booth-strips",
    index: "018",
    title: "How to Display Photo-Booth Strips So They Don't End Up in a Drawer",
    metaTitle: "How to Display Photo-Booth Strips at Home",
    date: "2026-11-23",
    updated: "2026-11-23",
    category: "Guide",
    excerpt:
      "A strip of four little photos deserves better than a wallet. Where to put them, how to keep them swappable, and why a fridge magnet frame is the easy answer.",
    description:
      "How to display photo-booth strips and small prints at home: a swappable magnet frame on the fridge, where to put it, and how to keep photos from fading.",
    readingTime: "",
    answer:
      "The easiest way to display a photo-booth strip is a frame you can open from the top, so you can swap strips whenever you like. A rigid fridge magnet frame does it with no nails and no glass: slide the strip in, stick the magnet on the fridge. Our Photo Strip Frame Magnet is 6.8 × 15 cm, made for exactly that.",
    body: [],
    sections: [
      {
        heading: "Why do photo-booth strips end up in drawers?",
        paras: [
          "They're too small for a normal frame and too precious to bin. A strip is about the size of a bookmark, so it gets tucked into a wallet, a book or a drawer, and then you forget it exists.",
        ],
      },
      {
        heading: "What's the easiest way to display one?",
        paras: [
          "Put it where you already look. The fridge door is the busiest wall in most homes, and a magnet frame makes a strip look finished instead of stuck on with tape.",
          "The [Photo Strip Frame Magnet](/objects/photo-frame-magnet) ({price:photo-frame-magnet}) is a rigid sheet, 6.8 × 15 cm, with a printed border and an open top. Slide a strip in, swap it whenever you want, and it stays flat on a steel or iron surface. The frame is sold empty, so your photos aren't included.",
        ],
      },
      {
        heading: "Which border should I choose?",
        paras: [
          "There are six Indian textile patterns: Kasavu (cream with gold stripes), Kanjivaram (deep red with a gold temple border), Bandhani (pink dot work), Bandhani Dots (maroon, all over dots), Ajrakh (navy with red flowers) and Leheriya (red and pink waves). Pick one that suits the strip or the kitchen. You can also buy a set of 3 or 6 for a row of strips.",
        ],
      },
      {
        heading: "What if my photo is a single portrait rather than a strip?",
        paras: [
          "The [Oval Check Photo Frame Magnet](/objects/oval-photo-frame-magnet) ({price:oval-photo-frame-magnet}) is 8.8 × 12.6 cm, with a red, yellow and navy check border and an oval window. Slide a photo in behind it and it sits on the fridge like a tiny portrait.",
        ],
      },
      {
        heading: "How do I keep photos looking good?",
        paras: [
          "Keep the frame away from water and from direct sunlight, which fades prints over time, and wipe it with a dry cloth. Also keep it away from cards with magnetic strips, since the frame is a magnet.",
        ],
      },
    ],
    faq: [
      { q: "Does the photo frame magnet come with photos?", a: "No, the frame is sold empty. You slide in your own photo-booth strip." },
      { q: "How big is the Photo Strip Frame Magnet?", a: "6.8 × 15 cm, a rigid magnet sheet that stays flat on the fridge." },
      { q: "Will the magnet stick to any fridge?", a: "It sticks to steel or iron surfaces, like most fridge doors. Check that your fridge door is magnetic before you buy." },
      { q: "Can I buy a set as a gift?", a: "Yes, the Photo Strip Frame Magnet is available singly, or as a set of 3 or 6 for gifting. See all the [fridge magnets](/small-runs/fridge-magnets)." },
    ],
    products: ["photo-frame-magnet", "oval-photo-frame-magnet"],
  },
  {
    slug: "how-to-hang-a4-prints-and-small-art",
    index: "019",
    title: "Where to Hang A4 Prints and Small Framed Art (Without Losing It)",
    metaTitle: "Where to Hang A4 Prints and Small Framed Art",
    date: "2026-11-23",
    updated: "2026-11-23",
    category: "Guide",
    excerpt:
      "A4 is small, and that's the charm. Where small prints and framed fabric art work best, how to group them, and when a print-only version is enough.",
    description:
      "Where to hang A4 prints and small framed art: kitchens, desks, dressers and shelves, how to group them, and how to choose between print only or framed.",
    readingTime: "",
    answer:
      "Small art works best close up: above a desk, on a dresser or sideboard, in a kitchen or beside a bed. Hang one by a single nail, lean a few on a shelf, or group three or more together so they read as a set. A4 (21 × 29.7 cm) is small on purpose, so don't leave it alone on a big wall.",
    body: [],
    sections: [
      {
        heading: "Why is small art hard to place?",
        paras: [
          "On a big wall, a single A4 print looks lost. The trick is to put it where people stand or sit close to it, so the detail is part of the point.",
        ],
      },
      {
        heading: "Which rooms suit small art best?",
        paras: [
          "Kitchens and dining nooks suit the two-colour spice prints, like the [Chilli Jar Print](/objects/chilli-jar-print), [Two Chillies](/objects/two-chillies-print) and [Spilled Peppercorns](/objects/spilled-peppercorns-print). A bedroom or reading corner suits the [Cat Nap Print](/objects/cat-nap-print) or the pink [Darling, You Can Be Outrageous](/objects/outrageous-quote-poster) print.",
        ],
      },
      {
        heading: "Should I hang, lean or group?",
        paras: [
          "Do all three. A framed print hangs from a single nail or screw, or simply leans on a shelf, a dresser or a sideboard. Leaning is the lowest-commitment option, and it lets you swap pieces when you feel like it.",
          "Group two or three pieces of the same size with an even gap so they read as one idea. The spice prints and the Cat Nap Print are all two-colour prints on warm cream paper with a grainy, layered look, so they sit well together.",
        ],
      },
      {
        heading: "Print only, or framed?",
        paras: [
          "Each print comes as a print alone ({price:outrageous-quote-poster}) to frame yourself, or fitted in a thin frame, ready to hang. The framed version is the easy gift. Print only is better if you already own frames, or want to tape or pin it up.",
        ],
      },
      {
        heading: "Where does framed fabric art fit in?",
        paras: [
          "[Trying To Get My Shit Together](/objects/trying-to-get-my-shit-together) ({price:trying-to-get-my-shit-together}) is the louder cousin: white vinyl over block-printed fabric, framed under glass in a white frame (A4, frame 24 × 30 cm). It hangs from a single nail or screw, or stands on a shelf. Dust the glass with a dry cloth, and keep it out of direct sunlight so the fabric doesn't fade.",
          "Browse the rest on the [art page](/small-runs/art), or [send us your own words](/custom) for a custom version.",
        ],
      },
    ],
    faq: [
      { q: "What size are the prints?", a: "A4, which is 21 × 29.7 cm. The framed fabric piece is A4 inside a 24 × 30 cm frame." },
      { q: "Do the prints come framed?", a: "You choose: print only, or the print fitted in a thin frame, ready to hang." },
      { q: "How do I hang a small frame?", a: "A framed print hangs from a single nail or screw, or leans on a shelf." },
      { q: "Can I get my own words or art made?", a: "Yes. Send the idea from the [custom orders page](/custom) and we'll confirm the price before you pay." },
    ],
    products: ["trying-to-get-my-shit-together", "outrageous-quote-poster", "chilli-jar-print"],
  },
  {
    // DRAFT stub: not routed, listed or in the sitemap until written.
    // Link to: /objects/old-habits, /objects/smoke-and-feathers, /objects/pomegranate-study, /objects/blood-moon
    slug: "led-wall-art-india",
    index: "011",
    title: "LED Wall Art in India: What Backlit Art Is and Where to Hang It",
    date: "2026-10-06",
    category: "Guide",
    excerpt: "What edge-lit LED slim-frame art is, where backlit wall art works best at home, and how to power and care for it. With our seven Editions.",
    description: "What edge-lit LED slim-frame art is, where backlit wall art works best at home, and how to power and care for it. With our seven Editions.",
    readingTime: "",
    draft: true,
    outline: ["What edge-lit LED slim frames are", "The seven Editions", "Where backlit art works (dark corners, hallways, bedrooms)", "Power, cables and care", "FAQ"],
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
