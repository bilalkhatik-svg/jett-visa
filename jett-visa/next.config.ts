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
      {
        protocol: 'https',
        hostname: 'dtbytxvxbapz.cloudfront.net',
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
      {
        source: '/ip-api/:path*',
        destination: 'https://ipapi.co/:path*',
      },
    ];
  },
  // Disable prerendering for development - components won't be treated as pages
};

export default nextConfig;
