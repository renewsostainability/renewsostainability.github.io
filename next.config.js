/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",      // tells Next.js to produce static HTML
  trailingSlash: true,   // creates folders with index.html for nested routes
  assetPrefix: "./",     // relative paths for GitHub Pages
};

module.exports = nextConfig;
