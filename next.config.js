/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  eslint: {
    ignoreDuringBuilds: true
  },

  typescript: {
    ignoreBuildErrors: true
  },

  productionBrowserSourceMaps: false,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: '*.replicate.delivery',
      },
    ],
    // Source blobs are already WebP and immutable (content-addressed URLs), so:
    //  - one year TTL instead of Next 13's 60s default, which was re-running the
    //    same transformation all week: /_next/image was 3,200 of ~3,900 requests.
    //  - WebP only. AVIF costs far more to encode for no gain over a WebP source.
    //  - fewer widths = fewer variants of each image to generate and store.
    minimumCacheTTL: 31536000,
    formats: ['image/webp'],
    deviceSizes: [640, 828, 1200, 1920],
    imageSizes: [64, 128, 256, 384],
  },

  // Keep sharp as an external (unbundled) package so its native binary loads
  // correctly in the Vercel serverless runtime (fixes the /api/v1/identify 500).
  serverExternalPackages: ['sharp'],

  experimental: {
    optimizePackageImports: ['@react-three/fiber', '@react-three/drei'],
    serverComponentsExternalPackages: ['sharp'],
  },
}

export default nextConfig
