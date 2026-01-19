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
<<<<<<< HEAD
  // Disable prerendering for development - components won't be treated as pages
=======

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
>>>>>>> 0f1ee9dd767d1707b6f0517bfcaf4a5fc9484625
};

export default nextConfig;
