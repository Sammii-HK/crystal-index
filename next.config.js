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
    // Uploads already go through sharp: resized to maxWidth 1920 and encoded as
    // WebP q85 (lib/blob.ts). Vercel's optimizer was therefore re-compressing
    // already-compressed images, and /_next/image was 3,200 of ~3,900 requests in
    // a week — the single biggest line on the bill. unoptimized serves the blob
    // straight from storage: no transformations, nothing billed for them.
    // Trade-off: one size for all viewports, which is fine at 26-70 KB each.
    // Set this back to false to re-enable the optimizer; the settings below then
    // apply (one year TTL because blob URLs are immutable, WebP only, fewer widths).
    unoptimized: true,
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
