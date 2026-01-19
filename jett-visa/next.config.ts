import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  
  // Optimize images for better performance and SEO
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'saas.dev.api.musafirbiz.com',
      },
    ],
  },

  // Compress pages for better performance
  compress: true,

  // Generate sitemap and robots.txt friendly output
  trailingSlash: false,

  // API rewrites
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'https://saas.dev.api.musafirbiz.com/api/v1/:path*',
      },
    ];
  },

  // Add security headers for better SEO ranking
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
        ],
      },
    ];
  },
};

export default nextConfig;
