import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
