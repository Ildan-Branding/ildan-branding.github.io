/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // GitHub Pages 정적 배포
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
