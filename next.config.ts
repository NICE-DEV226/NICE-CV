import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimizations for Vercel deployment
  output: "standalone",

  // Enable experimental features for better performance
  experimental: {
    // Enable optimized package imports
    optimizePackageImports: ["lucide-react"],
  },

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    formats: ["image/webp", "image/avif"],
  },

  // Enable compression
  compress: true,

  // SWC minification is enabled by default in Next.js 13+

  // Power optimizations
  poweredByHeader: false,

  // Headers for better performance
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600",
          },
        ],
      },
    ];
  },

  // Webpack configuration for canvas dependencies
  webpack: (config, { isServer }) => {
    // Handle canvas polyfill for server-side rendering
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push("canvas");
    }

    // Optimize bundle splitting
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks?.cacheGroups,
          default: false,
          vendors: false,
          // Vendor chunk
          vendor: {
            name: "vendor",
            chunks: "all",
            test: /node_modules/,
            priority: 20,
          },
          // Common chunk
          common: {
            minChunks: 2,
            chunks: "all",
            enforce: true,
            priority: 10,
          },
        },
      },
    };

    return config;
  },
};

export default nextConfig;
