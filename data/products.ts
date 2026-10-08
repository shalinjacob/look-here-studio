import type { Product, ProductStatus, FilterTag, Occasion } from "@/lib/types";
import { tees } from "./tees";

// ---------------------------------------------------------------------------
// The catalogue.
//
// NOTE ON PRICING: no final prices were supplied, so the numbers below are
// PROVISIONAL placeholders (flagged so the commerce/cart layer is demonstrable
// and testable). Items whose price is genuinely undecided use `price: null` +
// status "coming-soon", which the UI renders as "PRICE COMING SOON".
// Replace the numbers before going live.
//
// Add an object here and it appears in the index and gets its own page at
// /objects/<slug> automatically. Drop matching photos in /public/objects.
// ---------------------------------------------------------------------------

const STD_PROCESS = [
  { step: "01", label: "CUT", note: "laser, one clean pass" },
  { step: "02", label: "FINISH", note: "edges eased by hand" },
  { step: "03", label: "PRINT / ETCH", note: "colour + detail" },
  { step: "04", label: "ASSEMBLE", note: "standoffs and patience" },
  { step: "05", label: "PACK", note: "corners first, always" },
];

const objects: Product[] = [
  {
    id: "p001",
    objectNumber: "001",
    slug: "layer-clock",
    name: "Layer Clock",
    shortName: "Layer Clock",
    category: "Wall Object",
    subcategory: "Clock",
    tags: ["wall"],
    occasions: ["housewarming"],
    shortDescription: "A clock that reads like a sunset, one layer at a time.",
    description:
      "A wall clock built from stacked, wavy layers that step down into the dial — so the time sits at the bottom of a small warm crater. It tells the time. It also quietly changes the wall it's on.",
    material: "Layered MDF, acrylic",
    finish: "Matte, warm orange gradient",
    colour: "Terracotta / orange",
    dimensions: "300 × 300 × 45 mm",
    price: 6800,
    currency: "INR",
    status: "available",
    images: ["/objects/layer-clock.webp"],
    lifestyleImages: [],
    leadTime: "Made to order · dispatched within 10 working days",
    care: "Wipe with a dry cloth. Keep out of direct rain, obviously.",
    installation: "Single wall screw. Silent sweep movement, 1 × AA.",
    featured: true,
    process: STD_PROCESS,
    seoTitle: "Layer Clock: Layered Orange Wall Clock, 30 cm",
    seoDescription: "A wall clock built from stacked wavy layers in a terracotta-to-orange gradient. 30 × 30 cm, silent sweep. Made to order in Bengaluru, {price}.",
  },
  {
    id: "p003",
    objectNumber: "003",
    slug: "acrylic-lamp",
    name: "Acrylic Lamp",
    shortName: "Acrylic Lamp",
    category: "Table Object",
    subcategory: "Light",
    tags: ["light", "table"],
    occasions: ["just-because"],
    shortDescription: "One sheet of acrylic, one chrome bulb, no fuss.",
    description:
      "A table lamp that's basically a single slab of fluorescent acrylic with a mirror-tipped bulb reaching over the top. The acrylic edge-glows where the light catches it. Half lamp, half small orange event on your desk.",
    material: "20 mm fluorescent acrylic, aluminium",
    finish: "Polished edges",
    colour: "Fluorescent orange",
    dimensions: "240 × 90 × 260 mm",
    price: 9200,
    currency: "INR",
    status: "available",
    images: ["/objects/acrylic-lamp-1.webp", "/objects/acrylic-lamp-2.webp"],
    lifestyleImages: [],
    imageFit: "cover",
    leadTime: "Made to order · dispatched within 10 working days",
    care: "Acrylic scratches — wipe with a soft damp cloth only.",
    installation: "Plugs in. Globe bulb included.",
    featured: true,
    process: STD_PROCESS,
    seoTitle: "Acrylic Lamp: Fluorescent Orange Table Lamp",
    seoDescription: "One slab of 20 mm fluorescent acrylic and a mirror-tipped bulb. A table lamp that edge-glows. Made to order in Bengaluru, {price}.",
  },
  {
    id: "p035",
    objectNumber: "035",
    slug: "clear-ledge",
    name: "Clear Ledge",
    shortName: "Clear Ledge",
    category: "Wall Object",
    subcategory: "Shelf",
    tags: ["wall"],
    occasions: ["housewarming", "just-because"],
    shortDescription: "A shelf you can barely see, so your things get all the attention.",
    description:
      "A slim acrylic picture ledge with a little lip at the front, so whatever you put on it looks like it's floating. Lean frames on it, line up spice jars, or face your favourite records outwards. Hang one on its own, or stack three for a proper gallery wall that you can rearrange whenever you like, no new nail holes needed. In crystal clear, or in a coloured acrylic (orange, red, cyan, blue, purple) if you'd like the shelf to be part of the show. Want another colour? Ask us. Priced per ledge.",
    material: "Acrylic",
    finish: "Polished edges",
    colour: "Clear, orange, red, cyan, blue or purple",
    dimensions: "60 cm long × 10.5 cm deep · holds up to 5 kg",
    price: 899,
    currency: "INR",
    status: "available",
    images: ["/lifestyle/clear-ledge-frames.webp", "/lifestyle/clear-ledge-kitchen.webp", "/lifestyle/clear-ledge-vinyl.webp"],
    lifestyleImages: [],
    imageFit: "cover",
    variantLegend: "CHOOSE YOUR COLOUR",
    variants: [
      { id: "clear", label: "CLEAR", note: "Per ledge", price: 899 },
      { id: "orange", label: "ORANGE", note: "Per ledge", price: 899 },
      { id: "red", label: "RED", note: "Per ledge", price: 899 },
      { id: "cyan", label: "CYAN", note: "Per ledge", price: 899 },
      { id: "blue", label: "BLUE", note: "Per ledge", price: 899 },
      { id: "purple", label: "PURPLE", note: "Per ledge", price: 899 },
    ],
    leadTime: "Made to order · dispatched within 10 working days",
    care: "Dust with a soft, slightly damp cloth. Nothing abrasive.",
    installation: "Screws through the back plate. Use fixings suited to your wall; keep the load to 5 kg per ledge.",
    featured: false,
    process: STD_PROCESS,
    seoTitle: "Clear Ledge: Acrylic Floating Picture Shelf, 60 cm",
    seoDescription: "An acrylic floating picture ledge, 60 × 10.5 cm, in clear or colours, for frames, records or spice jars. Holds 5 kg. Made to order in Bengaluru, {price} each.",
  },
  {
    id: "p006",
    objectNumber: "006",
    slug: "square-frame",
    name: "Square Frame",
    shortName: "Square Frame",
    category: "Wall Object",
    subcategory: "Frame",
    tags: ["wall", "frame"],
    shortDescription: "A big mount, a small photo. All the drama.",
    description:
      "An oversized square frame with a tiny window, so a small print floats in a sea of mount. Sold as a set of three for a proper vertical run. The empty space is the design.",
    material: "Aluminium, acid-free mount",
    finish: "Brushed silver",
    colour: "Silver",
    dimensions: "3 × (300 × 300 mm)",
    price: 8900,
    currency: "INR",
    status: "available",
    images: ["/objects/square-frame-1.webp", "/objects/square-frame-2.webp"],
    lifestyleImages: [],
    imageFit: "cover",
    leadTime: "Made to order · dispatched within 10 working days",
    care: "Glass cleaner on the cloth, never on the glass.",
    installation: "One screw each. Template included.",
    featured: true,
    process: STD_PROCESS,
    seoTitle: "Square Frame: Set of 3 Oversized-Mount Frames",
    seoDescription: "Three 30 cm brushed-aluminium frames with tiny floating windows. Small photo, all the drama. Made to order, {price}.",
  },
  {
    id: "p007",
    objectNumber: "007",
    slug: "strip-frame",
    name: "Strip Frame",
    shortName: "Strip Frame",
    category: "Wall Object",
    subcategory: "Frame",
    tags: ["wall", "frame"],
    occasions: ["housewarming"],
    shortDescription: "For the photobooth strip you never knew where to put.",
    description:
      "A tall brushed-metal frame sized exactly for a photobooth strip. Four small moments, one long object. Finally somewhere to put the good ones.",
    material: "Brushed stainless steel",
    finish: "Brushed",
    colour: "Steel",
    dimensions: "120 × 420 × 15 mm",
    price: 6400,
    currency: "INR",
    status: "available",
    images: ["/objects/strip-frame-1.webp"],
    lifestyleImages: [],
    imageFit: "cover",
    leadTime: "Made to order · dispatched within 10 working days",
    care: "Fingerprints wipe off with a dry cloth.",
    installation: "Keyhole mount, single screw.",
    featured: true,
    process: STD_PROCESS,
    seoTitle: "Strip Frame: Photobooth Strip Frame in Steel",
    seoDescription: "A tall brushed stainless-steel frame sized exactly for a photobooth strip. Finally somewhere for the good ones. Made to order, {price}.",
  },
  {
    id: "p008",
    objectNumber: "008",
    slug: "four-letter-words",
    name: "Four-Letter Words",
    shortName: "Four-Letter Words",
    category: "Wall Object",
    subcategory: "Typographic",
    tags: ["wall"],
    occasions: ["housewarming", "wedding"],
    shortDescription: "Pick a four-letter word. We cut it clean through.",
    description:
      "A glossy lacquered panel with a four-letter word routed straight through it, so the wall behind becomes the letters. Lean it, hang it, or pair two up to say something longer: LOVE + MORE, LOOK + HERE, or KISS on its own. Want your own word? Tell us and we'll cut it. Reads as art from across the room and as a small instruction up close.",
    material: "Lacquered MDF",
    finish: "High gloss",
    colour: "Blush pink / cream",
    dimensions: "Each panel approx. 400 × 500 × 40 mm",
    price: 8300,
    currency: "INR",
    status: "available",
    images: [
      "/objects/words-look-here.webp",
      "/objects/words-love-more.webp",
      "/objects/kiss-wall-piece.webp",
    ],
    lifestyleImages: ["/lifestyle/athome-kiss.webp"],
    imageFit: "cover",
    variants: [
      { id: "look-here", label: "LOOK + HERE", note: "Set of two", price: 8300, image: "/objects/words-look-here.webp" },
      { id: "love-more", label: "LOVE + MORE", note: "Set of two", price: 8300, image: "/objects/words-love-more.webp" },
      { id: "kiss", label: "KISS", note: "Set of two", price: 8300, image: "/objects/kiss-wall-piece.webp" },
      { id: "custom", label: "YOUR WORDS", note: "Set of two, your call", price: 8300, custom: true },
    ],
    leadTime: "Made to order · dispatched within 10 working days",
    care: "Gloss shows dust. A dry microfibre cloth keeps it sharp.",
    installation: "French cleat, sits flush. Or just lean it.",
    featured: false,
    process: STD_PROCESS,
    seoTitle: "Four-Letter Words: Custom Word Wall Art Panels",
    seoDescription: "Glossy lacquered panels with a four-letter word cut clean through: LOVE + MORE, LOOK + HERE, KISS or your own. Set of two, {price}.",
  },
  {
    id: "p009",
    objectNumber: "009",
    slug: "layered-wall-clock",
    name: "Layered Wall Clock",
    shortName: "Layered Clock",
    category: "Wall Object",
    subcategory: "Clock",
    tags: ["wall"],
    occasions: ["just-because"],
    shortDescription: "A little Memphis moment that also tells the time.",
    description:
      "Overlapping cut shapes in primary colours with a yellow dial floating on top. Part clock, part small painting that happens to have hands. Cheerfully unbothered by whether it matches your sofa.",
    material: "Layered acrylic",
    finish: "Matte",
    colour: "Primary multi",
    dimensions: "340 × 340 × 30 mm",
    price: 8200,
    currency: "INR",
    status: "available",
    images: ["/objects/layered-wall-clock.webp"],
    lifestyleImages: ["/lifestyle/athome-layered-clock.webp"],
    leadTime: "Made to order · dispatched within 10 working days",
    care: "Soft dry cloth.",
    installation: "Single screw. Silent sweep movement.",
    featured: false,
    process: STD_PROCESS,
    seoTitle: "Layered Wall Clock: Memphis-Style Acrylic Clock",
    seoDescription: "Overlapping primary-colour acrylic shapes with a floating yellow dial. 34 cm. Part clock, part small painting. Made to order, {price}.",
  },
  {
    id: "p011",
    objectNumber: "011",
    slug: "pink-wavy-mirror",
    name: "Pink Wavy Mirror",
    shortName: "Wavy Mirror",
    category: "Wall Object",
    subcategory: "Mirror",
    tags: ["wall", "mirror"],
    occasions: ["housewarming"],
    shortDescription: "A mirror shaped like a good mood.",
    description:
      "An organic, wavy-edged mirror in a hot-pink lacquer frame. Small enough for an entryway, loud enough to notice on the way out. Checks how you look, improves how the wall looks.",
    material: "Lacquered frame, mirror glass",
    finish: "High gloss",
    colour: "Hot pink",
    dimensions: "500 × 600 × 25 mm",
    price: 12500,
    currency: "INR",
    status: "available",
    images: ["/objects/wavy-mirror.webp"],
    lifestyleImages: [],
    leadTime: "Made to order · dispatched within 10 working days",
    care: "Glass cleaner on the cloth, never on the frame.",
    installation: "Two D-rings, wire hung.",
    featured: false,
    process: STD_PROCESS,
    seoTitle: "Pink Wavy Mirror: Organic Wall Mirror",
    seoDescription: "An organic wavy-edged mirror in a hot-pink lacquer frame, 50 × 60 cm. A mirror shaped like a good mood. Made to order, {price}.",
  },
  {
    id: "p012",
    objectNumber: "012",
    slug: "ripple-mirror",
    name: "Ripple Mirror",
    shortName: "Ripple Mirror",
    category: "Wall Object",
    subcategory: "Mirror",
    tags: ["wall", "mirror"],
    shortDescription: "A full-length mirror with a stacked, rippling edge, in butter yellow.",
    description:
      "A tall leaning mirror framed by stacked, rippling layers — like the reflection is quietly sending out rings. In a soft butter yellow that warms up a whole corner. Big enough to check your shoes; interesting enough that people look at the frame instead.",
    material: "Layered MDF, mirror glass",
    finish: "Matte butter yellow",
    colour: "Butter yellow",
    dimensions: "800 × 1600 × 60 mm",
    price: 24000,
    currency: "INR",
    status: "available",
    images: ["/objects/ripple-mirror.webp"],
    lifestyleImages: [],
    imageFit: "cover",
    leadTime: "Made to order · dispatched within 10 working days",
    care: "Glass cleaner on the cloth, never on the frame.",
    installation: "Leans against the wall, or wall-fixed with the included bracket.",
    featured: false,
    process: STD_PROCESS,
    seoTitle: "Ripple Mirror: Full-Length Wavy Mirror, Butter Yellow",
    seoDescription: "A tall leaning mirror framed by stacked rippling layers in soft butter yellow. 80 × 160 cm. Made to order in Bengaluru, {price}.",
  },
  {
    id: "p013",
    objectNumber: "013",
    slug: "patterned-coasters",
    name: "Patterned Coasters",
    shortName: "Coasters",
    category: "Table Object",
    subcategory: "Tabletop",
    tags: ["table"],
    occasions: ["just-because"],
    shortDescription: "Set of four. Each one a different small argument.",
    description:
      "Four wavy-edged coasters, each with its own pattern — stripes, checks, ripples. No two the same, on purpose. The rings your glass leaves actually look good on these.",
    material: "Cast resin, cork base",
    finish: "Gloss",
    colour: "Assorted",
    dimensions: "4 × (100 × 100 × 8 mm)",
    price: 3200,
    currency: "INR",
    status: "available",
    images: ["/objects/patterned-coasters.webp"],
    lifestyleImages: [],
    leadTime: "Made to order · dispatched within 10 working days",
    care: "Hand wash. Cork keeps your table safe.",
    installation: "None. Put a drink on it.",
    featured: false,
    process: STD_PROCESS,
    seoTitle: "Patterned Coasters: Set of 4 Wavy Resin Coasters",
    seoDescription: "Four wavy-edged cast-resin coasters with cork bases, no two the same. Coasters deserve better. Made to order, {price}.",
  },
  {
    id: "p024",
    objectNumber: "024",
    slug: "x-plus-o",
    name: "X + O",
    shortName: "X + O",
    category: "Table Object",
    subcategory: "Game",
    tags: ["table"],
    occasions: ["wedding", "just-because"],
    shortDescription: "Looks like brass on marble. Someone always cheats.",
    description:
      "A marble-look board and a set of brass-look Xs and Os, all made in acrylic: noughts and crosses for the coffee table. It looks like an heirloom and plays like a grudge match. It settles nothing and starts everything. The most unnecessary thing we make, which is exactly why it exists.",
    material: "Acrylic: marble-look board, brass-look pieces",
    finish: "Gold and marble effect",
    colour: "Gold / white marble effect",
    dimensions: "220 × 220 mm board",
    price: 4900,
    currency: "INR",
    status: "available",
    images: ["/objects/x-plus-o.webp"],
    lifestyleImages: [],
    imageFit: "cover",
    video: "/media/x-plus-o.mp4",
    leadTime: "Made to order · dispatched within 10 working days",
    care: "Wipe with a soft, slightly damp cloth. Nothing abrasive.",
    installation: "None. Just don't lose the pieces.",
    featured: false,
    process: STD_PROCESS,
    seoTitle: "X + O: Marble & Gold Acrylic Noughts and Crosses",
    seoDescription: "A marble-look acrylic board with brass-look acrylic Xs and Os. Wonderfully unnecessary, and a gift for the one who has everything. Made to order, {price}.",
  },
  {
    id: "p025",
    objectNumber: "025",
    slug: "cat-got-your-heart",
    name: "Cat Got Your Heart",
    shortName: "Cat",
    category: "Wall Object",
    subcategory: "Wall art",
    tags: ["wall"],
    occasions: ["just-because"],
    shortDescription: "A cat, mid-stretch, with a heart cut clean out of it.",
    description:
      "A single sheet of steel cut into a cat mid-stretch, tail up, with a heart lifted straight out of its middle — so the wall behind becomes the heart. In a matte black that reads as a clean silhouette from across the room. Sentimental, but it refuses to be soppy about it.",
    material: "Laser-cut steel",
    finish: "Matte black powder-coat",
    colour: "Matte black",
    dimensions: "500 × 460 × 3 mm",
    price: 7500,
    currency: "INR",
    status: "available",
    images: [
      "/lifestyle/cat-heart-1.webp",
      "/lifestyle/cat-heart-2.webp",
      "/lifestyle/cat-heart-3.webp",
    ],
    lifestyleImages: [],
    imageFit: "cover",
    leadTime: "Made to order · dispatched within 10 working days",
    care: "Dry cloth. Powder-coat is tough; still, be kind.",
    installation: "Two keyholes, sits flush to the wall.",
    featured: false,
    process: STD_PROCESS,
    seoTitle: "Cat Got Your Heart: Black Metal Cat Wall Art",
    seoDescription: "A laser-cut matte-black steel cat with a heart cut out, so your wall becomes the heart. 50 × 46 cm. Made to order, {price}.",
  },
  {
    id: "p033",
    objectNumber: "033",
    slug: "small-planet",
    name: "Small Planet",
    shortName: "Small Planet",
    category: "Wall Object",
    subcategory: "Wall art",
    tags: ["wall"],
    shortDescription: "A boy, a fox, a very small planet and a sky full of stars.",
    description:
      "A single sheet of steel cut into a tiny planet with two friends sitting on top, scarf caught in the wind, and a sky of stars rising on long stems above them. In a soft matte white that lets the wall do the colour and the shadows do the drawing. Made for nurseries, reading corners and anyone who still looks up.",
    material: "Laser-cut steel",
    finish: "Matte white powder-coat",
    colour: "Matte white",
    dimensions: "Approx. 600 × 850 × 3 mm",
    price: 8500,
    currency: "INR",
    status: "available",
    images: [
      "/objects/small-planet-1.webp",
      "/objects/small-planet-2.webp",
      "/objects/small-planet-3.webp",
    ],
    lifestyleImages: [],
    imageFit: "cover",
    leadTime: "Made to order · dispatched within 10 working days",
    care: "Dry cloth. Powder-coat is tough; still, be kind.",
    installation: "Keyhole fixings, sits a few millimetres off the wall for a soft shadow.",
    featured: false,
    process: STD_PROCESS,
    seoTitle: "Small Planet: White Metal Wall Art for Kids' Rooms",
    seoDescription: "Laser-cut white steel wall art: two friends on a tiny planet under the stars. For nurseries, kids' rooms and living rooms. {price}.",
  },
  {
    id: "p026",
    objectNumber: "026",
    slug: "pickleball-shadow-box",
    name: "Pickleball Shadow Box",
    shortName: "Pickleball Box",
    category: "Wall Object",
    subcategory: "Frame",
    tags: ["wall", "frame"],
    custom: true,
    shortDescription: "Your paddle, framed like it won something. Made to order.",
    description:
      "A deep wooden shadow box that turns a pickleball paddle into wall art — court lines, acrylic mounts, and the ball floating beside it. Personalise it: a club crest, a final score, the names of whoever you keep losing to. Made to order, one at a time.",
    material: "Oak shadow box, acrylic mounts",
    finish: "Oiled oak / court felt",
    colour: "Green or clay court",
    dimensions: "300 × 600 × 60 mm",
    price: 9500,
    currency: "INR",
    status: "available",
    images: ["/objects/pickleball-shadow-box.webp"],
    lifestyleImages: [
      "/lifestyle/pickleball-1.webp",
      "/lifestyle/pickleball-2.webp",
      "/lifestyle/pickleball-3.webp",
    ],
    imageFit: "cover",
    leadTime: "Made to order · dispatched within 10 working days",
    care: "Dust the glass. Don't actually play with the framed one.",
    installation: "Two wall fixings; hangs like a picture.",
    featured: false,
    process: STD_PROCESS,
    seoTitle: "Pickleball Shadow Box: Personalised Paddle Frame",
    seoDescription: "Your paddle, framed like it won something. Oak shadow box with court lines, personalised with names, scores or a club crest. {price}.",
  },
  // --- EDITIONS · art prints in an LED slim (edge-lit) frame -----------------
  {
    id: "p027",
    objectNumber: "027",
    slug: "old-habits",
    name: "Old Habits",
    shortName: "Old Habits",
    category: "Wall Object",
    subcategory: "Art print · LED frame",
    tags: ["wall", "art"],
    shortDescription: "A 17th-century gentleman, caught with a very modern refreshment.",
    description:
      "An old-master portrait painted with total gravity — the hat, the lace collar, the brooding light — holding something that absolutely did not exist in the 1600s. The joke lands slowly, then won't leave. Backlit in an LED slim frame, the reds quietly glow.",
    material: "Giclée print, LED slim lightbox frame",
    finish: "Edge-lit acrylic face",
    colour: "Oil-dark / red",
    dimensions: "A2 · 420 × 594 × 40 mm",
    price: 9500,
    currency: "INR",
    status: "available",
    images: ["/objects/old-habits.webp", "/objects/old-habits-lit.webp"],
    lifestyleImages: [],
    imageFit: "contain",
    collection: "editions",
    leadTime: "Made to order · dispatched within 10 working days",
    care: "Dust the acrylic face with a dry cloth.",
    installation: "Plugs in; hangs flush or leans on a shelf.",
    featured: false,
    process: STD_PROCESS,
    seoTitle: "Old Habits: Backlit Old-Master Wall Art (A2)",
    seoDescription: "An old-master portrait with an anachronistic twist, in an edge-lit LED slim frame. A2. Made to order in Bengaluru, {price}.",
  },
  {
    id: "p028",
    objectNumber: "028",
    slug: "smoke-and-feathers",
    name: "Smoke & Feathers",
    shortName: "Smoke & Feathers",
    category: "Wall Object",
    subcategory: "Art print · LED frame",
    tags: ["wall", "art"],
    shortDescription: "A Renaissance portrait, spliced down the middle with now.",
    description:
      "A classical portrait interrupted — a scarlet macaw, hothouse orchids and roses, and a single grayscale hand mid-drag cut straight through the centre. Old and new, colour and monochrome, held in one uneasy frame. Lit from within, the greens go electric.",
    material: "Giclée print, LED slim lightbox frame",
    finish: "Edge-lit acrylic face",
    colour: "Botanical / scarlet",
    dimensions: "A2 · 420 × 594 × 40 mm",
    price: 9500,
    currency: "INR",
    status: "available",
    images: ["/objects/smoke-and-feathers.webp", "/objects/smoke-and-feathers-lit.webp"],
    lifestyleImages: [],
    imageFit: "contain",
    collection: "editions",
    leadTime: "Made to order · dispatched within 10 working days",
    care: "Dust the acrylic face with a dry cloth.",
    installation: "Plugs in; hangs flush or leans on a shelf.",
    featured: false,
    process: STD_PROCESS,
    seoTitle: "Smoke & Feathers: Backlit Collage Wall Art (A2)",
    seoDescription: "A Renaissance portrait collaged with a parrot and orchids, in an edge-lit LED slim frame. A2. Made to order, {price}.",
  },
  {
    id: "p029",
    objectNumber: "029",
    slug: "pomegranate-study",
    name: "Pomegranate Study",
    shortName: "Pomegranate Study",
    category: "Wall Object",
    subcategory: "Art print · LED frame",
    tags: ["wall", "art"],
    shortDescription: "A botanical plate of the pomegranate. Quiet, exact, a little obsessive.",
    description:
      "A proper natural-history plate of Punica granatum — flower, whole fruit, cross-section and arils, all annotated in the old botanical way. The calm one in the collection. Backlit, the rind glows like stained glass.",
    material: "Giclée print, LED slim lightbox frame",
    finish: "Edge-lit acrylic face",
    colour: "Aged paper / red",
    dimensions: "A2 · 420 × 594 × 40 mm",
    price: 9500,
    currency: "INR",
    status: "available",
    images: ["/objects/pomegranate-study.webp", "/objects/pomegranate-study-lit.webp"],
    lifestyleImages: [],
    imageFit: "contain",
    collection: "editions",
    leadTime: "Made to order · dispatched within 10 working days",
    care: "Dust the acrylic face with a dry cloth.",
    installation: "Plugs in; hangs flush or leans on a shelf.",
    featured: false,
    process: STD_PROCESS,
    seoTitle: "Pomegranate Study: Backlit Botanical Wall Art (A2)",
    seoDescription: "A botanical pomegranate plate in an edge-lit LED slim frame. A2. Light it up and the wall glows. Made to order, {price}.",
  },
  {
    id: "p030",
    objectNumber: "030",
    slug: "blood-moon",
    name: "Blood Moon",
    shortName: "Blood Moon",
    category: "Wall Object",
    subcategory: "Art print · LED frame",
    tags: ["wall", "art"],
    shortDescription: "A reclining figure, four watchful egrets, a red moon.",
    description:
      "A reclining figure on a rust-coloured plain, four egrets keeping watch, a blood-red moon overhead. Dreamlike and a little uneasy — the moody one. In the LED slim frame, the moon becomes the last thing glowing in the room.",
    material: "Giclée print, LED slim lightbox frame",
    finish: "Edge-lit acrylic face",
    colour: "Oxblood / green",
    dimensions: "A2 · 420 × 594 × 40 mm",
    price: 9500,
    currency: "INR",
    status: "available",
    images: ["/objects/blood-moon.webp", "/objects/blood-moon-lit.webp"],
    lifestyleImages: [],
    imageFit: "contain",
    collection: "editions",
    leadTime: "Made to order · dispatched within 10 working days",
    care: "Dust the acrylic face with a dry cloth.",
    installation: "Plugs in; hangs flush or leans on a shelf.",
    featured: false,
    process: STD_PROCESS,
    seoTitle: "Blood Moon: Backlit LED Wall Art Print (A2)",
    seoDescription: "Egrets under a red moon, in an edge-lit LED slim frame. A2. One very moody moon for your wall. Made to order, {price}.",
  },
  {
    id: "p031",
    objectNumber: "031",
    slug: "well-look-at-you",
    name: "Well, Look At You",
    shortName: "Well, Look At You",
    category: "Wall Object",
    subcategory: "Mirror",
    tags: ["wall", "mirror"],
    occasions: ["wedding"],
    shortDescription: "A wavy oxblood mirror that compliments you back.",
    description:
      "A glossy, wavy-edged mirror in deep oxblood, with a round mirror at its centre and “well, look at you” curving around the rim. Equal parts mirror and small daily hype-man — it checks your outfit and quietly improves your ego on the way out.",
    material: "Lacquered MDF, mirror glass",
    finish: "High-gloss oxblood",
    colour: "Oxblood red",
    dimensions: "600 × 600 × 25 mm",
    price: 13500,
    currency: "INR",
    status: "available",
    images: ["/objects/well-look-at-you.webp"],
    lifestyleImages: [],
    imageFit: "cover",
    leadTime: "Made to order · dispatched within 10 working days",
    care: "Glass cleaner on the cloth, never on the frame.",
    installation: "Two D-rings, wire hung.",
    featured: false,
    process: STD_PROCESS,
    seoTitle: "Well, Look At You: Oxblood Wavy Statement Mirror",
    seoDescription: "A glossy oxblood wavy mirror with “well, look at you” around the rim. 60 × 60 cm. Made to order in Bengaluru, {price}.",
  },
  {
    id: "p032",
    objectNumber: "032",
    slug: "love-more",
    name: "Love More",
    shortName: "Love More",
    category: "Wall Object",
    subcategory: "Typographic",
    tags: ["wall"],
    occasions: ["wedding"],
    shortDescription: "Two words, in chunky mirror-gold. Subtle as a hug.",
    description:
      "“LOVE MORE” in fat, rounded, stacked letters with a mirror-gold finish — a little disco, a little sincere. Big enough to run a wall, cheerful enough to get away with saying it out loud. Reads across a room and catches every bit of afternoon light.",
    material: "Layered acrylic, mirror-gold finish",
    finish: "Mirror gold",
    colour: "Gold",
    dimensions: "900 × 620 × 45 mm",
    price: 18000,
    currency: "INR",
    status: "available",
    images: ["/objects/love-more.webp", "/objects/love-more-2.webp"],
    lifestyleImages: [],
    imageFit: "cover",
    leadTime: "Made to order · dispatched within 10 working days",
    care: "Dust the faces with a dry microfibre cloth.",
    installation: "French cleat; sits flush and level.",
    featured: false,
    process: STD_PROCESS,
    seoTitle: "Love More: Mirror-Gold Wall Lettering",
    seoDescription: "Chunky mirror-gold LOVE MORE dimensional letters for the wall, 90 × 62 cm. A wedding or housewarming statement. Made to order, {price}.",
  },
  {
    id: "p034",
    objectNumber: "034",
    slug: "custom-lightbox",
    name: "Custom Lightbox",
    shortName: "Custom Lightbox",
    category: "Wall Object",
    subcategory: "Light",
    tags: ["wall", "light"],
    custom: true,
    shortDescription: "Your line, lit up. Any words, any language, any colour.",
    description:
      "A long, slim lightbox for the home with the words of your choice set across a glowing face. A favourite line of poetry, a family saying, a name, a quiet instruction to yourself. In Hindi, English, or whatever your house speaks, in the colour you want the room to turn after dark. Off, it's a crisp black-framed panel. On, it's the thing everyone asks about.",
    material: "Black metal frame, diffused acrylic face, LED",
    finish: "Matte black frame",
    colour: "Light colour of your choice",
    dimensions: "900 × 150 × 60 mm",
    price: 9500,
    currency: "INR",
    status: "available",
    images: ["/objects/custom-lightbox-1.webp", "/objects/custom-lightbox-2.webp"],
    lifestyleImages: [],
    imageFit: "cover",
    personalise: [
      { id: "text", label: "YOUR TEXT (ANY LANGUAGE)", cartLabel: "Text", placeholder: "e.g. Bol ke lab azaad hain tere", maxLength: 60 },
      { id: "colour", label: "LIGHT COLOUR", cartLabel: "Colour", placeholder: "e.g. warm amber, red", maxLength: 30 },
    ],
    leadTime: "Made to order · dispatched within 10 working days",
    care: "Dust the face with a dry microfibre cloth. Unplug before cleaning.",
    installation: "Wall-mounted on two brackets. Plugs into a regular socket.",
    featured: false,
    process: STD_PROCESS,
    seoTitle: "Custom Lightbox: Personalised LED Light Box Sign",
    seoDescription: "A slim LED lightbox with your words in any language and any light colour. 90 × 15 cm. Signage skills, aimed at home. {price}.",
  },
  {
    id: "p036",
    objectNumber: "036",
    slug: "slim-led-quote-frame",
    name: "Slim LED Quote Frame",
    shortName: "Quote Frame",
    category: "Wall Object",
    subcategory: "Art",
    tags: ["wall", "art", "light"],
    occasions: ["housewarming", "just-because"],
    shortDescription: "Big words, softly backlit. Five quotes, five colourways.",
    description:
      "A big, bold typographic print in a slim LED frame that throws a warm glow onto the wall behind it, so the words read from across the room, day or night. Pick your line: \u201cThis house has NO RULES about what belongs together\u201d, \u201cWe could all use MORE COLOUR than we think we need\u201d, \u201cSometimes you need LESS SENSE and a little more fun\u201d, \u201cLife needs LITTLE JOYS in places you don\u2019t expect\u201d, or \u201cThere\u2019s always MORE ROOM for one more bad idea\u201d. Each comes in its own colourway. Made for entryways, dining rooms, powder rooms and the meeting room that needs cheering up.",
    material: "Printed graphic, LED slim lightbox frame",
    finish: "Matte print, 20 mm slim black frame, warm backlight",
    colour: "Five colourways, one per quote",
    dimensions: "A1 · 650 × 900 × 20 mm overall · 575 × 820 mm visible print",
    price: 12500,
    currency: "INR",
    status: "available",
    images: [
      "/objects/quote-frame-no-rules.webp",
      "/objects/quote-frame-more-colour.webp",
      "/objects/quote-frame-less-sense.webp",
      "/objects/quote-frame-little-joys.webp",
      "/objects/quote-frame-more-room.webp",
    ],
    lifestyleImages: [],
    imageFit: "cover",
    variantLegend: "CHOOSE YOUR QUOTE",
    variants: [
      { id: "no-rules", label: "NO RULES", note: "Black on cream", price: 12500, image: "/objects/quote-frame-no-rules.webp" },
      { id: "more-colour", label: "MORE COLOUR", note: "Blue on yellow", price: 12500, image: "/objects/quote-frame-more-colour.webp" },
      { id: "less-sense", label: "LESS SENSE", note: "Green on blush", price: 12500, image: "/objects/quote-frame-less-sense.webp" },
      { id: "little-joys", label: "LITTLE JOYS", note: "Blue on cream", price: 12500, image: "/objects/quote-frame-little-joys.webp" },
      { id: "more-room", label: "MORE ROOM", note: "Red on cream", price: 12500, image: "/objects/quote-frame-more-room.webp" },
    ],
    leadTime: "Made to order · dispatched within 10 working days",
    care: "Dust the face with a dry cloth. Unplug before cleaning.",
    installation: "Hangs flat on the wall, portrait or landscape, and plugs into a regular socket. High-brightness LEDs, 12 V, 13.5 W.",
    featured: false,
    process: STD_PROCESS,
    seoTitle: "Slim LED Quote Frame: Backlit Typography Wall Art (A1)",
    seoDescription: "Bold quote prints in a slim LED backlit frame, A1. Five quotes, five colourways: No Rules, More Colour, Less Sense, Little Joys, More Room. {price}.",
  },
];

