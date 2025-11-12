/**
 * Environment variable mapping for Vercel Storage integration
 * Vercel creates env vars with STOREAGE_ prefix, but Prisma expects DATABASE_URL
 */

// Map Vercel Storage env vars to standard DATABASE_URL
if (process.env.STOREAGE_DATABASE_URL && !process.env.DATABASE_URL) {
  process.env.DATABASE_URL = process.env.STOREAGE_DATABASE_URL
}

// Also support POSTGRES_PRISMA_URL (pooled connection - better for serverless)
if (process.env.STOREAGE_POSTGRES_PRISMA_URL && !process.env.DATABASE_URL) {
  process.env.DATABASE_URL = process.env.STOREAGE_POSTGRES_PRISMA_URL
}

// Fallback to POSTGRES_URL if available
if (process.env.STOREAGE_POSTGRES_URL && !process.env.DATABASE_URL) {
  process.env.DATABASE_URL = process.env.STOREAGE_POSTGRES_URL
}

export {}

