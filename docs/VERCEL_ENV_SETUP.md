# Vercel Environment Variables Setup

## Issue: STOREAGE_ Prefix

Vercel Storage integration creates environment variables with `STOREAGE_` prefix, but Prisma expects `DATABASE_URL`.

## Solution

The code automatically maps `STOREAGE_DATABASE_URL` or `STOREAGE_POSTGRES_PRISMA_URL` to `DATABASE_URL`.

**However, for best practice, add a direct `DATABASE_URL` in Vercel:**

### Option 1: Add DATABASE_URL Manually (Recommended)

1. Go to Vercel → Your Project → Settings → Environment Variables
2. Click **Add New**
3. Name: `DATABASE_URL`
4. Value: Copy from `STOREAGE_POSTGRES_PRISMA_URL` (use the pooled connection)
5. Select environments: Production, Preview, Development
6. Save

### Option 2: Use the Auto-Mapping (Current)

The code in `lib/env.ts` automatically maps:
- `STOREAGE_POSTGRES_PRISMA_URL` → `DATABASE_URL` (preferred - pooled)
- `STOREAGE_DATABASE_URL` → `DATABASE_URL` (fallback)
- `STOREAGE_POSTGRES_URL` → `DATABASE_URL` (fallback)

## Which Connection String to Use?

**For Prisma (serverless/Vercel):**
- ✅ Use `STOREAGE_POSTGRES_PRISMA_URL` (pooled connection)
- This is optimized for serverless functions

**For direct connections:**
- Use `STOREAGE_POSTGRES_URL` (direct connection)

**For migrations:**
- Use `STOREAGE_POSTGRES_URL_NON_POOLING` (non-pooling)

## Local Development

In your `.env.local`, use the direct connection string from Neon:

```bash
DATABASE_URL="postgresql://user:password@ep-xxx.region.neon.tech/dbname?sslmode=require"
```

Or if you want to use Vercel's connection:

```bash
DATABASE_URL="${STOREAGE_POSTGRES_PRISMA_URL}"
```

But it's better to use Neon's direct connection string for local dev.

## Environment Variables Summary

**Vercel automatically creates:**
- `STOREAGE_POSTGRES_PRISMA_URL` - Pooled connection (best for Prisma)
- `STOREAGE_POSTGRES_URL` - Direct connection
- `STOREAGE_DATABASE_URL` - Alias
- `STOREAGE_POSTGRES_URL_NON_POOLING` - For migrations
- Plus individual components (PGHOST, PGUSER, etc.)

**You need to add:**
- `DATABASE_URL` - Map it to `STOREAGE_POSTGRES_PRISMA_URL` value

## Quick Fix

1. Copy the value from `STOREAGE_POSTGRES_PRISMA_URL`
2. Create new env var `DATABASE_URL` with that value
3. Apply to all environments
4. Redeploy

This ensures Prisma can find `DATABASE_URL` directly.

