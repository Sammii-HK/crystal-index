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

  // publicRuntimeConfig: {
  //   // Will be available on both server and client
  //   DATABASE_URL: process.env.DATABASE_URL,
  //   // NEXT_PUBLIC_
  // },

}

export default nextConfig
