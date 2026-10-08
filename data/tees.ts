import type { Product } from "@/lib/types";

// ---------------------------------------------------------------------------
// OFF THE WALL: printed T-shirts. The studio's art, made to wear.
// Generated from ~/Downloads/look-here-studio-tees (designs.py placement plan +
// mock-ups); edit copy here freely. Every tee: 100% cotton, 190–240 GSM,
// regular (₹1,499) or oversized (₹1,799), XS–XXL, printed on the front.
// Photographed mock-ups (owner-supplied, *-photo/-detail) lead where they exist;
// the rest are studio renders (*-front/-back) until photos replace them.
// ---------------------------------------------------------------------------

export const TEE_PRICE = 1499;
export const OVERSIZED_EXTRA = 300;
export const TEE_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

interface TeeSpec {
  n: number;
  slug: string;
  name: string;
  copy: string;
  why: string;
  placement: string;
  colours: { id: string; label: string; image: string }[];
  images: string[];
}

const TEE_PROCESS = [
  { step: "01", label: "ART", note: "drawn, cleaned, sized for print" },
  { step: "02", label: "PLACE", note: "where it lands on the body" },
  { step: "03", label: "PRINT", note: "onto 100% cotton" },
  { step: "04", label: "CURE", note: "so it survives the wash" },
  { step: "05", label: "PACK", note: "folded, not crumpled" },
];

function tee(t: TeeSpec): Product {
  const slug = `tee-${t.slug}`;
  return {
    id: `t${String(t.n).padStart(2, "0")}`,
    objectNumber: `T${String(t.n).padStart(2, "0")}`,
    slug,
    name: `${t.name} Tee`,
    shortName: t.name,
    category: "Off The Wall",
    subcategory: "T-shirt",
    tags: ["tee"],
    shortDescription: t.copy.split(". ")[0].replace(/\.$/, "") + ".",
    description: `${t.copy} Where it's printed, and why: ${t.why}`,
    material: "100% cotton, 190–240 GSM",
    finish: `Printed: ${t.placement.toLowerCase()}`,
    colour: t.colours.map((c) => c.label).join(" or "),
    dimensions: "XS–XXL · regular or oversized fit (see size chart)",
    price: TEE_PRICE,
    currency: "INR",
    status: "available",
    images: t.images,
    lifestyleImages: [],
    imageFit: "cover",
    sizeChart: "tee",
    options: [
      {
        id: "fit",
        legend: "CHOOSE YOUR FIT",
        choices: [
          { id: "regular", label: "Regular", priceDelta: 0 },
          { id: "oversized", label: "Oversized", priceDelta: OVERSIZED_EXTRA },
        ],
      },
      {
        id: "size",
        legend: "CHOOSE YOUR SIZE",
        required: true,
        choices: TEE_SIZES.map((s) => ({ id: s.toLowerCase(), label: s })),
      },
      ...(t.colours.length > 1
        ? [{ id: "colour", legend: "CHOOSE YOUR COLOUR", choices: t.colours.map((c) => ({ id: c.id, label: c.label, image: c.image })) }]
        : [{ id: "colour", legend: "COLOUR", choices: t.colours.map((c) => ({ id: c.id, label: c.label, image: c.image })) }]),
    ],
    leadTime: "Made to order · dispatched within 10 working days",
    care: "Wash inside out in cold water. Don't bleach, don't tumble dry, and don't iron directly on the print. Dry in the shade.",
    installation: `${t.placement}. ${t.why}`,
    featured: false,
    process: TEE_PROCESS,
    seoTitle: `${t.name} T-Shirt: Printed Art Tee, Regular or Oversized`,
    seoDescription: `${t.copy.split(". ")[0]}. 100% cotton art tee, regular or oversized, XS–XXL. Made to order in Bengaluru, from {price}.`,
  };
}

