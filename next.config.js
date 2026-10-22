/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // KISS Wall Piece became one option of Four-Letter Words (Oct 2026)
      { source: "/objects/kiss-wall-piece", destination: "/objects/four-letter-words", permanent: true },
      // Corner Frame withdrawn from the catalogue (Oct 2026)
      { source: "/objects/corner-frame", destination: "/objects", permanent: true },
      // Tees without owner photos withdrawn (Oct 2026)
      { source: "/objects/tee-cat-butterfly", destination: "/off-the-wall", permanent: true },
      { source: "/objects/tee-astronaut", destination: "/off-the-wall", permanent: true },
      { source: "/objects/tee-margarita", destination: "/off-the-wall", permanent: true },
      { source: "/objects/tee-carnation", destination: "/off-the-wall", permanent: true },
      { source: "/objects/tee-winged-skeleton", destination: "/off-the-wall", permanent: true },
      { source: "/objects/tee-snake-knot", destination: "/off-the-wall", permanent: true },
      { source: "/objects/tee-no-rules", destination: "/off-the-wall", permanent: true },
      { source: "/objects/tee-more-colour", destination: "/off-the-wall", permanent: true },
      { source: "/objects/tee-less-sense", destination: "/off-the-wall", permanent: true },
      { source: "/objects/tee-little-joys", destination: "/off-the-wall", permanent: true },
      { source: "/objects/tee-more-room", destination: "/off-the-wall", permanent: true },
      // Festival 01 / Diwali range removed (Sep-Oct 2026): send old links somewhere useful
      { source: "/collections/festival-01", destination: "/gift-guide", permanent: true },
      { source: "/collections/festival", destination: "/gift-guide", permanent: true },
      { source: "/objects/diya-toran", destination: "/objects", permanent: true },
      { source: "/objects/diya-ring-toran", destination: "/objects", permanent: true },
      { source: "/objects/knot-toran", destination: "/objects", permanent: true },
      { source: "/objects/kolam-coasters", destination: "/objects/patterned-coasters", permanent: true },
      { source: "/objects/leaf-coasters", destination: "/objects/patterned-coasters", permanent: true },
      { source: "/objects/motif-coasters", destination: "/objects/patterned-coasters", permanent: true },
      { source: "/objects/kolam-constellation", destination: "/objects", permanent: true },
      { source: "/objects/jasmine-at-dusk", destination: "/objects", permanent: true },
      { source: "/objects/the-threshold", destination: "/objects", permanent: true },
      { source: "/journal/a-house-full-of-light", destination: "/journal", permanent: true },
      // Column Light, Wave Shelf, Sculptural Lamp withdrawn (Oct 2026)
      { source: "/objects/column-light", destination: "/objects", permanent: true },
      { source: "/objects/wave-shelf", destination: "/objects/clear-ledge", permanent: true },
      { source: "/objects/sculptural-lamp", destination: "/objects/acrylic-lamp", permanent: true },
      // /collections has no index page of its own (Google probes it from /collections/editions)
      { source: "/collections", destination: "/collections/editions", permanent: true },
      // journal post renamed (Diwali wording dropped)
      { source: "/journal/unique-diwali-gift-ideas-for-home", destination: "/journal/unique-gift-ideas-for-home", permanent: true },
      // Gift Promise removed (Oct 2026)
      { source: "/gift-promise", destination: "/gift-guide", permanent: true },
      { source: "/gift-promise/card", destination: "/gift-guide", permanent: true },
      // Process merged into Why Look Here (Oct 2026)
      { source: "/process", destination: "/why-look-here#process", permanent: true },
    ];
  },
};

module.exports = nextConfig;
