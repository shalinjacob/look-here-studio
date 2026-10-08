import type { Product } from "@/lib/types";

// ---------------------------------------------------------------------------
// OFF THE WALL: printed T-shirts. The studio's art, made to wear.
// Generated from ~/Downloads/look-here-studio-tees (designs.py placement plan +
// mock-ups); edit copy here freely. Every tee: 100% cotton, 190–240 GSM,
// regular (₹1,499) or oversized (₹1,799), XS–XXL, colour per design.
// Mock-ups are visualisations (labelled on site) until real photos replace them.
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
    why: "Text-led art wants to be read face-on, so it goes big on the front. The crescent moon is lifted onto the sleeve as a quiet wink for people who notice.",
    placement: "Full front, sleeve",
    colours: [{"id": "black", "label": "Black", "image": "/wearables/tee-stay-weird-black-front.webp"}],
    images: ["/wearables/tee-stay-weird-black-front.webp", "/wearables/tee-stay-weird-art.webp"],
  }),
  tee({
    n: 2,
    slug: "cat-butterfly",
    name: "Butterfly Kiss",
    copy: "A blue butterfly lands on a cat's nose in warm, golden light. A small, soft moment, printed like a framed photo on the back.",
    why: "A quiet, close-up moment works best as a framed panel on the back, found rather than announced. The butterfly also lands on the sleeve, as if it flew off the print.",
    placement: "Sleeve, full back",
    colours: [{"id": "cream", "label": "Off-white", "image": "/wearables/tee-cat-butterfly-cream-back.webp"}, {"id": "white", "label": "White", "image": "/wearables/tee-cat-butterfly-white-back.webp"}],
    images: ["/wearables/tee-cat-butterfly-cream-back.webp", "/wearables/tee-cat-butterfly-cream-front.webp", "/wearables/tee-cat-butterfly-white-back.webp", "/wearables/tee-cat-butterfly-art.webp"],
  }),
  tee({
    n: 3,
    slug: "crane",
    name: "Night Crane",
    copy: "A red-crowned crane sweeps across a night-time city skyline, wings wide over the water. Calm, graphic and very good from behind.",
    why: "The crane's wingspan fills the shoulders on the back, flying away as you walk. A small crane on the left chest carries the story to the front.",
    placement: "Left chest, full back",
    colours: [{"id": "black", "label": "Black", "image": "/wearables/tee-crane-black-back.webp"}, {"id": "green", "label": "Dark green", "image": "/wearables/tee-crane-green-back.webp"}],
    images: ["/wearables/tee-crane-black-back.webp", "/wearables/tee-crane-black-front.webp", "/wearables/tee-crane-green-back.webp", "/wearables/tee-crane-art.webp"],
  }),
  tee({
    n: 4,
    slug: "horse",
    name: "Halftone Horse",
    copy: "A black horse in halftone, set against stripes of blue, yellow and pink, like a screen print pulled off an old poster.",
    why: "A halftone, screen-print style portrait is a classic front graphic: square, centred and big, like a vintage poster tee.",
    placement: "Full front",
    colours: [{"id": "cream", "label": "Off-white", "image": "/wearables/tee-horse-cream-front.webp"}, {"id": "white", "label": "White", "image": "/wearables/tee-horse-white-front.webp"}],
    images: ["/wearables/tee-horse-cream-front.webp", "/wearables/tee-horse-white-front.webp", "/wearables/tee-horse-art.webp"],
  }),
  tee({
    n: 5,
    slug: "astronaut",
    name: "Space Bloom",
    copy: "An astronaut stands in a paper collage of flowers, leaves and old newsprint. Space, but make it a scrapbook.",
    why: "The collage is dense, so it needs the back's big flat canvas to be read. One blue flower is pulled out as a small left-chest teaser.",
    placement: "Left chest, full back",
    colours: [{"id": "white", "label": "White", "image": "/wearables/tee-astronaut-white-back.webp"}, {"id": "cream", "label": "Off-white", "image": "/wearables/tee-astronaut-cream-back.webp"}],
    images: ["/wearables/tee-astronaut-white-back.webp", "/wearables/tee-astronaut-white-front.webp", "/wearables/tee-astronaut-cream-back.webp", "/wearables/tee-astronaut-art.webp"],
  }),
  tee({
    n: 6,
    slug: "woman-cheetah",
    name: "Walking The Cat",
    copy: "A woman in a corset and baggy jeans walks her cheetah like it's a Tuesday. Painted in a glossy, retro illustration style.",
    why: "On a cream tee the art's cream background disappears, so she walks straight across the shirt, set off-centre as if she's mid-stride. The cheetah's head peeks out at the back of the neck.",
    placement: "Full front, back neck",
    colours: [{"id": "cream", "label": "Off-white", "image": "/wearables/tee-woman-cheetah-cream-front.webp"}],
    images: ["/wearables/tee-woman-cheetah-cream-front.webp", "/wearables/tee-woman-cheetah-cream-back.webp", "/wearables/tee-woman-cheetah-art.webp"],
  }),
  tee({
    n: 7,
    slug: "margarita",
    name: "Margarita Hour",
    copy: "A lime margarita in loose, splashy watercolour, salt rim and all. Wear it to the party, or as the party.",
    why: "A playful pocket-sized drink on the left chest for daytime, then a bigger pour across the upper back for when the party starts.",
    placement: "Left chest, full back",
    colours: [{"id": "white", "label": "White", "image": "/wearables/tee-margarita-white-back.webp"}, {"id": "cream", "label": "Off-white", "image": "/wearables/tee-margarita-cream-back.webp"}],
    images: ["/wearables/tee-margarita-white-back.webp", "/wearables/tee-margarita-white-front.webp", "/wearables/tee-margarita-cream-back.webp", "/wearables/tee-margarita-art.webp"],
  }),
  tee({
    n: 8,
    slug: "carnation",
    name: "Buttonhole",
    copy: "A single white carnation glowing against a deep brown dark. Quiet, a little old-world, and very elegant.",
    why: "A single carnation is the classic buttonhole flower, so it sits exactly there on the left chest. A tall version fills the spine on the back, like a pressed flower.",
    placement: "Left chest, full back",
    colours: [{"id": "black", "label": "Black", "image": "/wearables/tee-carnation-black-back.webp"}],
    images: ["/wearables/tee-carnation-black-back.webp", "/wearables/tee-carnation-black-front.webp", "/wearables/tee-carnation-art.webp"],
  }),
  tee({
    n: 9,
    slug: "skull-roses",
    name: "Memento Mori",
    copy: "A skull crowned by a coiled snake, with red roses in an ivy-covered stone arch. A memento mori for people who like a bit of drama.",
    why: "Gothic band-tee logic: a small skull crest on the chest, and the full skull, roses and serpent shrine taking the back.",
    placement: "Left chest, full back",
    colours: [{"id": "black", "label": "Black", "image": "/wearables/tee-skull-roses-black-back.webp"}],
    images: ["/wearables/tee-skull-roses-black-back.webp", "/wearables/tee-skull-roses-black-front.webp", "/wearables/tee-skull-roses-art.webp"],
  }),
  tee({
    n: 10,
    slug: "winged-skeleton",
    name: "Shoulder Blades",
    copy: "A skeleton with a halo and enormous feathered wings, over a page of old handwriting. The wings land on your shoulder blades.",
    why: "The wings sit on your actual shoulder blades, which is the whole joke. The back gets the full spread and the front stays clean.",
    placement: "Full back",
    colours: [{"id": "white", "label": "White", "image": "/wearables/tee-winged-skeleton-white-back.webp"}],
    images: ["/wearables/tee-winged-skeleton-white-back.webp", "/wearables/tee-winged-skeleton-art.webp"],
  }),
  tee({
    n: 11,
    slug: "reaper-stay-positive",
    name: "Stay Positive",
    copy: "The Grim Reaper holds up a scroll that says 'stay positive'. Dark humour, delivered with excellent penmanship.",
    why: "The joke lands twice. A cheerful 'stay positive' on the chest, then the reveal of who's saying it on the back.",
    placement: "Left chest, full back",
    colours: [{"id": "white", "label": "White", "image": "/wearables/tee-reaper-stay-positive-white-back.webp"}, {"id": "cream", "label": "Off-white", "image": "/wearables/tee-reaper-stay-positive-cream-back.webp"}],
    images: ["/wearables/tee-reaper-stay-positive-white-back.webp", "/wearables/tee-reaper-stay-positive-white-front.webp", "/wearables/tee-reaper-stay-positive-cream-back.webp", "/wearables/tee-reaper-stay-positive-art.webp"],
  }),
  tee({
    n: 12,
    slug: "nuns-umbrella",
    name: "Sisters",
    copy: "Two nuns share an umbrella and a cigarette on a misty cobbled street, in black and white. A film still that tells its own story.",
    why: "The tall, cinematic black-and-white photo reads like a film still, so it runs down the back as a vertical panel. The umbrella alone is the teaser on the front.",
    placement: "Left chest, full back",
    colours: [{"id": "white", "label": "White", "image": "/wearables/tee-nuns-umbrella-white-back.webp"}],
    images: ["/wearables/tee-nuns-umbrella-white-back.webp", "/wearables/tee-nuns-umbrella-white-front.webp", "/wearables/tee-nuns-umbrella-art.webp"],
  }),
  tee({
    n: 13,
    slug: "snake-knot",
    name: "Snake Knot",
    copy: "Black snakes tied in a knot on a bright red ground. Bold, graphic and a little bit dangerous.",
    why: "The knot is an emblem, so it sits between the shoulders on the back as a bold red block. A small version near the front hem gives the front an unexpected, off-centre detail.",
    placement: "Front hem, full back",
    colours: [{"id": "black", "label": "Black", "image": "/wearables/tee-snake-knot-black-back.webp"}],
    images: ["/wearables/tee-snake-knot-black-back.webp", "/wearables/tee-snake-knot-black-front.webp", "/wearables/tee-snake-knot-art.webp"],
  }),
  tee({
    n: 14,
    slug: "no-rules",
    name: "No Rules",
    copy: "“This house has NO RULES about what belongs together”, the line from our Slim LED Quote Frame, set big in black and rust.",
    why: "The house rule, worn: big and centred on the front, black type with the rust lines, exactly like the frame.",
    placement: "Full front",
    colours: [{"id": "cream", "label": "Off-white", "image": "/wearables/tee-no-rules-cream-front.webp"}, {"id": "white", "label": "White", "image": "/wearables/tee-no-rules-white-front.webp"}],
    images: ["/wearables/tee-no-rules-cream-front.webp", "/wearables/tee-no-rules-white-front.webp", "/wearables/tee-no-rules-art.webp"],
  }),
  tee({
    n: 15,
    slug: "more-colour",
    name: "More Colour",
    copy: "“We could all use MORE COLOUR than we think we need”, the yellow-and-blue Quote Frame line, now in wearable form.",
    why: "The yellow is the point, so the full yellow-and-blue block goes on the back where it has room to shout. The front just whispers MORE COLOUR in blue on the chest.",
    placement: "Left chest, full back",
    colours: [{"id": "white", "label": "White", "image": "/wearables/tee-more-colour-white-back.webp"}, {"id": "cream", "label": "Off-white", "image": "/wearables/tee-more-colour-cream-back.webp"}],
    images: ["/wearables/tee-more-colour-white-back.webp", "/wearables/tee-more-colour-white-front.webp", "/wearables/tee-more-colour-cream-back.webp", "/wearables/tee-more-colour-art.webp"],
  }),
  tee({
    n: 16,
    slug: "less-sense",
    name: "Less Sense",
    copy: "“Sometimes you need LESS SENSE and a little more fun”, in blush on a dark-green tee. Good advice, worn loudly.",
    why: "The frame's green-and-blush pairing, flipped: blush type on a dark-green tee, big on the front for maximum fun, minimum sense.",
    placement: "Full front",
    colours: [{"id": "green", "label": "Dark green", "image": "/wearables/tee-less-sense-green-front.webp"}, {"id": "black", "label": "Black", "image": "/wearables/tee-less-sense-black-front.webp"}],
    images: ["/wearables/tee-less-sense-green-front.webp", "/wearables/tee-less-sense-black-front.webp", "/wearables/tee-less-sense-art.webp"],
  }),
  tee({
    n: 17,
    slug: "little-joys",
    name: "Little Joys",
    copy: "“Life needs LITTLE JOYS”, printed small on purpose, with “in places you don't expect” hidden on the sleeve.",
    why: "The quote is about small, unexpected delights, so the print is deliberately small on the chest, and 'in places you don't expect' is hidden on the sleeve.",
    placement: "Left chest, sleeve",
    colours: [{"id": "white", "label": "White", "image": "/wearables/tee-little-joys-white-front.webp"}, {"id": "cream", "label": "Off-white", "image": "/wearables/tee-little-joys-cream-front.webp"}],
    images: ["/wearables/tee-little-joys-white-front.webp", "/wearables/tee-little-joys-cream-front.webp", "/wearables/tee-little-joys-art.webp"],
  }),
  tee({
    n: 18,
    slug: "more-room",
    name: "More Room",
    copy: "“There's always MORE ROOM for one more bad idea”, big across the back in red. Made for studios, offices and group chats.",
    why: "Made for studios and meeting rooms: the full line runs big across the back, so the bad ideas follow you around.",
    placement: "Full back",
    colours: [{"id": "white", "label": "White", "image": "/wearables/tee-more-room-white-back.webp"}, {"id": "cream", "label": "Off-white", "image": "/wearables/tee-more-room-cream-back.webp"}],
    images: ["/wearables/tee-more-room-white-back.webp", "/wearables/tee-more-room-cream-back.webp", "/wearables/tee-more-room-art.webp"],
  }),
];
