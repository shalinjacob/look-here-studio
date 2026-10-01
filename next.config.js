/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // KISS Wall Piece became one option of Four-Letter Words (Oct 2026)
      { source: "/objects/kiss-wall-piece", destination: "/objects/four-letter-words", permanent: true },
    ];
  },
};

module.exports = nextConfig;
