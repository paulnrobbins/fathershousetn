/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three'],
  experimental: {
    optimizePackageImports: ['@react-three/drei', 'gsap'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
  poweredByHeader: false,
};

export default nextConfig;
