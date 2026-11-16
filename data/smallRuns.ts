import type { Product, ProcessStep } from "@/lib/types";
import { TEE_PRICE, TEE_SIZES } from "./tees";

// ---------------------------------------------------------------------------
// SMALL RUNS: pieces made by hand in short batches on the studio's cutting
// machine (cut vinyl on mirror, fabric, ceramic and cotton). Photos live in
// /public/small-runs (cleaned-up studio shots; originals in
// ~/Downloads/look-here-studio-smallruns).
// Order matters: this is the order on /small-runs, with the
// Only Fans tee deliberately last.
// ---------------------------------------------------------------------------

const LEAD = "Made to order · dispatched within 10 working days";

const VINYL_PROCESS: ProcessStep[] = [
  { step: "01", label: "DRAW", note: "the art, cleaned for cutting" },
  { step: "02", label: "CUT", note: "vinyl, one design at a time" },
  { step: "03", label: "WEED", note: "every tiny bit picked out by hand" },
  { step: "04", label: "APPLY", note: "pressed or stuck down, bubble-free" },
  { step: "05", label: "PACK", note: "wrapped so nothing scuffs" },
];

const base = {
  currency: "INR" as const,
  status: "available" as const,
  lifestyleImages: [],
  imageFit: "cover" as const,
  leadTime: LEAD,
  featured: false,
  process: VINYL_PROCESS,
};

const SMALL_RUN_NOTE =
  "A small run: made in short batches, so a design can retire without warning. Want it in another colour or size, or your own art? Ask for a custom version.";

// ---- tees -----------------------------------------------------------------

const TEE_CARE =
  "Wash inside out in cold water on a gentle cycle. Don't bleach or tumble dry, and don't iron directly on the print. Dry in the shade.";

interface SmallTeeSpec {
  n: number;
  slug: string;
  name: string;
  copy: string;
  colour: { id: string; label: string };
  images: string[];
}

function smallTee(t: SmallTeeSpec): Product {
  const slug = `tee-${t.slug}`;
  return {
    ...base,
    id: `s${String(t.n).padStart(2, "0")}`,
    objectNumber: `S${String(t.n).padStart(2, "0")}`,
    slug,
    name: `${t.name} Tee`,
    shortName: t.name,
    category: "Small Run",
    subcategory: "T-shirt",
    tags: ["tee"],
    shortDescription: t.copy.split(". ")[0].replace(/\.$/, "") + ".",
    description: `${t.copy} Heat-pressed vinyl on an oversized cotton tee, made in a small run. ${SMALL_RUN_NOTE}`,
    material: "Oversized cotton tee, heat-pressed vinyl print",
    finish: "Raised vinyl print on the front",
    colour: t.colour.label,
    dimensions: "XS–XXL · oversized fit (see size chart)",
    price: TEE_PRICE,
    images: t.images,
    sizeChart: "tee",
    options: [
      {
        id: "size",
        legend: "CHOOSE YOUR SIZE",
        required: true,
        choices: TEE_SIZES.map((s) => ({ id: s.toLowerCase(), label: s })),
      },
      { id: "colour", legend: "COLOUR", choices: [{ id: t.colour.id, label: t.colour.label, image: t.images[0] }] },
    ],
    care: TEE_CARE,
    installation: "Print sits on the front of the tee. Fits oversized: size down for a closer fit.",
    seoTitle: `${t.name} T-Shirt: Small-Run Vinyl Print Tee`,
    seoDescription: `${t.copy.split(". ")[0]}. Oversized cotton tee, heat-pressed vinyl print, XS–XXL. Small run, made to order in Bengaluru, {price}.`,
  };
}

const spaceCat = smallTee({
  n: 5,
  slug: "space-cat",
  name: "Space Cat",
  copy: "A cat in a full astronaut suit floats upright, fists up, next to a column of Japanese lettering. Calm, a bit smug and entirely out of this world.",
  colour: { id: "black", label: "Black, white print" },
  images: ["/small-runs/tee-space-cat-hanging.webp", "/small-runs/tee-space-cat-worn.webp"],
});

const uninstallAstrology = smallTee({
  n: 6,
  slug: "uninstall-astrology",
  name: "Uninstall Astrology",
  copy: "A round, swirly 70s lettering block that says UNINSTALL ASTROLOGY, INSTALL CRITICAL THINKING. For anyone who has ever been told Mercury is why they're like this.",
  colour: { id: "sand", label: "Sand, white print" },
  images: [
    "/small-runs/tee-uninstall-astrology-worn-bed.webp",
    "/small-runs/tee-uninstall-astrology-hanging.webp",
    "/small-runs/tee-uninstall-astrology-detail.webp",
    "/small-runs/tee-uninstall-astrology.webp",
  ],
});

