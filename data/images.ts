import { tees } from "./tees";

// ---------------------------------------------------------------------------
// Per-image metadata, keyed by public path: descriptive alt text, and
// `isRender` for renders/visualisations (shown with a "Visualisation" label and
// "(visualisation)" appended to the alt). Every product image should have an
// entry; altFor() falls back to the product name if one is missing.
// ---------------------------------------------------------------------------

export interface ImageMeta {
  alt: string;
  /** a render or visualisation, not a photograph of the made piece */
  isRender?: boolean;
}

export const IMAGES: Record<string, ImageMeta> = {
  "/objects/layer-clock.webp": { alt: "Layer Clock: round wall clock made of stacked wavy layers in a terracotta-to-orange gradient" },
  "/objects/layered-wall-clock.webp": { alt: "Layered Wall Clock: Memphis-style clock of overlapping orange, blue, green and yellow acrylic shapes with a yellow dial" },
  "/lifestyle/athome-layered-clock.webp": { alt: "Layered Wall Clock hanging above a desk with books and plants" },
  "/objects/acrylic-lamp-1.webp": { alt: "Acrylic Lamp: fluorescent orange acrylic table lamp with a mirror-tipped bulb arching over the top (view 1)" },
  "/objects/acrylic-lamp-2.webp": { alt: "Acrylic Lamp: fluorescent orange acrylic table lamp glowing on a desk (view 2)" },
  // AI-generated visualisations (owner-requested lifestyle scenes) — labelled on site
  "/lifestyle/clear-ledge-frames.webp": { alt: "Clear Ledge: three clear acrylic ledges stacked on a wall, holding framed prints, a vase, books and a small plant", isRender: true },
  "/lifestyle/clear-ledge-kitchen.webp": { alt: "Clear Ledge in a kitchen, holding glass spice jars, a brass bowl and a potted herb above the counter", isRender: true },
  "/lifestyle/clear-ledge-vinyl.webp": { alt: "Two Clear Ledges displaying vinyl record sleeves above a turntable", isRender: true },
  "/objects/square-frame-1.webp": { alt: "Square Frame: set of three brushed-silver square frames hung in a vertical row, small prints floating in wide mounts" },
  "/objects/square-frame-2.webp": { alt: "Square Frame: three brushed-silver frames above a sideboard, each with a small floating print" },
  "/objects/strip-frame-1.webp": { alt: "Strip Frame: tall brushed-steel frame holding a four-photo photobooth strip" },
  "/objects/words-look-here.webp": { alt: "Four-Letter Words: blush-pink and cream lacquered panels reading LOOK and HERE" },
  "/objects/words-love-more.webp": { alt: "Four-Letter Words: glossy panels reading LOVE and MORE, letters cut through to the wall" },
  "/objects/kiss-wall-piece.webp": { alt: "Four-Letter Words: two glossy pink and cream panels, each with KISS cut through" },
  "/lifestyle/athome-kiss.webp": { alt: "KISS word panel hanging in a bathroom beside a mirror" },
  "/objects/wavy-mirror.webp": { alt: "Pink Wavy Mirror: organic wavy-edged mirror in a hot-pink lacquer frame" },
  "/objects/ripple-mirror.webp": { alt: "Ripple Mirror: tall butter-yellow leaning mirror with stacked rippling layers" },
  "/objects/well-look-at-you.webp": { alt: "Well, Look At You: oxblood wavy mirror with “well, look at you” lettered around the rim" },
  "/objects/love-more.webp": { alt: "Love More: chunky mirror-gold LOVE MORE letters on a living-room wall" },
  "/objects/love-more-2.webp": { alt: "Love More: mirror-gold LOVE MORE letters above a kitchen counter" },
  "/objects/patterned-coasters.webp": { alt: "Patterned Coasters: four wavy-edged patterned resin coasters with cork bases" },
  "/objects/x-plus-o.webp": { alt: "X + O: marble-look noughts-and-crosses board with gold Xs and Os, all made in acrylic" },
  "/lifestyle/cat-heart-1.webp": { alt: "Cat Got Your Heart: matte-black steel cat silhouette mid-stretch with a heart cut out, above a sideboard" },
  "/lifestyle/cat-heart-2.webp": { alt: "Cat Got Your Heart: black steel cat with a heart cut out, on a dining-room wall" },
  "/lifestyle/cat-heart-3.webp": { alt: "Cat Got Your Heart: black steel cat wall art among framed pictures in a living room" },
  "/objects/small-planet-1.webp": { alt: "Small Planet: white steel wall art of two friends on a tiny planet under stars, in a kids' room" },
  "/objects/small-planet-2.webp": { alt: "Small Planet: white steel stargazer wall art above a sofa" },
  "/objects/small-planet-3.webp": { alt: "Small Planet: white laser-cut steel wall art on a grey wall" },
  "/objects/pickleball-shadow-box.webp": { alt: "Pickleball Shadow Box: oak shadow box framing a pickleball paddle and ball over clay court lines" },
  "/lifestyle/pickleball-1.webp": { alt: "Pickleball Shadow Box with two paddles and balls, hanging on a wall at home" },
  "/lifestyle/pickleball-2.webp": { alt: "Pickleball Shadow Box on a green court with a club name, hanging on a wall at home" },
  "/lifestyle/pickleball-3.webp": { alt: "Pickleball Shadow Box on a sage-green court, hanging on a wall at home" },
  "/objects/old-habits.webp": { alt: "Old Habits: old-master portrait of a man in a hat and lace collar holding a red drinks can, in an LED slim frame (unlit)" },
  "/objects/old-habits-lit.webp": { alt: "Old Habits: old-master portrait print in an LED slim frame (lit)" },
  "/objects/smoke-and-feathers.webp": { alt: "Smoke & Feathers: Renaissance portrait collaged with a parrot and orchids in an LED slim frame (unlit)" },
  "/objects/smoke-and-feathers-lit.webp": { alt: "Smoke & Feathers: collage portrait with a parrot and orchids in an LED slim frame (lit)" },
  "/objects/pomegranate-study.webp": { alt: "Pomegranate Study: botanical pomegranate print in an LED slim frame (unlit)" },
  "/objects/pomegranate-study-lit.webp": { alt: "Pomegranate Study: botanical pomegranate print in an LED slim frame (lit)" },
  "/objects/blood-moon.webp": { alt: "Blood Moon: reclining figure and egrets under a red moon, art print in an LED slim frame (unlit)" },
  "/objects/blood-moon-lit.webp": { alt: "Blood Moon: egrets under a red moon, backlit art print in an LED slim frame (lit)" },
  "/objects/quote-frame-no-rules.webp": { alt: "Slim LED Quote Frame: \u201cThis house has NO RULES about what belongs together\u201d in black on cream, backlit above a wooden console in an entryway" },
  "/objects/quote-frame-more-colour.webp": { alt: "Slim LED Quote Frame: \u201cWe could all use MORE COLOUR than we think we need\u201d in blue on yellow, backlit in a marble powder room" },
  "/objects/quote-frame-less-sense.webp": { alt: "Slim LED Quote Frame: \u201cSometimes you need LESS SENSE and a little more fun\u201d in green on blush, backlit beside a dining table" },
  "/objects/quote-frame-little-joys.webp": { alt: "Slim LED Quote Frame: \u201cLife needs LITTLE JOYS in places you don\u2019t expect\u201d in blue on cream, backlit above a carved wooden sofa" },
  "/objects/quote-frame-more-room.webp": { alt: "Slim LED Quote Frame: \u201cThere\u2019s always MORE ROOM for one more bad idea\u201d in red on cream, backlit in an office meeting room" },
  "/objects/custom-lightbox-1.webp": { alt: "Custom Lightbox: slim black LED light box glowing red with custom Hindi words" },
  "/objects/custom-lightbox-2.webp": { alt: "Custom Lightbox: slim black LED light box glowing amber with custom English words" },
};

