import type { Product, ProcessStep } from "@/lib/types";
import { TEE_PRICE, TEE_SIZES } from "./tees";

// ---------------------------------------------------------------------------
// SMALL RUNS: pieces made by hand in short batches on the studio's cutting
// machine (cut vinyl on mirror, fabric, ceramic and cotton). Photos live in
// /public/small-runs (cleaned-up studio shots; originals in
// ~/Downloads/look-here-studio-smallruns). Anything marked "confirm" is an
// estimate from the photos: check it before this goes live.
// Order matters: this is the order on /small-runs, with the mug and the
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
  colour: { id: "navy", label: "Navy, white print" },
  images: ["/small-runs/tee-space-cat.webp"],
});

const uninstallAstrology = smallTee({
  n: 6,
  slug: "uninstall-astrology",
  name: "Uninstall Astrology",
  copy: "A round, swirly 70s lettering block that says UNINSTALL ASTROLOGY, INSTALL CRITICAL THINKING. For anyone who has ever been told Mercury is why they're like this.",
  colour: { id: "sand", label: "Sand, white print" },
  images: ["/small-runs/tee-uninstall-astrology-detail.webp", "/small-runs/tee-uninstall-astrology.webp"],
});

const onlyFans = smallTee({
  n: 8,
  slug: "only-fans",
  name: "Only Fans",
  copy: "A big ONLY FANS headline over every kind of fan there is: ceiling, table, pedestal, hand fan, even the air conditioner. For people who are only here for the airflow.",
  colour: { id: "navy", label: "Navy, cream print" },
  images: ["/small-runs/tee-only-fans.webp"],
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
  material: "Mirror-finish disc, cut vinyl (confirm acrylic)",
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
  material: "Block-printed fabric (confirm cotton), cut vinyl, glass-fronted frame",
  finish: "White vinyl on printed fabric, white frame",
  colour: "White on rust and ochre",
  dimensions: "A4 · frame about 24 × 30 cm (confirm)",
  price: 1499,
  images: ["/small-runs/fabric-frame-a4.webp", "/small-runs/fabric-frame-a4-detail.webp"],
  care: "Dust the glass with a dry cloth. Keep out of direct sunlight so the fabric doesn't fade.",
  installation: "Hangs from a single nail or screw, or stands on a shelf.",
  seoTitle: "Trying To Get My Shit Together: Framed Fabric Wall Art",
  seoDescription: "A white vinyl cat-and-litter-tray design over block-printed fabric, framed under glass (A4). Small run, made to order in Bengaluru, {price}.",
};

const leopardPanel: Product = {
  ...base,
  id: "s03",
  objectNumber: "S03",
  slug: "spotted-cat-fabric-panel",
  name: "Spotted Cat Fabric Panel",
  shortName: "Spotted Cat",
  category: "Small Run",
  subcategory: "Fabric panel",
  tags: ["wall", "art"],
  occasions: ["housewarming", "just-because"],
  shortDescription: "A cream cat, with holes where its spots should be, over a big floral print.",
  description:
    "A big, frameless fabric panel: bold floral cloth stretched over a board, with a cream cat cut out in vinyl so its spots are little windows onto the print underneath. Made for a wall that needs something loud but not a frame. The fabric is a small-run find, so yours may be a different print.",
  material: "Printed fabric stretched over board (confirm), cut vinyl",
  finish: "Cream metallic-sheen vinyl on printed fabric",
  colour: "Teal, orange and pink, cream cat",
  dimensions: "About 60 × 40 cm (confirm)",
  price: 2499,
  images: ["/small-runs/fabric-panel-leopard.webp", "/small-runs/fabric-panel-leopard-detail.webp"],
  care: "Dust with a dry cloth. Don't use water on the fabric.",
  installation: "Hangs from a single screw or leans on a shelf or console.",
  seoTitle: "Spotted Cat Fabric Panel: Frameless Printed Fabric Wall Art",
  seoDescription: "A cream vinyl cat over bold floral printed fabric, stretched on a board, no frame. Small run, made to order in Bengaluru, {price}.",
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
    "A set of small matte-gold elephants cut from vinyl, made to be scattered across a wall at any spacing you like: a loose herd across a bathroom, a trail up a staircase, a few on the nursery wall. No pattern repeat, no wallpaper paste, no commitment.",
  material: "Matte gold cut vinyl",
  finish: "Matte gold",
  colour: "Gold",
  dimensions: "Set of 10 elephants, about 6 cm each (confirm)",
  price: 499,
  images: ["/small-runs/decal-elephants.webp", "/small-runs/decal-elephants-detail.webp"],
  care: "Wipe gently with a dry cloth.",
  installation: "Stick onto clean, dry, smooth painted walls. To remove, warm with a hairdryer and peel slowly.",
  seoTitle: "Gold Elephant Wall Decals: Set of 10 Vinyl Stickers",
  seoDescription: "A set of small matte-gold elephant wall decals. Scatter them any way you like. Small run, made to order in Bengaluru, {price}.",
};

const mug: Product = {
  ...base,
  id: "s07",
  objectNumber: "S07",
  slug: "i-saw-that-mug",
  name: "I Saw That Mug",
  shortName: "I Saw That",
  category: "Small Run",
  subcategory: "Mug",
  tags: ["table"],
  occasions: ["just-because"],
  shortDescription: "A glossy black mug with a masked figure peeking round the edge. I SAW THAT.",
  description:
    "A glossy black ceramic mug with a masked figure peeking around the side and the words I SAW THAT in red vinyl. For desks where someone is definitely watching. Made in a small run, one design at a time.",
  material: "Ceramic mug, cut vinyl",
  finish: "Gloss black, red vinyl",
  colour: "Black with red",
  dimensions: "Standard ceramic mug",
  price: 549,
  images: ["/small-runs/mug-i-saw-that.webp"],
  care: "Hand wash gently only. Not for the dishwasher or microwave. Don't scrub the vinyl.",
  installation: "Fill it with something hot and look innocent.",
  seoTitle: "I Saw That Mug: Black Mug With Red Vinyl Design",
  seoDescription: "A glossy black ceramic mug with a peeking figure and I SAW THAT in red vinyl. Hand wash. Small run, made to order in Bengaluru, {price}.",
};

/** order = order on /small-runs; the mug and Only Fans tee go last on purpose */
export const smallRuns: Product[] = [
  mirrorDiscs,
  framedFabric,
  leopardPanel,
  elephantDecals,
  spaceCat,
  uninstallAstrology,
  mug,
  onlyFans,
];
