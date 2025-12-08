import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Don't fail build on ESLint warnings/errors during production builds
    ignoreDuringBuilds: false,
  },
  typescript: {
    // Don't fail build on TypeScript errors (shouldn't have any, but safety measure)
    ignoreBuildErrors: false,
  },
  // Optimize for production
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
