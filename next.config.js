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
    ];
  },
};

module.exports = nextConfig;
