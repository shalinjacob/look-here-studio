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

// Custom pet-parent tee: the customer's pet name + title (MOM, DAD…) is stacked four times
// in gold with their pet on top. Live preview on the product page (PetTeePreview).
const petParent: Product = {
  ...smallTee({
    n: 29,
    slug: "custom-pet-parent",
    name: "Custom Pet Parent",
    copy: "Your pet's name stacked four times in gold, with your pet's face popping out over the middle. Say LUCA'S MOM, BRUNO'S DAD, or whatever you answer to at home.",
    colour: { id: "black", label: "Black, gold print" },
    images: [
      "/small-runs/tee-pet-parent-worn.webp",
      "/small-runs/tee-pet-parent-flat.webp",
      "/small-runs/tee-pet-parent-art.webp",
    ],
  }),
  name: "Custom Pet Parent Tee",
  shortName: "Pet Parent Tee",
  occasions: ["just-because"],
  shortDescription: "An oversized black tee with your pet's name stacked in gold and your pet's face over the middle.",
  description:
    "Your pet's name stacked four times in gold capitals, with your pet's face popping out over the middle in black and white. Type the name and a title (MOM, DAD, whatever you answer to) and the preview on this page shows how the lettering will look. After you order, send us your pet's photo on WhatsApp: we cut your pet out, finish it in black and white and send you a proof to approve before we print. Heat-pressed vinyl on an oversized black cotton tee, made to order. Personalised, so it can't be returned.",
  custom: true,
  livePreview: "pet-stack",
  personalise: [
    { id: "name", label: "YOUR PET'S NAME", cartLabel: "Pet name", placeholder: "e.g. Luca", maxLength: 12 },
    { id: "who", label: "WHO ARE YOU? (MOM, DAD, NANI…)", cartLabel: "Title", placeholder: "MOM", maxLength: 10, defaultValue: "MOM" },
  ],
  seoTitle: "Custom Pet Parent Tee: Your Pet's Name and Face",
  seoDescription: "A custom oversized black tee with your pet's name stacked in gold and your pet's face over the middle. Made to order in Bengaluru, {price}.",
};

// ---- objects --------------------------------------------------------------

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
  images: [
    "/small-runs/fabric-frame-a4.webp",
    "/small-runs/fabric-frame-a4-detail.webp",
    "/small-runs/fabric-frame-a4-console.webp",
    "/small-runs/fabric-frame-a4-hallway.webp",
  ],
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
  images: [
    "/small-runs/decal-elephants.webp",
    "/small-runs/decal-elephants-detail.webp",
    "/small-runs/decal-elephants-bedroom.webp",
    "/small-runs/decal-elephants-bedroom-2.webp",
  ],
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

const cherryMagnet: Product = {
  ...base,
  id: "s21",
  objectNumber: "S21",
  slug: "cherry-bomb-magnet",
  name: "Cherry Bomb Magnet",
  shortName: "Cherry Bomb",
  category: "Small Run",
  subcategory: "Magnet",
  tags: ["art"],
  occasions: ["just-because"],
  shortDescription: "Two glossy cherries and a CHERRY BOMB banner, in the style of a vintage fruit-crate label.",
  description:
    "Two plump red cherries bursting out of a yellow starburst, with CHERRY BOMB lettered across a cream banner and a little firecracker spark beside it. Bold reds, turquoise and yellow, in the style of an old fruit-crate label. A long, slim 15 × 5 cm fridge magnet printed on a rigid magnet sheet. Small run, so it may retire when the batch is done.",
  material: "Printed on a rigid magnet sheet",
  finish: "Colour print, square-cut",
  colour: "Red, turquoise and yellow",
  dimensions: "15 × 5 cm",
  price: 349,
  images: [
    "/small-runs/magnet-cherry-fridge-white.webp",
    "/small-runs/magnet-cherry-fridge-steel.webp",
  ],
  process: MAGNET_PROCESS,
  care: "Wipe with a dry cloth. Keep away from water.",
  installation: "Sticks to any steel or iron surface, like a fridge door.",
  seoTitle: "Cherry Bomb: Vintage-Label Fridge Magnet",
  seoDescription: "A slim 15 × 5 cm rigid fridge magnet: two cherries and a CHERRY BOMB banner in vintage fruit-label style. Small run, made to order in Bengaluru, {price}.",
};

