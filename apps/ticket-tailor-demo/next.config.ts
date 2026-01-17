import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.tickettailor.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.tickettailor.com',
      },
      {
        protocol: 'https',
        hostname: 'uploads.tickettailorassets.com',
      }
    ],
  },
};

export default nextConfig;