const onlyFans = smallTee({
  n: 8,
  slug: "only-fans",
  name: "Only Fans",
  copy: "A big ONLY FANS headline over every kind of fan there is: ceiling, table, pedestal, hand fan, even the air conditioner. For people who are only here for the airflow.",
  colour: { id: "navy", label: "Navy, cream print" },
  images: ["/small-runs/tee-only-fans.webp"],
});

const achaariGend = smallTee({
  n: 15,
  slug: "achaari-gend",
  name: "Achaari Gend",
  copy: "A clay jar of tangy mango pickle with a neon pickleball resting against it. The tee for people who play hard and still smuggle achaar into the bag.",
  colour: { id: "black", label: "Black, full-colour print" },
  images: [
    "/small-runs/tee-achaari-gend-worn.webp",
    "/small-runs/tee-achaari-gend-bench.webp",
    "/small-runs/tee-achaari-gend-hanging.webp",
  ],
});

// ---- objects --------------------------------------------------------------

const mirrorDiscs: Product = {
  ...base,
  id: "s01",
  objectNumber: "S01",
  slug: "mirror-discs",
  name: "Light-Cast Mirror Disc",
  shortName: "Mirror Disc",
  category: "Small Run",
  subcategory: "Mirror",
  tags: ["mirror", "art"],
  occasions: ["just-because"],
  shortDescription: "A small round mirror that casts its design onto the wall when the sun hits it.",
  description:
    "A 4-inch round mirror with the design cut from red vinyl and pressed onto the surface. It's a mirror on a shelf, and when light falls on it, it throws the design across the wall as a glowing shadow. Pick a design, or take all three. Made in a small run, so each design is only around while we're still cutting it.",
  material: "Acrylic mirror disc, cut vinyl",
  finish: "Red cut-vinyl design",
  colour: "Red on mirror",
  dimensions: "4 in (10 cm) round",
  price: 549,
  images: [
    "/small-runs/mirror-bitches.webp",
    "/small-runs/mirror-fruit-blossom.webp",
    "/small-runs/mirror-red-bloom.webp",
    "/small-runs/mirror-set.webp",
    "/small-runs/mirror-light-cast.webp",
  ],
  variantLegend: "CHOOSE YOUR DESIGN",
  variants: [
    { id: "bitches", label: "BITCHES ARE PEOPLE TOO", note: "Heart + lettering", price: 549, image: "/small-runs/mirror-bitches.webp" },
    { id: "fruit-blossom", label: "FRUIT + BLOSSOM", note: "Cherry, plum blossom, moon ring", price: 549, image: "/small-runs/mirror-fruit-blossom.webp" },
    { id: "red-bloom", label: "RED BLOOM", note: "Single flower in a ring", price: 549, image: "/small-runs/mirror-red-bloom.webp" },
    { id: "set-of-3", label: "SET OF 3", note: "All three designs", price: 1499, image: "/small-runs/mirror-set.webp" },
  ],
  care: "Wipe with a soft dry cloth. Don't scrub or soak: the vinyl is stuck on, not printed.",
  installation: "Lean it on a shelf, desk or window ledge where sunlight reaches it, and the design lands on the wall opposite.",
  seoTitle: "Light-Cast Mirror Disc: 4-Inch Vinyl Mirror That Throws Its Design on the Wall",
  seoDescription: "A 4-inch round mirror with a red vinyl design that casts onto your wall in sunlight. Three designs or a set of three. Small run, made to order in Bengaluru, {price}.",
};

