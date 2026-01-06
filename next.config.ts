import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allows strictly external images from Unsplash for placeholders
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // React Strict Mode is on by default in Next.js, but explicit is good
  reactStrictMode: true,
};

export default nextConfig;