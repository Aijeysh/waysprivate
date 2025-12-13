import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: 'pub-97249c779703492eba5f50325efa3b48.r2.dev',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'waysprivate.com.np',
          },
        ],
        destination: 'https://www.waysprivate.com.np/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
