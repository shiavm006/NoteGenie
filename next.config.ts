import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Ignore ESLint during builds to prevent warnings from blocking deployment
    ignoreDuringBuilds: true,
  },
  typescript: {
    // TypeScript errors are fixed - keep validation enabled
    ignoreBuildErrors: false,
  },
  // Optimize for production
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
