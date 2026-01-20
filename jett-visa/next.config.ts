import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'https://saas.dev.api.musafirbiz.com/api/v1/:path*',
      },
    ];
  },
  // Disable prerendering for development - components won't be treated as pages
};

export default nextConfig;