/** everything we sell: home objects + Off The Wall tees */
export const products: Product[] = [...objects, ...tees];
/** home objects only (the /objects catalogue, gift guide, home page) */
export const homeObjects: Product[] = objects;
export const isTee = (p: Product) => p.category === "Off The Wall";

// --- helpers ---------------------------------------------------------------

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeatured(): Product[] {
  return products.filter((p) => p.featured).slice(0, 7);
}

export function getByTag(tag: FilterTag | "all"): Product[] {
  if (tag === "all") return products;
  return products.filter((p) => p.tags.includes(tag));
}

/** related = same primary tag, different product */
export function getRelated(slug: string, count = 3): Product[] {
  const p = getProduct(slug);
  if (!p) return [];
  const primary = p.tags[0];
  const range = isTee(p) ? tees : objects;
  const pool = range.filter(
    (x) => x.slug !== slug && x.tags.includes(primary)
  );
  const fill = range.filter(
    (x) => x.slug !== slug && !pool.includes(x)
  );
  return [...pool, ...fill].slice(0, count);
}

export function getAdjacent(slug: string) {
  const p = getProduct(slug);
  const list = p && isTee(p) ? tees : objects; // stay within the same range
  const i = list.findIndex((x) => x.slug === slug);
  return {
    prev: i > 0 ? list[i - 1] : undefined,
    next: i >= 0 && i < list.length - 1 ? list[i + 1] : undefined,
  };
}

