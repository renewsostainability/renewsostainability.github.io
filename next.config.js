// next.config.js
// const isProduction = false;
const isProduction = true;


/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isProduction ? '/sostainability' : '',
  assetPrefix: isProduction ? '/sostainability/' : '',
}

module.exports = nextConfig