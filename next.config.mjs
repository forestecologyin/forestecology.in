import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Local node_modules path
const localNodeModules = path.join(__dirname, "node_modules");
const localTailwindcss = path.join(localNodeModules, "tailwindcss");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 days
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },

  // Keeps Next.js file tracing correct in Vercel
  outputFileTracingRoot: __dirname,

  turbopack: {
    root: __dirname,
    resolveAlias: {
      tailwindcss: localTailwindcss,
    },
  },

  webpack: (config) => {
    config.resolve = config.resolve ?? {};
    config.resolve.alias = config.resolve.alias ?? {};
    config.resolve.modules = [
      localNodeModules,
      ...(config.resolve.modules ?? []),
    ];
    config.resolve.alias.tailwindcss = localTailwindcss;
    return config;
  },

  experimental: {
    optimizePackageImports: ["framer-motion", "react-icons"],
  },
};

export default nextConfig;