// Off The Wall tee images are generated from their filenames:
//   /wearables/tee-<design>-<colour>-<front|back>.webp  → mock-up (a visualisation)
//   /wearables/tee-<design>-art.webp                     → the flat artwork
//   /wearables/tee-<design>-<photo|detail>.webp          → photographed mock-up / print close-up
const TEE_COLOUR: Record<string, string> = { black: "black", white: "white", cream: "off-white", green: "dark green" };
function teeMeta(src: string): ImageMeta | undefined {
  const ph = src.match(/^\/wearables\/tee-(.+?)-(photo|detail)\.webp$/);
  if (ph) {
    const t = tees.find((x) => x.slug === `tee-${ph[1]}`);
    const name = t?.name ?? "Off The Wall tee";
    return ph[2] === "photo"
      ? { alt: `${name}: ${t?.colour.toLowerCase() ?? ""} oversized T-shirt, front and back (print on the front)` }
      : { alt: `${name}: close-up of the print on the front of the T-shirt` };
  }
  const m = src.match(/^\/wearables\/tee-(.+?)-(?:(black|white|cream|green)-(front|back)|art)\.webp$/);
  if (!m) return undefined;
  const p = tees.find((t) => t.slug === `tee-${m[1]}`);
  const name = p?.name ?? "Off The Wall tee";
  if (!m[2]) return { alt: `${name}: the artwork` };
  return {
    alt: `${name}: ${TEE_COLOUR[m[2]]} T-shirt, ${m[3]} view (${p?.finish.replace(/^Printed: /, "printed on the ") ?? ""})`,
    isRender: true,
  };
}

export function altFor(src: string | undefined, fallback: string): string {
  const m = src ? IMAGES[src] ?? teeMeta(src) : undefined;
  // renders are tracked (isRender) but not labelled on site (owner's decision)
  return m?.alt ?? fallback;
}

export function isRender(src: string | undefined): boolean {
  return !!(src && (IMAGES[src] ?? teeMeta(src))?.isRender);
}
