/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Optional: Keep default strict mode
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      // Add other allowed hostnames here if needed in the future
      // {
      //   protocol: 'https',
      //   hostname: 'example.com',
      // },
    ],
  },
};

module.exports = nextConfig;
