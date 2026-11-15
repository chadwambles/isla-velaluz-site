/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static site: `next build` writes plain HTML to ./out
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