const framedFabric: Product = {
  ...base,
  id: "s02",
  objectNumber: "S02",
  slug: "trying-to-get-my-shit-together",
  name: "Trying To Get My Shit Together",
  shortName: "My Shit Together",
  category: "Small Run",
  subcategory: "Framed fabric",
  tags: ["wall", "frame", "art"],
  occasions: ["just-because"],
  shortDescription: "A cat, a litter tray, and a brave attempt, in white vinyl over block-printed fabric.",
  description:
    "A cat balanced on the edge of a litter tray, above the words TRYING TO GET MY SHIT TOGETHER, in white vinyl over a rich block-printed fabric, framed under glass in a white frame. It's the honest version of a motivational poster. The fabric is a small-run find, so the pattern on yours may differ a little from the photo.",
  material: "Block-printed fabric, cut vinyl, glass-fronted frame",
  finish: "White vinyl on printed fabric, white frame",
  colour: "White on rust and ochre",
  dimensions: "A4 · frame 24 × 30 cm",
  price: 1499,
  images: ["/small-runs/fabric-frame-a4.webp", "/small-runs/fabric-frame-a4-detail.webp"],
  care: "Dust the glass with a dry cloth. Keep out of direct sunlight so the fabric doesn't fade.",
  installation: "Hangs from a single nail or screw, or stands on a shelf.",
  seoTitle: "Trying To Get My Shit Together: Framed Fabric Wall Art",
  seoDescription: "A white vinyl cat-and-litter-tray design over block-printed fabric, framed under glass (A4). Small run, made to order in Bengaluru, {price}.",
};

const elephantDecals: Product = {
  ...base,
  id: "s04",
  objectNumber: "S04",
  slug: "gold-elephant-decals",
  name: "Gold Elephant Wall Decals",
  shortName: "Elephant Decals",
  category: "Small Run",
  subcategory: "Wall decal",
  tags: ["wall"],
  occasions: ["housewarming"],
  shortDescription: "A little herd of gold elephants, scattered up a wall like wallpaper you stuck on yourself.",
  description:
    "A sheet of 25 small gold elephants, each 4.35 × 2.94 cm, cut from permanent vinyl, made to be scattered across a wall at any spacing you like: a loose herd across a bathroom, a trail up a staircase, a few on the nursery wall. No pattern repeat, no wallpaper paste, no commitment.",
  material: "Gold permanent vinyl, cut to shape",
  finish: "Gold",
  colour: "Gold",
  dimensions: "Sheet of 25 elephants · each 4.35 × 2.94 cm",
  price: 499,
  images: ["/small-runs/decal-elephants.webp", "/small-runs/decal-elephants-detail.webp"],
  care: "Wipe gently with a dry cloth.",
  installation: "Stick onto clean, dry, smooth painted walls. To remove, warm with a hairdryer and peel slowly.",
  seoTitle: "Gold Elephant Wall Decals: Vinyl Stickers",
  seoDescription: "A sheet of 25 gold elephant wall decals, each 4.35 × 2.94 cm. Scatter them any way you like. Small run, made to order in Bengaluru, {price}.",
};

// ---- magnets (printed, then cut, on rigid magnet sheet) ---------------------

const MAGNET_PROCESS: ProcessStep[] = [
  { step: "01", label: "DRAW", note: "the art, sized for a fridge door" },
  { step: "02", label: "PRINT", note: "colour-printed on sticker sheet" },
  { step: "03", label: "CUT", note: "outline and window cut on the machine" },
  { step: "04", label: "MOUNT", note: "stuck down on a rigid magnet" },
  { step: "05", label: "PACK", note: "flat, so nothing bends" },
];