export const tees: Product[] = [
  tee({
    n: 1,
    slug: "stay-weird",
    name: "Stay Weird",
    copy: "A grey cat, a red toadstool and a crescent moon, under a big 'Stay Weird' in storybook lettering. For people who'd rather be interesting than normal.",
    why: "Text-led art wants to be read face-on, so it goes big on the front of a black tee: the lettering across the chest, the cat and its toadstool right under it.",
    placement: "Full front",
    colours: [{"id": "black", "label": "Black", "image": "/wearables/tee-stay-weird-photo.webp"}],
    images: ["/wearables/tee-stay-weird-photo.webp", "/wearables/tee-stay-weird-detail.webp", "/wearables/tee-stay-weird-art.webp"],
  }),
  tee({
    n: 2,
    slug: "crane",
    name: "Night Crane",
    copy: "A red-crowned crane sweeps across a night-time city skyline, wings wide over the water. Calm, graphic and big across the chest.",
    why: "The crane's wingspan needs width, so it flies across the whole front, wings breaking out over the skyline. The back stays plain and lets the bird do the talking.",
    placement: "Full front",
    colours: [{"id": "black", "label": "Black", "image": "/wearables/tee-crane-photo.webp"}],
    images: ["/wearables/tee-crane-photo.webp", "/wearables/tee-crane-detail.webp", "/wearables/tee-crane-art.webp"],
  }),
  tee({
    n: 3,
    slug: "horse",
    name: "Halftone Horse",
    copy: "A black horse in halftone, set against stripes of blue, yellow and pink, like a screen print pulled off an old poster.",
    why: "A halftone, screen-print style portrait is a classic front graphic: square, centred and big, like a vintage poster tee.",
    placement: "Full front",
    colours: [{"id": "cream", "label": "Off-white", "image": "/wearables/tee-horse-photo.webp"}],
    images: ["/wearables/tee-horse-photo.webp", "/wearables/tee-horse-detail.webp", "/wearables/tee-horse-art.webp"],
  }),
  tee({
    n: 4,
    slug: "woman-cheetah",
    name: "Walking The Cat",
    copy: "A woman in a corset and baggy jeans walks her cheetah like it's a Tuesday. Painted in a glossy, retro illustration style.",
    why: "On an off-white tee the art's cream background disappears, so she walks straight across the front, cheetah on a lead, as if she's mid-stride.",
    placement: "Full front",
    colours: [{"id": "cream", "label": "Off-white", "image": "/wearables/tee-woman-cheetah-photo.webp"}],
    images: ["/wearables/tee-woman-cheetah-photo.webp", "/wearables/tee-woman-cheetah-detail.webp", "/wearables/tee-woman-cheetah-art.webp"],
  }),
  tee({
    n: 5,
    slug: "skull-roses",
    name: "Memento Mori",
    copy: "A skull crowned by a coiled snake, with red roses in an ivy-covered stone arch. A memento mori for people who like a bit of drama.",
    why: "Gothic band-tee logic: the full skull, roses and stone arch go big on the front of a black tee, like the cover of a record you'd play loud.",
    placement: "Full front",
    colours: [{"id": "black", "label": "Black", "image": "/wearables/tee-skull-roses-photo.webp"}],
    images: ["/wearables/tee-skull-roses-photo.webp", "/wearables/tee-skull-roses-detail.webp", "/wearables/tee-skull-roses-art.webp"],
  }),
  tee({
    n: 6,
    slug: "reaper-stay-positive",
    name: "Stay Positive",
    copy: "The Grim Reaper holds up a scroll that says 'stay positive'. Dark humour, delivered with excellent penmanship.",
    why: "Dark humour works best face-on, so the Reaper meets people head-on with his cheerful little sign, big on the front of a black tee.",
    placement: "Full front",
    colours: [{"id": "black", "label": "Black", "image": "/wearables/tee-reaper-stay-positive-photo.webp"}],
    images: ["/wearables/tee-reaper-stay-positive-photo.webp", "/wearables/tee-reaper-stay-positive-detail.webp", "/wearables/tee-reaper-stay-positive-art.webp"],
  }),
  tee({
    n: 7,
    slug: "nuns-umbrella",
    name: "Sisters",
    copy: "Two nuns share an umbrella and a cigarette on a misty cobbled street, in black and white. A film still that tells its own story.",
    why: "The tall, cinematic black-and-white photo reads like a film still, so it runs down the front of a black tee, where the grey mist melts into the fabric.",
    placement: "Full front",
    colours: [{"id": "black", "label": "Black", "image": "/wearables/tee-nuns-umbrella-photo.webp"}],
    images: ["/wearables/tee-nuns-umbrella-photo.webp", "/wearables/tee-nuns-umbrella-detail.webp", "/wearables/tee-nuns-umbrella-art.webp"],
  }),
  tee({
    n: 8,
    slug: "dancing-skeletons",
    name: "Danse Macabre",
    copy: "Two skeletons dance ballet on a block of sunshine yellow: pointe shoes, perfect posture, no muscles required.",
    why: "The yellow block is a stage, so it goes big and centred on the front, where the dancers can perform to the whole room.",
    placement: "Full front",
    colours: [{"id": "cream", "label": "Off-white", "image": "/wearables/tee-dancing-skeletons-photo.webp"}],
    images: ["/wearables/tee-dancing-skeletons-photo.webp", "/wearables/tee-dancing-skeletons-detail.webp"],
  }),
  tee({
    n: 9,
    slug: "renaissance-cat",
    name: "Your Grace",
    copy: "A cat sits for an Old Master portrait in a lace ruff, gold drapery and round sunglasses. Very serious. Extremely cool.",
    why: "An oil portrait wants a frame, so it's printed as a tall gold panel on the front of a black tee, hung like a painting in a gallery.",
    placement: "Full front",
    colours: [{"id": "black", "label": "Black", "image": "/wearables/tee-renaissance-cat-photo.webp"}],
    images: ["/wearables/tee-renaissance-cat-photo.webp", "/wearables/tee-renaissance-cat-detail.webp"],
  }),
  tee({
    n: 10,
    slug: "good-boys",
    name: "Good Boys",
    copy: "A cocker spaniel and a golden retriever, sitting pretty in warm, vintage-print colour. For anyone who'd rather be at home with the dogs.",
    why: "No panel, no background: the dogs sit straight on the black tee, big across the front, so the warm fur glows against the dark.",
    placement: "Full front",
    colours: [{"id": "black", "label": "Black", "image": "/wearables/tee-good-boys-photo.webp"}],
    images: ["/wearables/tee-good-boys-photo.webp", "/wearables/tee-good-boys-detail.webp"],
  }),
];
