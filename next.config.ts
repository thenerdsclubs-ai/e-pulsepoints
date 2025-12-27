import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['firebase/firestore', 'firebase/auth'],
  },
  
  // Redirects for SEO and user experience
  async redirects() {
    return [
      // Forum redirect to study groups (community page doesn't exist)
      {
        source: '/forum',
        destination: '/study-groups',
        permanent: true,
      },
      {
        source: '/community',
        destination: '/study-groups',
        permanent: true,
      },
      // Old video paths redirect
      {
        source: '/video/:slug',
        destination: '/watch/:slug',
        permanent: true,
      },
      // Articles to blog
      {
        source: '/articles/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
      // Common misspellings and alternatives
      {
        source: '/ecg-tools',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/calculators',
        destination: '/tools',
        permanent: true,
      },
      // Practice variations
      {
        source: '/practice',
        destination: '/practice-tests',
        permanent: true,
      },
      {
        source: '/quiz',
        destination: '/practice-tests',
        permanent: true,
      },
    ];
  },

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        port: '',
        pathname: '/api/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/vi/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
        pathname: '/vi/**',
      },
    ],
  },
};

export default nextConfig;