const photoFrameMagnet: Product = {
  ...base,
  id: "s09",
  objectNumber: "S09",
  slug: "photo-frame-magnet",
  name: "Photo Strip Frame Magnet",
  shortName: "Photo Frame Magnet",
  category: "Small Run",
  subcategory: "Magnet",
  tags: ["frame", "table"],
  occasions: ["just-because"],
  shortDescription: "A rigid fridge magnet with a printed Indian-textile border and a pocket for your photo strip.",
  description:
    "A tall, slim fridge magnet framed in an Indian textile pattern: Kasavu, Kanjivaram, Bandhani, Ajrakh or Leheriya. The top is open, so you slide a photo-booth style strip into the pocket and it sits behind the window. Change the photo whenever you like. The magnet is a rigid sheet, so it stays flat on the fridge. The frame is sold empty: your photo isn't included.",
  material: "Printed frame on a rigid magnet sheet",
  finish: "Matte printed border, rounded corners",
  colour: "Choose a design",
  dimensions: "6.8 × 15 cm",
  price: 349,
  images: [
    "/small-runs/magnet-frame-lifestyle-trio.webp",
    "/small-runs/magnet-frame-lifestyle-close.webp",
    "/small-runs/magnet-frame-lifestyle-six.webp",
    "/small-runs/magnet-frame-designs.webp",
  ],
  variantLegend: "CHOOSE YOUR DESIGN",
  variants: [
    { id: "ajrakh", label: "AJRAKH", note: "Navy, red flowers", price: 349, image: "/small-runs/magnet-frame-ajrakh.webp" },
    { id: "kasavu", label: "KASAVU", note: "Cream with gold stripes", price: 349, image: "/small-runs/magnet-frame-kasavu.webp" },
    { id: "kanjivaram", label: "KANJIVARAM", note: "Deep red, gold temple border", price: 349, image: "/small-runs/magnet-frame-kanjivaram.webp" },
    { id: "bandhani", label: "BANDHANI", note: "Pink dot work", price: 349, image: "/small-runs/magnet-frame-bandhani.webp" },
    { id: "bandhani-dots", label: "BANDHANI DOTS", note: "Maroon, all-over dots", price: 349, image: "/small-runs/magnet-frame-bandhani-dots.webp" },
    { id: "leheriya", label: "LEHERIYA", note: "Red and pink waves", price: 349, image: "/small-runs/magnet-frame-leheriya.webp" },
    { id: "set-of-3", label: "SET OF 3", note: "Three designs, our pick (tell us if you have favourites)", price: 899, image: "/small-runs/magnet-frame-designs.webp" },
    { id: "set-of-6", label: "SET OF 6", note: "One of every design", price: 1699, image: "/small-runs/magnet-frame-designs.webp" },
  ],
  process: MAGNET_PROCESS,
  care: "Wipe with a dry cloth. Keep away from water and from cards with magnetic strips.",
  installation: "Slide your photo strip in from the top, then stick the magnet on any steel or iron surface, like a fridge door.",
  seoTitle: "Photo Strip Frame Magnet: Indian Textile Fridge Magnet",
  seoDescription: "A 6.8 × 15 cm rigid fridge magnet with a Kasavu, Kanjivaram, Bandhani, Ajrakh or Leheriya border and a pocket for your photo strip. Small run, made to order in Bengaluru, {price}.",
};

const swanMagnet: Product = {
  ...base,
  id: "s10",
  objectNumber: "S10",
  slug: "swan-revolt-magnet",
  name: "Long Live The Swan Revolt Magnet",
  shortName: "Swan Revolt",
  category: "Small Run",
  subcategory: "Magnet",
  tags: ["art"],
  occasions: ["just-because"],
  shortDescription: "An outraged swan, wings up, in an old-master landscape. LONG LIVE THE REVOLT.",
  description:
    "A furious swan in a stormy oil-painting landscape, wings spread, with LONG LIVE THE REVOLT set around it in serif capitals. A 15 × 10 cm rigid fridge magnet. Small run, so it may retire when the batch is done.",
  material: "Printed on a rigid magnet sheet",
  finish: "Colour print, square-cut",
  colour: "Teal, ochre and cream",
  dimensions: "15 × 10 cm",
  price: 449,
  images: [
    "/small-runs/magnet-swan-fridge-steel.webp",
    "/small-runs/magnet-swan-fridge-cream.webp",
    "/small-runs/magnet-swan.webp",
  ],
  process: MAGNET_PROCESS,
  care: "Wipe with a dry cloth. Keep away from water.",
  installation: "Sticks to any steel or iron surface, like a fridge door.",
  seoTitle: "Long Live The Swan Revolt: Fridge Magnet",
  seoDescription: "A 15 × 10 cm rigid fridge magnet: an angry swan in an old-master landscape, LONG LIVE THE REVOLT. Small run, made to order in Bengaluru, {price}.",
};

const insuranceMagnet: Product = {
  ...base,
  id: "s11",
  objectNumber: "S11",
  slug: "no-insurance-magnet",
  name: "You Have A Life, But No Insurance Magnet",
  shortName: "No Insurance",
  category: "Small Run",
  subcategory: "Magnet",
  tags: ["art"],
  occasions: ["just-because"],
  shortDescription: "A retro-comic salesman points straight at you. YOU HAVE A LIFE, BUT NO INSURANCE?!",
  description:
    "A pop-art salesman in a suit and striped tie, pointing right at you, with a speech bubble that says YOU HAVE A LIFE, BUT NO INSURANCE?!. Halftone dots, loud lettering, a 15 × 10 cm rigid fridge magnet. A guilt trip you can stick next to the takeaway menus. Small run, so it may retire when the batch is done.",
  material: "Printed on a rigid magnet sheet",
  finish: "Colour print, square-cut",
  colour: "Teal, yellow, red and cream",
  dimensions: "15 × 10 cm",
  price: 449,
  images: [
    "/small-runs/magnet-insurance-fridge-list.webp",
    "/small-runs/magnet-insurance-fridge-steel.webp",
    "/small-runs/magnet-insurance.webp",
  ],
  process: MAGNET_PROCESS,
  care: "Wipe with a dry cloth. Keep away from water.",
  installation: "Sticks to any steel or iron surface, like a fridge door.",
  seoTitle: "You Have A Life, But No Insurance: Retro Comic Fridge Magnet",
  seoDescription: "A 15 × 10 cm rigid fridge magnet: a pop-art salesman asks if you have a life but no insurance. Small run, made to order in Bengaluru, {price}.",
};

