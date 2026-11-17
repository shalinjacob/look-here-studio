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
  "/objects/layer-clock-v2.webp": { alt: "Layer Clock: square wall clock of stacked wavy layers in a terracotta-to-orange gradient, with brass studs" },
  "/lifestyle/layer-clock-1.webp": { alt: "Layer Clock on a sage green wall above a retro home bar with green velvet stools" },
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
  "/objects/patterned-coasters-v2.webp": { alt: "Patterned Coasters: five wavy resin coasters in stripes, checks and ripples on a sunlit coffee table with drinks" },
  "/lifestyle/patterned-coasters-1.webp": { alt: "Red and pink checked wavy coaster on a green marble bar table under a cocktail" },
  "/objects/patterned-coasters.webp": { alt: "Patterned Coasters: four wavy-edged patterned resin coasters with cork bases" },
  "/objects/x-plus-o.webp": { alt: "X + O: marble-look noughts-and-crosses board with gold Xs and Os, all made in acrylic" },
  "/lifestyle/cat-heart-1.webp": { alt: "Cat Got Your Heart: matte-black steel cat silhouette mid-stretch with a heart cut out, above a sideboard" },
  "/lifestyle/cat-heart-2.webp": { alt: "Cat Got Your Heart: black steel cat with a heart cut out, on a dining-room wall" },
  "/lifestyle/cat-heart-3.webp": { alt: "Cat Got Your Heart: black steel cat wall art among framed pictures in a living room" },
  "/objects/small-planet-1.webp": { alt: "Small Planet: white aluminium wall art of two friends on a tiny planet under stars, in a kids' room" },
  "/objects/small-planet-2.webp": { alt: "Small Planet: white aluminium stargazer wall art above a sofa" },
  "/objects/small-planet-3.webp": { alt: "Small Planet: white laser-cut aluminium wall art on a grey wall" },
  "/objects/pickleball-shadow-box.webp": { alt: "Pickleball Shadow Box: oak shadow box framing a pickleball paddle and ball over clay court lines" },
  "/lifestyle/pickleball-1.webp": { alt: "Pickleball Shadow Box with two paddles and balls, hanging on a wall at home" },
  "/lifestyle/pickleball-2.webp": { alt: "Pickleball Shadow Box on a green court with a club name, hanging on a wall at home" },
  "/lifestyle/pickleball-3.webp": { alt: "Pickleball Shadow Box on a sage-green court, hanging on a wall at home" },
  "/lifestyle/old-habits-1.webp": { alt: "Old Habits lit in a warm living room: a backlit Old Master portrait of a man in a feathered hat holding a can of Caffeine cola, glowing on the wall" },
  "/objects/old-habits.webp": { alt: "Old Habits: old-master portrait of a man in a hat and lace collar holding a red drinks can, in an LED slim frame (unlit)" },
  "/objects/old-habits-lit.webp": { alt: "Old Habits: old-master portrait print in an LED slim frame (lit)" },
  "/lifestyle/smoke-and-feathers-1.webp": { alt: "Smoke & Feathers lit in a warm living room: a backlit portrait with a macaw and orchids glowing on the wall" },
  "/objects/smoke-and-feathers.webp": { alt: "Smoke & Feathers: Renaissance portrait collaged with a parrot and orchids in an LED slim frame (unlit)" },
  "/objects/smoke-and-feathers-lit.webp": { alt: "Smoke & Feathers: collage portrait with a parrot and orchids in an LED slim frame (lit)" },
  "/objects/pomegranate-study.webp": { alt: "Pomegranate Study: botanical pomegranate print in an LED slim frame (unlit)" },
  "/objects/pomegranate-study-lit.webp": { alt: "Pomegranate Study: botanical pomegranate print in an LED slim frame (lit)" },
  "/objects/sunglasses-at-court.webp": { alt: "Sunglasses at Court: a tabby cat in a white ruff and round sunglasses against gold drapery, art print in an LED slim frame (unlit)" },
  "/objects/sunglasses-at-court-lit.webp": { alt: "Sunglasses at Court: cat in a ruff and sunglasses, backlit art print in an LED slim frame (lit)" },
  "/objects/still-water.webp": { alt: "Still Water: a white hibiscus floating on rippling teal water, art print in an LED slim frame (unlit)" },
  "/objects/still-water-lit.webp": { alt: "Still Water: white hibiscus on teal ripples, backlit art print in an LED slim frame (lit)" },
  "/objects/road-trip-in-bloom.webp": { alt: "Road Trip in Bloom: a pixel-art campervan covered in flowers with a guitarist on the roof, art print in an LED slim frame (unlit)" },
  "/objects/hearts-and-crosses.webp": { alt: "Hearts & Crosses: a black acrylic noughts and crosses grid on a wall with nine grey squares, five red hearts and five black crosses" },
  "/lifestyle/hearts-and-crosses-1.webp": { alt: "Hearts & Crosses on a cream wall above a wooden bench in a sunlit hallway" },
  "/lifestyle/hearts-and-crosses-2.webp": { alt: "Hearts & Crosses on a white wall beside a wooden door, above a bench with a basket" },
  "/lifestyle/hearts-and-crosses-3.webp": { alt: "Hearts & Crosses on a wall in a dining area, with red hearts and black crosses below the grid" },
  "/objects/road-trip-in-bloom-lit.webp": { alt: "Road Trip in Bloom: pixel-art campervan and guitarist, backlit art print in an LED slim frame (lit)" },
  "/objects/blood-moon.webp": { alt: "Blood Moon: reclining figure and egrets under a red moon, art print in an LED slim frame (unlit)" },
  "/objects/blood-moon-lit.webp": { alt: "Blood Moon: egrets under a red moon, backlit art print in an LED slim frame (lit)" },
  "/objects/quote-frame-no-rules.webp": { alt: "Slim LED Quote Frame: \u201cThis house has NO RULES about what belongs together\u201d in black on cream, backlit above a wooden console in an entryway" },
  "/objects/quote-frame-more-colour.webp": { alt: "Slim LED Quote Frame: \u201cWe could all use MORE COLOUR than we think we need\u201d in blue on yellow, backlit in a marble powder room" },
  "/objects/quote-frame-less-sense.webp": { alt: "Slim LED Quote Frame: \u201cSometimes you need LESS SENSE and a little more fun\u201d in green on blush, backlit beside a dining table" },
  "/objects/quote-frame-little-joys.webp": { alt: "Slim LED Quote Frame: \u201cLife needs LITTLE JOYS in places you don\u2019t expect\u201d in blue on cream, backlit above a carved wooden sofa" },
  "/objects/quote-frame-more-room.webp": { alt: "Slim LED Quote Frame: \u201cThere\u2019s always MORE ROOM for one more bad idea\u201d in red on cream, backlit in an office meeting room" },
  "/objects/custom-lightbox-1.webp": { alt: "Custom Lightbox: slim black LED light box glowing red with custom Hindi words" },
  "/objects/custom-lightbox-2.webp": { alt: "Custom Lightbox: slim black LED light box glowing amber with custom English words" },
  // Small runs (cleaned-up studio photos)
  "/small-runs/mirror-bitches.webp": { alt: "Light-Cast Mirror Disc: 4-inch round mirror with a red vinyl heart and the words Bitches Are People Too" },
  "/small-runs/mirror-fruit-blossom.webp": { alt: "Light-Cast Mirror Disc: round mirror with a red vinyl cherry, plum blossom and moon ring" },
  "/small-runs/mirror-red-bloom.webp": { alt: "Light-Cast Mirror Disc: round mirror with a red vinyl flower inside a ring" },
  "/small-runs/mirror-set.webp": { alt: "Set of three Light-Cast Mirror Discs with red vinyl designs: lettering heart, cherry blossom and a single flower" },
  "/small-runs/mirror-light-cast.webp": { alt: "The Bitches Are People Too mirror disc casting its heart-shaped design as a patch of light on a wall" },
  "/small-runs/fabric-frame-a4.webp": { alt: "Trying To Get My Shit Together: white vinyl cat on a litter tray over block-printed fabric, in a white frame on a pink wall" },
  "/small-runs/fabric-frame-a4-detail.webp": { alt: "Close-up of the white vinyl cat and lettering over rust and ochre block-printed fabric" },
  "/small-runs/decal-elephants.webp": { alt: "Small gold elephant decals scattered across a pale wall above a bathroom mirror" },
  "/small-runs/decal-elephants-detail.webp": { alt: "Close-up of gold vinyl elephant decals on a wall" },
  "/small-runs/poster-outrageous-bedroom.webp": { alt: "Pink floral quote print in a thin wood frame above a child's bed with a soft bunny, reading Darling, you can be whatever you want to be as long as you're outrageous" },
  "/small-runs/poster-outrageous-living.webp": { alt: "Pink floral Darling, you can be outrageous quote print in a thin wood frame on a cream wall above a wooden sideboard with flowers and a lamp" },
  "/small-runs/poster-outrageous-art.webp": { alt: "The A4 print: pink block-print flowers around a cream label reading Darling, you can be whatever you want to be as long as you're outrageous" },
  "/small-runs/decal-clouds-wall.webp": { alt: "Soft blue watercolour cloud wall stickers scattered across a cream wall beside a window, a wooden bench and a trailing money plant" },
  "/small-runs/decal-clouds-pieces.webp": { alt: "The cloud sticker shapes: puffy cloud, drifting cloud and curled cloud, 8 of each, with their widths" },
  "/small-runs/decal-bows-wall.webp": { alt: "Painted ribbon bow wall stickers in blue polka dot, pink gingham, peach stripe, green floral, red and orange, scattered across a cream wall above a cane bench" },
  "/small-runs/decal-poppy-wall.webp": { alt: "Red poppy wall stickers scattered across a cream wall above a cane bench with cushions and a vase of white flowers" },
  "/small-runs/decal-poppy-pieces.webp": { alt: "The poppy sticker shapes: front-facing flower, side flower and bud, with their heights" },
  "/small-runs/decal-poppy-layout.webp": { alt: "Layout guide showing red poppy stickers scattered across an 8 ft by 8 ft wall" },
  "/small-runs/decal-lotus-wall.webp": { alt: "Pink and olive lotus and bud wall stickers scattered in a staggered grid on a cream wall above a cane bench with cushions" },
  "/small-runs/decal-lotus-pieces.webp": { alt: "The Lotus & Bud sticker set: a pink open lotus flower (12 in the set) beside a closed bud (12 in the set)" },
  "/small-runs/decal-lotus-layout.webp": { alt: "Layout guide showing the lotus and bud stickers spaced across an 8 ft by 8 ft wall" },
  "/small-runs/tee-achaari-gend-worn.webp": { alt: "Woman in sunglasses wearing the black oversized Achaari Gend Tee with a small print of a pickle jar and a pickleball" },
  "/small-runs/tee-achaari-gend-bench.webp": { alt: "Black Achaari Gend Tee on a pickleball court bench beside a paddle, ball, towel and bottle" },
  "/small-runs/tee-achaari-gend-hanging.webp": { alt: "Black oversized Achaari Gend Tee on a hanger with a pickle jar and neon pickleball print on the chest" },
  "/small-runs/tee-space-cat-hanging.webp": { alt: "Space Cat Tee: white print of a cat in an astronaut suit beside Japanese lettering on a black oversized tee hanging on a wooden wardrobe" },
  "/small-runs/tee-space-cat-worn.webp": { alt: "Smiling man wearing the black oversized Space Cat Tee with a white astronaut cat and Japanese lettering" },
  "/small-runs/tee-uninstall-astrology-worn-bed.webp": { alt: "Smiling woman sitting on a bed wearing the sand oversized Uninstall Astrology Tee with a round white lettering print" },
  "/small-runs/tee-uninstall-astrology-hanging.webp": { alt: "Uninstall Astrology Tee: sand oversized tee with a round white lettering block hanging on a wooden wardrobe" },
  "/small-runs/tee-uninstall-astrology.webp": { alt: "Uninstall Astrology Tee: round white lettering block on a sand-coloured oversized tee, worn" },
  "/small-runs/tee-uninstall-astrology-detail.webp": { alt: "Close-up of the Uninstall Astrology, Install Critical Thinking print in white vinyl on a sand tee" },
  "/small-runs/tee-only-fans.webp": { alt: "Only Fans Tee: cream vinyl print of ceiling, table and pedestal fans and an air conditioner under a big ONLY FANS headline, on navy" },
  "/small-runs/custom-garment-print.webp": { alt: "A gold heat-pressed vinyl motif on a customer's own polo shirt" },
};

export function altFor(src: string | undefined, fallback: string): string {
  const m = src ? IMAGES[src] : undefined;
  // renders are tracked (isRender) but not labelled on site (owner's decision)
  return m?.alt ?? fallback;
}

export function isRender(src: string | undefined): boolean {
  return !!(src && (IMAGES[src])?.isRender);
}
