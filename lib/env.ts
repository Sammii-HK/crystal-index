/**
 * Environment variable mapping for Vercel Storage integration
 *
 * WHAT IT DOES:
 * Vercel Storage creates env vars with "STOREAGE_" prefix (like STOREAGE_POSTGRES_PRISMA_URL)
 * But Prisma expects "DATABASE_URL"
 * This file automatically maps Vercel's vars to DATABASE_URL so Prisma can find it
 *
 * PRIORITY ORDER:
 * 1. Explicit DATABASE_URL (if you set it manually - highest priority)
 * 2. STOREAGE_POSTGRES_PRISMA_URL (pooled connection - best for serverless)
 * 3. STOREAGE_DATABASE_URL (fallback)
 * 4. STOREAGE_POSTGRES_URL (fallback)
 *
 * WHY THIS MATTERS:
 * - You can set DATABASE_URL per environment in Vercel (prod/preview/dev)
 * - If not set, it automatically uses Vercel's Storage vars
 * - Keeps main branch database safe - use different DATABASE_URL for preview/dev
 */

declare const process: {
	env: {
		DATABASE_URL?: string;
		STOREAGE_POSTGRES_PRISMA_URL?: string;
		STOREAGE_DATABASE_URL?: string;
		STOREAGE_POSTGRES_URL?: string;
		[key: string]: string | undefined;
	};
};

// Only map if DATABASE_URL isn't already set (allows override per environment)
if (!process.env.DATABASE_URL) {
	// Use pooled connection for serverless (best performance)
	if (process.env.STOREAGE_POSTGRES_PRISMA_URL) {
		process.env.DATABASE_URL = process.env.STOREAGE_POSTGRES_PRISMA_URL;
	}
	// Fallback to DATABASE_URL variant
	else if (process.env.STOREAGE_DATABASE_URL) {
		process.env.DATABASE_URL = process.env.STOREAGE_DATABASE_URL;
	}
	// Last resort: direct POSTGRES_URL
	else if (process.env.STOREAGE_POSTGRES_URL) {
		process.env.DATABASE_URL = process.env.STOREAGE_POSTGRES_URL;
	}
}

export {};
