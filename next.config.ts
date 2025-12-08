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
