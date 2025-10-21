import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'closetfrontrecruiting.blob.core.windows.net',
      },
    ],
  },
};

export default nextConfig;