export const FILTERS: { key: FilterTag | "all"; label: string }[] = [
  { key: "all", label: "ALL" },
  { key: "wall", label: "WALL" },
  { key: "table", label: "TABLE" },
  { key: "light", label: "LIGHT" },
  { key: "mirror", label: "MIRROR" },
  { key: "frame", label: "FRAME" },
  { key: "art", label: "ART" },
];

// --- status → UI -----------------------------------------------------------

export const STATUS_LABEL: Record<ProductStatus, string> = {
  available: "Made to order",
  preorder: "Made to order",
  "coming-soon": "Coming soon",
  // never claim "sold out": nothing is stocked, everything is made to order
  "sold-out": "Taking a short break",
  waitlist: "Taking a short break",
};

/** the badge shown next to the price */
export function badge(p: Product): string {
  if (!isPurchasable(p)) return p.price == null ? STATUS_LABEL["coming-soon"] : STATUS_LABEL.waitlist;
  return p.custom ? "Made to order · personalised" : "Made to order";
}

/** custom/personalised pieces are final sale (see /shipping-returns) */
export function isFinalSale(p: Product): boolean {
  return !!p.custom;
}

/** meta description with live values filled in from product data */
export function metaDescription(p: Product): string {
  return p.seoDescription.replace("{price}", formatPrice(p.price, p.currency));
}