const roadTripMagnet: Product = {
  ...base,
  id: "s12",
  objectNumber: "S12",
  slug: "starry-road-trip-magnet",
  name: "Starry Road to Manichithrathzhu Magnet",
  shortName: "Starry Road to Manichithrathzhu",
  category: "Small Run",
  subcategory: "Magnet",
  tags: ["art"],
  occasions: ["just-because"],
  shortDescription: "Three unbothered travellers in a red convertible under a swirling Van Gogh sky.",
  description:
    "Three travellers in a red convertible, one in a red head-wrap, one in white with beads, one in a cream-and-red sari, cruising through poppy fields under a swirling, starry, painterly night sky. A long, slim fridge magnet printed on a rigid magnet sheet. Small run, so it may retire when the batch is done.",
  material: "Printed on a rigid magnet sheet",
  finish: "Colour print, square-cut",
  colour: "Teal, orange and red",
  dimensions: "15 × 5 cm",
  price: 349,
  images: [
    "/small-runs/magnet-roadtrip-fridge-polaroid.webp",
    "/small-runs/magnet-roadtrip-fridge-plant.webp",
    "/small-runs/magnet-roadtrip.webp",
  ],
  process: MAGNET_PROCESS,
  care: "Wipe with a dry cloth. Keep away from water.",
  installation: "Sticks to any steel or iron surface, like a fridge door.",
  seoTitle: "Starry Road to Manichithrathzhu: Painterly Fridge Magnet",
  seoDescription: "A slim rigid fridge magnet: three travellers in a red convertible under a swirling starry sky. Small run, made to order in Bengaluru, {price}.",
};

const carnationDecals: Product = {
  ...base,
  id: "s14",
  objectNumber: "S14",
  slug: "carnation-wall-stickers",
  name: "Carnation Wall Stickers",
  shortName: "Carnation Stickers",
  category: "Small Run",
  subcategory: "Wall decal",
  tags: ["wall"],
  occasions: ["housewarming", "just-because"],
  shortDescription: "Six watercolour carnations on stems, as stickers you can scatter up a wall.",
  description:
    "A set of six painted-look red carnations on green stems, each 8 cm tall, printed on sticker vinyl and cut to the flower's outline. Stick them in a loose scatter, a row or a climbing line. No frame, no wallpaper paste. They're printed rather than plain cut vinyl, so you get the soft watercolour shading.",
  material: "Printed sticker vinyl, cut to shape",
  finish: "Printed watercolour, cut to the outline",
  colour: "Red flowers, green stems",
  dimensions: "Set of 6 · each flower 8 cm tall",
  price: 349,
  images: [
    "/small-runs/decal-carnation-wall.webp",
    "/small-runs/decal-carnation-wall-sage.webp",
    "/small-runs/decal-carnation-set.webp",
  ],
  care: "Wipe gently with a dry cloth. Test on a discreet spot first: vinyl can lift paint when removed.",
  installation: "Stick onto clean, dry, smooth painted walls. To remove, warm with a hairdryer and peel slowly.",
  seoTitle: "Carnation Wall Stickers: Printed Watercolour Vinyl Decals",
  seoDescription: "A set of six 8 cm red carnation wall stickers on printed sticker vinyl. Scatter them any way you like. Small run, made to order in Bengaluru, {price}.",
};

/** order = order on /small-runs; the Only Fans tee goes last on purpose */
export const smallRuns: Product[] = [
  mirrorDiscs,
  framedFabric,
  elephantDecals,
  carnationDecals,
  photoFrameMagnet,
  swanMagnet,
  insuranceMagnet,
  roadTripMagnet,
  spaceCat,
  uninstallAstrology,
  onlyFans,
  achaariGend,
];