const ovalFrameMagnet: Product = {
  ...base,
  id: "s22",
  objectNumber: "S22",
  slug: "oval-photo-frame-magnet",
  name: "Oval Check Photo Frame Magnet",
  shortName: "Oval Check Frame",
  category: "Small Run",
  subcategory: "Magnet",
  tags: ["frame", "table"],
  occasions: ["just-because"],
  shortDescription: "A rigid fridge magnet frame with a red, yellow and navy check border and an oval window for your photo.",
  description:
    "A fridge magnet frame in a bold red, yellow and navy check, with a navy-edged oval window in the middle. Slide a photo in behind the window and it sits there like a tiny portrait on your fridge. The magnet is a rigid sheet with rounded corners, so it stays flat on the door. The frame is sold empty: your photo isn't included.",
  material: "Printed frame on a rigid magnet sheet",
  finish: "Colour print, rounded corners",
  colour: "Red, yellow and navy check",
  dimensions: "8.8 × 12.6 cm",
  price: 349,
  images: [
    "/small-runs/magnet-oval-frame-fridge-blue.webp",
    "/small-runs/magnet-oval-frame-fridge-cream.webp",
    "/small-runs/magnet-oval-frame-flat.webp",
  ],
  process: MAGNET_PROCESS,
  care: "Wipe with a dry cloth. Keep away from water and from cards with magnetic strips.",
  installation: "Slide your photo in behind the oval window, then stick the magnet on any steel or iron surface, like a fridge door.",
  seoTitle: "Oval Check Photo Frame Magnet: Fridge Magnet Frame",
  seoDescription: "An 8.8 × 12.6 cm fridge magnet frame with a red, yellow and navy check border and an oval photo window. Made to order in Bengaluru, {price}.",
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

const lotusDecals: Product = {
  ...base,
  id: "s16",
  objectNumber: "S16",
  slug: "lotus-wall-stickers",
  name: "Lotus & Bud Wall Stickers",
  shortName: "Lotus Stickers",
  category: "Small Run",
  subcategory: "Wall decal",
  tags: ["wall"],
  occasions: ["housewarming", "just-because"],
  shortDescription: "Twelve blooming lotuses and twelve buds, as stickers that scatter into a block-print wall.",
  description:
    "A set of 24 stickers: 12 open lotus flowers and 12 closed buds, in dusty rose, coral and olive green. Stick them in a staggered grid, flower, bud, flower, and a bare wall turns into a block-print wallpaper without any paste or commitment. One set covers about 8 × 8 ft of wall at the spacing shown, or space them wider for a bigger wall.",
  material: "Printed sticker vinyl, cut to shape",
  finish: "Matte printed, cut to the outline",
  colour: "Dusty rose and coral flowers, olive leaves",
  dimensions: "Set of 24 (12 flowers + 12 buds) · covers about 8 × 8 ft",
  price: 1999,
  images: [
    "/small-runs/decal-lotus-wall.webp",
    "/small-runs/decal-lotus-pieces.webp",
    "/small-runs/decal-lotus-layout.webp",
  ],
  care: "Wipe gently with a dry cloth. Test on a discreet spot first: vinyl can lift paint when removed.",
  installation: "Stick onto clean, dry, smooth painted walls. To remove, warm with a hairdryer and peel slowly.",
  seoTitle: "Lotus & Bud Wall Stickers: Block-Print Style Decals",
  seoDescription: "A set of 24 lotus and bud wall stickers that cover about 8 × 8 ft in a block-print pattern. Small run, made to order in Bengaluru, {price}.",
};

const poppyDecals: Product = {
  ...base,
  id: "s17",
  objectNumber: "S17",
  slug: "poppy-wall-stickers",
  name: "Poppy Wall Stickers",
  shortName: "Poppy Stickers",
  category: "Small Run",
  subcategory: "Wall decal",
  tags: ["wall"],
  occasions: ["housewarming", "just-because"],
  shortDescription: "Red poppies on slim green stems, in three shapes, as stickers you scatter across a wall.",
  description:
    "A set of red poppy stickers in three shapes: 8 front-facing flowers, 6 side-on flowers and a handful of buds, each on its own slim green stem. Scatter them loosely, at different heights, and a plain wall turns into a wild meadow without paste or commitment. One set covers about 8 × 8 ft of wall at the spacing shown, or space them wider for a bigger wall.",
  material: "Printed sticker vinyl, cut to shape",
  finish: "Matte printed, cut to the outline",
  colour: "Red poppies, olive green stems",
  dimensions: "Flowers 12–14 cm, side flowers 10–12 cm, buds 8–10 cm tall · covers about 8 × 8 ft",
  price: 1999,
  images: [
    "/small-runs/decal-poppy-wall.webp",
    "/small-runs/decal-poppy-pieces.webp",
    "/small-runs/decal-poppy-layout.webp",
  ],
  care: "Wipe gently with a dry cloth. Test on a discreet spot first: vinyl can lift paint when removed.",
  installation: "Stick onto clean, dry, smooth painted walls. To remove, warm with a hairdryer and peel slowly.",
  seoTitle: "Poppy Wall Stickers: Red Floral Meadow Decals",
  seoDescription: "Red poppy wall stickers in three shapes that cover about 8 × 8 ft of wall in a loose meadow scatter. Small run, made to order in Bengaluru, {price}.",
};

const bowDecals: Product = {
  ...base,
  id: "s18",
  objectNumber: "S18",
  slug: "bow-wall-stickers",
  name: "Ribbon Bow Wall Stickers",
  shortName: "Bow Stickers",
  category: "Small Run",
  subcategory: "Wall decal",
  tags: ["wall"],
  occasions: ["housewarming", "just-because"],
  shortDescription: "Painted ribbon bows in polka dot, gingham, stripes, florals and plain colour, as stickers you scatter on a wall.",
  description:
    "A set of 24 painted-look ribbon bows in six styles: blue polka dot, pink gingham, peach stripe, green with daisies, red satin and a loose orange ribbon outline. Scatter them at different heights and angles for a playful, coquette-style wall in a nursery, a girl's room, a dressing corner or above a desk. No paste, no frame, no commitment.",
  material: "Printed sticker vinyl, cut to shape",
  finish: "Matte printed, cut to the outline",
  colour: "Blue, pink, peach, green, red and orange",
  dimensions: "Set of 24 bows in assorted styles",
  price: 1999,
  images: ["/small-runs/decal-bows-wall.webp"],
  care: "Wipe gently with a dry cloth. Test on a discreet spot first: vinyl can lift paint when removed.",
  installation: "Stick onto clean, dry, smooth painted walls. To remove, warm with a hairdryer and peel slowly.",
  seoTitle: "Ribbon Bow Wall Stickers: Coquette Bow Decals",
  seoDescription: "A set of painted-look ribbon bow wall stickers in polka dot, gingham, stripe and floral styles. Scatter them on any wall. Small run, made to order in Bengaluru, {price}.",
};

const rainbowDecals: Product = {
  ...base,
  id: "s23",
  objectNumber: "S23",
  slug: "rainbow-wall-stickers",
  name: "Watercolour Rainbow Wall Stickers",
  shortName: "Rainbow Stickers",
  category: "Small Run",
  subcategory: "Wall decal",
  tags: ["wall"],
  occasions: ["housewarming", "just-because"],
  shortDescription: "Eleven soft watercolour rainbows, each different, as stickers you scatter across a wall.",
  description:
    "A set of 11 painted-look rainbows in soft pinks, mustard, sage, dusty blue and lilac. No two are alike: one has daisies, one has leafy sprigs, one has hearts, one has gingham, two sit on little clouds, one has a scalloped edge and one has stars. Scatter them at different heights and a plain wall turns into a gentle, happy corner for a nursery, a kid's room or above a reading nook. No paste, no frame, no commitment.",
  material: "Printed sticker vinyl, cut to shape",
  finish: "Matte printed watercolour, cut to the outline",
  colour: "Soft pinks, mustard, sage, dusty blue and lilac",
  dimensions: "Set of 11 rainbows, each a different design",
  price: 399,
  images: ["/small-runs/decal-rainbows-wall.webp", "/small-runs/decal-rainbows-pieces.webp"],
  care: "Wipe gently with a dry cloth. Test on a discreet spot first: vinyl can lift paint when removed.",
  installation: "Stick onto clean, dry, smooth painted walls. To remove, warm with a hairdryer and peel slowly.",
  seoTitle: "Watercolour Rainbow Wall Stickers: Set of 11 Decals",
  seoDescription: "A set of 11 different watercolour rainbow wall stickers for a nursery or kid's room. Scatter them on any wall. Small run, made to order in Bengaluru, {price}.",
};

const scallopFlowerDecals: Product = {
  ...base,
  id: "s24",
  objectNumber: "S24",
  slug: "scalloped-flower-wall-stickers",
  name: "Scalloped Flower Wall Stickers",
  shortName: "Scalloped Flowers",
  category: "Small Run",
  subcategory: "Wall decal",
  tags: ["wall"],
  occasions: ["housewarming", "just-because"],
  shortDescription: "A set of 20 little painted flower panels with scalloped edges, as stickers you scatter across a wall.",
  description:
    "A set of 20 small cream panels with a wavy, scalloped outline, each holding a hand-painted-look flower bunch in the style of an Indian miniature: pink cosmos, daisies, tulips and black-eyed Susans, edged in lilac, yellow or pink. Scatter them in loose rows or at random and a plain wall gets a quiet, wallpaper-like pattern, in a bedroom, behind a bed or up a hallway. No paste, no frame, no commitment.",
  material: "Printed sticker vinyl, cut to shape",
  finish: "Matte printed colour, cut to the scalloped outline",
  colour: "Cream, with pink, yellow, orange and lilac flowers",
  dimensions: "Set of 20 scalloped flower panels, in four designs",
  price: 1999,
  images: ["/small-runs/decal-scallop-flowers-wall.webp", "/small-runs/decal-scallop-flowers-close.webp"],
  care: "Wipe gently with a dry cloth. Test on a discreet spot first: vinyl can lift paint when removed.",
  installation: "Stick onto clean, dry, smooth painted walls. To remove, warm with a hairdryer and peel slowly.",
  seoTitle: "Scalloped Flower Wall Stickers: Miniature-Style Decals",
  seoDescription: "A set of 20 scalloped flower wall stickers in four designs: cosmos, daisy, tulip and black-eyed Susan. Made to order in Bengaluru, {price}.",
};

const daisyDecals: Product = {
  ...base,
  id: "s30",
  objectNumber: "S30",
  slug: "apricot-daisy-wall-stickers",
  name: "Apricot Daisy Wall Stickers",
  shortName: "Apricot Daisies",
  category: "Small Run",
  subcategory: "Wall decal",
  tags: ["wall"],
  occasions: ["housewarming", "just-because"],
  shortDescription: "Twelve chunky cream daisies with apricot centres, as stickers you scatter or line up on a wall.",
  description:
    "A sheet of 12 flat, chunky daisies with cream petals and apricot-orange centres, each about 5 cm across and each drawn a little differently, like they were cut out by hand. Line them up in a neat grid for a wallpaper look, or scatter them for a meadow. They look best on a coloured wall: sage green, as in the photos, or blue, pink or deep brown. No paste, no frame, no commitment.",
  material: "Printed sticker vinyl, cut to shape",
  finish: "Matte printed colour, cut to the outline",
  colour: "Cream petals, apricot-orange centres",
  dimensions: "One sheet of 12 daisies (17.4 × 23.3 cm), each about 5 cm across",
  price: 399,
  images: [
    "/small-runs/decal-daisies-bedroom.webp",
    "/small-runs/decal-daisies-hallway.webp",
    "/small-runs/decal-daisies-sheet.png",
  ],
  care: "Wipe gently with a dry cloth. Test on a discreet spot first: vinyl can lift paint when removed.",
  installation: "Stick onto clean, dry, smooth painted walls. To remove, warm with a hairdryer and peel slowly.",
  seoTitle: "Apricot Daisy Wall Stickers: Set of 12 Daisy Decals",
  seoDescription: "A sheet of 12 cream-and-apricot daisy wall stickers, about 5 cm each. Grid them or scatter them. Made to order in Bengaluru, {price}.",
};

const cloudDecals: Product = {
  ...base,
  id: "s19",
  objectNumber: "S19",
  slug: "cloud-wall-stickers",
  name: "Watercolour Cloud Wall Stickers",
  shortName: "Cloud Stickers",
  category: "Small Run",
  subcategory: "Wall decal",
  tags: ["wall"],
  occasions: ["housewarming", "just-because"],
  shortDescription: "Soft watercolour clouds in three shapes, as stickers you scatter across a wall.",
  description:
    "A set of 24 painted-look clouds in soft blue and cream: 8 puffy clouds (10–12 cm wide), 8 drifting clouds with long trailing tails (12–14 cm wide) and 8 curled clouds (10–12 cm wide). Scatter them at different heights and a plain wall turns into a quiet sky, in a nursery, a bedroom or above a reading corner. No paste, no frame, no commitment.",
  material: "Printed sticker vinyl, cut to shape",
  finish: "Matte printed watercolour, cut to the outline",
  colour: "Soft blue and cream",
  dimensions: "Set of 24 (8 puffy + 8 drifting + 8 curled) · each 10–14 cm wide",
  price: 1999,
  images: ["/small-runs/decal-clouds-wall.webp", "/small-runs/decal-clouds-pieces.webp"],
  care: "Wipe gently with a dry cloth. Test on a discreet spot first: vinyl can lift paint when removed.",
  installation: "Stick onto clean, dry, smooth painted walls. To remove, warm with a hairdryer and peel slowly.",
  seoTitle: "Watercolour Cloud Wall Stickers: Soft Blue Sky Decals",
  seoDescription: "A set of 24 watercolour cloud wall stickers in three shapes, 10–14 cm wide. Scatter them on any wall. Small run, made to order in Bengaluru, {price}.",
};

const POSTER_PROCESS: ProcessStep[] = [
  { step: "01", label: "DESIGN", note: "block-print florals and the quote, laid out" },
  { step: "02", label: "PRINT", note: "colour-printed on A4 paper" },
  { step: "03", label: "TRIM", note: "cut clean to size" },
  { step: "04", label: "FRAME", note: "fitted in a thin wood frame, if you choose one" },
  { step: "05", label: "PACK", note: "flat and protected" },
];

const outrageousPoster: Product = {
  ...base,
  id: "s20",
  objectNumber: "S20",
  slug: "outrageous-quote-poster",
  name: "Darling, You Can Be Outrageous Quote Print",
  shortName: "Outrageous Print",
  category: "Small Run",
  subcategory: "Quote print",
  tags: ["wall", "frame", "art"],
  occasions: ["just-because", "housewarming"],
  shortDescription: "A pink block-print floral A4 poster that says: you can be whatever you want, as long as you're outrageous.",
  description:
    "A pink Indian block-print floral pattern around a cream label that reads: DARLING, YOU CAN BE WHATEVER YOU WANT TO BE AS LONG AS YOU'RE OUTRAGEOUS. Choose the print on its own to frame or stick up yourself, or have it fitted in a thin wood frame, ready to hang. A4 size, for a bedroom, a kid's room, a dressing corner or above a desk.",
  material: "Colour print on A4 paper, optional thin wood frame",
  finish: "Printed, with a thin natural-wood frame if chosen",
  colour: "Pink, cream and deep green",
  dimensions: "A4 (21 × 29.7 cm)",
  price: 599,
  images: [
    "/small-runs/poster-outrageous-bedroom.webp",
    "/small-runs/poster-outrageous-living.webp",
    "/small-runs/poster-outrageous-art.webp",
  ],
  variantLegend: "CHOOSE YOUR VERSION",
  variants: [
    { id: "print", label: "PRINT ONLY", note: "A4 print, unframed", price: 599, image: "/small-runs/poster-outrageous-art.webp" },
    { id: "framed", label: "PRINT + THIN FRAME", note: "A4 print in a thin wood frame", price: 899, image: "/small-runs/poster-outrageous-living.webp" },
  ],
  process: POSTER_PROCESS,
  care: "Keep out of direct sunlight and away from damp so the colours don't fade. Dust the frame with a dry cloth.",
  installation: "Frame it, tape it or pin it up. A framed one hangs from a single nail or screw, or leans on a shelf.",
  seoTitle: "Darling, You Can Be Outrageous: Pink Floral Quote Print",
  seoDescription: "A pink block-print floral A4 quote print: you can be whatever you want, as long as you're outrageous. Print only or with a thin frame. Small run, made to order in Bengaluru, {price}.",
};

/** order = order on /small-runs; the Only Fans tee goes last on purpose */
const chilliJarPrint: Product = {
  ...base,
  id: "s25",
  objectNumber: "S25",
  slug: "chilli-jar-print",
  name: "Chilli Jar Print",
  shortName: "Chilli Jar",
  category: "Small Run",
  subcategory: "Art print",
  tags: ["wall", "frame", "art"],
  occasions: ["just-because", "housewarming"],
  shortDescription: "A jar of dried red chillies, printed in two colours, red and blue, on cream paper.",
  description:
    "A glass jar packed with dried red chillies, their stalks curling out of the top, with a blank paper label stuck across the front. Printed in two colours, hot red and cobalt blue, on warm cream paper, with a grainy, layered look like an old two-colour print. Choose the print on its own to frame yourself, or have it fitted in a thin white frame, ready to hang. For a kitchen, a dining nook or any wall that could use some heat.",
  material: "Two-colour print on A4 paper, optional thin white frame",
  finish: "Printed on cream paper, with a thin white frame if chosen",
  colour: "Red, cobalt blue and cream",
  dimensions: "A4 (21 × 29.7 cm)",
  price: 599,
  images: [
    "/small-runs/poster-chilli-kitchen.webp",
    "/small-runs/poster-chilli-dining.webp",
    "/small-runs/poster-chilli-art.webp",
  ],
  variantLegend: "CHOOSE YOUR VERSION",
  variants: [
    { id: "print", label: "PRINT ONLY", note: "A4 print, unframed", price: 599, image: "/small-runs/poster-chilli-art.webp" },
    { id: "framed", label: "PRINT + THIN FRAME", note: "A4 print in a thin white frame", price: 899, image: "/small-runs/poster-chilli-dining.webp" },
  ],
  process: POSTER_PROCESS,
  care: "Keep out of direct sunlight and away from damp so the colours don't fade. Dust the frame with a dry cloth.",
  installation: "Frame it, tape it or pin it up. A framed one hangs from a single nail or screw, or leans on a shelf.",
  seoTitle: "Chilli Jar Print: Red and Blue Kitchen Art Print",
  seoDescription: "A two-colour A4 print of a jar of dried red chillies, red and blue on cream. Print only or framed. Made to order in Bengaluru, {price}.",
};

const catNapPrint: Product = {
  ...base,
  id: "s26",
  objectNumber: "S26",
  slug: "cat-nap-print",
  name: "Cat Nap Print",
  shortName: "Cat Nap",
  category: "Small Run",
  subcategory: "Art print",
  tags: ["wall", "frame", "art"],
  occasions: ["just-because", "housewarming"],
  shortDescription: "A blue and white cat fast asleep on a cane chair, printed in two colours, orange and blue.",
  description:
    "A blue and white cat sprawled across a cane-backed chair, chin on the armrest, one paw dangling, completely asleep. Printed in two colours, burnt orange and deep blue, on warm cream paper, with a grainy, layered look like an old two-colour print. Choose the print on its own to frame yourself, or have it fitted in a thin white frame, ready to hang. For a bedroom, a living room, a reading corner or anyone who loves a cat.",
  material: "Two-colour print on A4 paper, optional thin white frame",
  finish: "Printed on cream paper, with a thin white frame if chosen",
  colour: "Burnt orange, deep blue and cream",
  dimensions: "A4 (21 × 29.7 cm)",
  price: 599,
  images: [
    "/small-runs/poster-catnap-window.webp",
    "/small-runs/poster-catnap-dresser.webp",
    "/small-runs/poster-catnap-art.webp",
  ],
  variantLegend: "CHOOSE YOUR VERSION",
  variants: [
    { id: "print", label: "PRINT ONLY", note: "A4 print, unframed", price: 599, image: "/small-runs/poster-catnap-art.webp" },
    { id: "framed", label: "PRINT + THIN FRAME", note: "A4 print in a thin white frame", price: 899, image: "/small-runs/poster-catnap-dresser.webp" },
  ],
  process: POSTER_PROCESS,
  care: "Keep out of direct sunlight and away from damp so the colours don't fade. Dust the frame with a dry cloth.",
  installation: "Frame it, tape it or pin it up. A framed one hangs from a single nail or screw, or leans on a shelf.",
  seoTitle: "Cat Nap Print: Sleeping Cat Art Print in Orange and Blue",
  seoDescription: "A two-colour A4 print of a cat asleep on a cane chair, orange and blue on cream. Print only or framed. Made to order in Bengaluru, {price}.",
};

const twoChilliesPrint: Product = {
  ...base,
  id: "s27",
  objectNumber: "S27",
  slug: "two-chillies-print",
  name: "Two Chillies Print",
  shortName: "Two Chillies",
  category: "Small Run",
  subcategory: "Art print",
  tags: ["wall", "frame", "art"],
  occasions: ["just-because", "housewarming"],
  shortDescription: "Two wrinkled dried red chillies and a scatter of seeds, printed in red and plum on cream paper.",
  description:
    "Two dried red chillies curling around each other, their skins creased and glossy, with a few seeds spilling between them. Printed in hot red and deep plum on warm cream paper, with a grainy, layered look like an old two-colour print. Choose the print on its own to frame yourself, or have it fitted in a thin white frame, ready to hang or lean on a shelf. For a kitchen, a dining nook or anyone who likes it hot.",
  material: "Two-colour print on A4 paper, optional thin white frame",
  finish: "Printed on cream paper, with a thin white frame if chosen",
  colour: "Red, plum and cream",
  dimensions: "A4 (21 × 29.7 cm)",
  price: 599,
  images: [
    "/small-runs/poster-twochillies-kitchen.webp",
    "/small-runs/poster-twochillies-dresser.webp",
    "/small-runs/poster-twochillies-art.webp",
  ],
  variantLegend: "CHOOSE YOUR VERSION",
  variants: [
    { id: "print", label: "PRINT ONLY", note: "A4 print, unframed", price: 599, image: "/small-runs/poster-twochillies-art.webp" },
    { id: "framed", label: "PRINT + THIN FRAME", note: "A4 print in a thin white frame", price: 899, image: "/small-runs/poster-twochillies-dresser.webp" },
  ],
  process: POSTER_PROCESS,
  care: "Keep out of direct sunlight and away from damp so the colours don't fade. Dust the frame with a dry cloth.",
  installation: "Frame it, tape it or pin it up. A framed one hangs from a single nail or screw, or leans on a shelf.",
  seoTitle: "Two Chillies Print: Red Dried Chilli Kitchen Art Print",
  seoDescription: "A two-colour A4 print of two dried red chillies and scattered seeds, red and plum on cream. Print only or framed. Made in Bengaluru, {price}.",
};

const peppercornsPrint: Product = {
  ...base,
  id: "s28",
  objectNumber: "S28",
  slug: "spilled-peppercorns-print",
  name: "Spilled Peppercorns Print",
  shortName: "Spilled Peppercorns",
  category: "Small Run",
  subcategory: "Art print",
  tags: ["wall", "frame", "art"],
  occasions: ["just-because", "housewarming"],
  shortDescription: "A heap of peppercorns with more bouncing across the page, printed in red and plum on cream paper.",
  description:
    "A pile of peppercorns in the bottom corner, and dozens more bouncing out of it across the page, with little speed lines trailing behind them. Printed in hot red and deep plum on warm cream paper, with a grainy, layered look like an old two-colour print. Choose the print on its own to frame yourself, or have it fitted in a thin white frame, ready to hang or lean on a shelf. For a kitchen, a dining nook or anyone who likes a little spice.",
  material: "Two-colour print on A4 paper, optional thin white frame",
  finish: "Printed on cream paper, with a thin white frame if chosen",
  colour: "Red, plum and cream",
  dimensions: "A4 (21 × 29.7 cm)",
  price: 599,
  images: [
    "/small-runs/poster-peppercorns-kitchen.webp",
    "/small-runs/poster-peppercorns-sideboard.webp",
    "/small-runs/poster-peppercorns-art.webp",
  ],
  variantLegend: "CHOOSE YOUR VERSION",
  variants: [
    { id: "print", label: "PRINT ONLY", note: "A4 print, unframed", price: 599, image: "/small-runs/poster-peppercorns-art.webp" },
    { id: "framed", label: "PRINT + THIN FRAME", note: "A4 print in a thin white frame", price: 899, image: "/small-runs/poster-peppercorns-sideboard.webp" },
  ],
  process: POSTER_PROCESS,
  care: "Keep out of direct sunlight and away from damp so the colours don't fade. Dust the frame with a dry cloth.",
  installation: "Frame it, tape it or pin it up. A framed one hangs from a single nail or screw, or leans on a shelf.",
  seoTitle: "Spilled Peppercorns Print: Red and Plum Kitchen Art Print",
  seoDescription: "A two-colour A4 print of peppercorns spilling across the page, red and plum on cream. Print only or framed. Made in Bengaluru, {price}.",
};

export const smallRuns: Product[] = [
  framedFabric,
  elephantDecals,
  carnationDecals,
  lotusDecals,
  poppyDecals,
  bowDecals,
  cloudDecals,
  rainbowDecals,
  scallopFlowerDecals,
  daisyDecals,
  outrageousPoster,
  chilliJarPrint,
  catNapPrint,
  twoChilliesPrint,
  peppercornsPrint,
  photoFrameMagnet,
  swanMagnet,
  insuranceMagnet,
  roadTripMagnet,
  cherryMagnet,
  ovalFrameMagnet,
  uninstallAstrology,
  onlyFans,
  achaariGend,
  petParent,
];