export const UNAVAILABLE_LINE =
  "Taking a short break from the laser bed. Tell us you want one and you'll hear first.";

/** button copy driven entirely by status (never hardcode per page) */
export const STATUS_CTA: Record<ProductStatus, string> = {
  available: "ADD TO CART",
  preorder: "ADD TO CART",
  "coming-soon": "TELL ME WHEN",
  "sold-out": "TELL ME FIRST",
  waitlist: "TELL ME FIRST",
};

/** can this product be added to the cart? */
/** true when a product's variants are priced differently (show "FROM") */
export function hasPriceRange(p: Product): boolean {
  if (p.options?.some((o) => o.choices.some((c) => c.priceDelta))) return true;
  return new Set((p.variants ?? []).map((v) => v.price)).size > 1;
}

export function isPurchasable(p: Product): boolean {
  return (
    p.orderable !== false &&
    (p.status === "available" || p.status === "preorder") &&
    p.price != null
  );
}

export function formatPrice(price: number | null, currency = "INR"): string {
  if (price == null) return "PRICE COMING SOON";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

// --- occasions (gift guide → /objects?occasion=…) --------------------------

export const OCCASIONS: { key: Occasion; label: string; note: string }[] = [
  { key: "housewarming", label: "HOUSEWARMING", note: "For the new wall" },
  { key: "wedding", label: "WEDDING", note: "Two homes becoming one" },
  { key: "just-because", label: "JUST BECAUSE", note: "The best reason" },
];

export function getByOccasion(o: Occasion): Product[] {
  return products.filter((p) => p.occasions?.includes(o));
}
