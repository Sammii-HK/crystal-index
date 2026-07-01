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
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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
