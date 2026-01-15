import type { NextConfig } from "next";

const nextConfig: NextConfig = {
<<<<<<< HEAD
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'http://localhost:3000/api/v1/:path*',
=======
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
>>>>>>> e3f38b1df29a584bee40332dad12e59eae138b54
      },
    ];
  },
};

export default nextConfig;
