# Environment Setup Guide

## Database Per Environment Strategy

To avoid affecting production/main branch, set up separate databases for each environment:

### Production (Main Branch)
- **Database**: Main Neon branch
- **Purpose**: Live production data
- **Protected**: Never use for development/testing

### Preview (Feature Branches)
- **Database**: Preview Neon branch
- **Purpose**: Test feature branches before merging
- **Isolated**: Separate from production

### Development (Local)
- **Database**: Can use preview branch or separate dev branch
- **Purpose**: Local development
- **Isolated**: Separate from production

## Setup Steps

### 1. Create Neon Preview Branch

1. Go to Neon Console → Your Project
2. Click **Branches** → **Create Branch**
3. Name it `preview` or `staging`
4. Copy the connection string

### 2. Configure Vercel Environment Variables

In Vercel → Settings → Environment Variables:

#### Production Environment
- **Variable**: `DATABASE_URL` (or use `STOREAGE_POSTGRES_PRISMA_URL`)
- **Value**: Main branch connection string
- **Environments**: ✅ Production only

#### Preview Environment  
- **Variable**: `DATABASE_URL` (or use `STOREAGE_POSTGRES_PRISMA_URL`)
- **Value**: Preview branch connection string
- **Environments**: ✅ Preview only

#### Development Environment
- **Variable**: `DATABASE_URL`
- **Value**: Preview branch connection string (or separate dev branch)
- **Environments**: ✅ Development only

### 3. Local Development (.env.local)

Create `.env.local` for your feature branch:

```bash
# Use preview branch for local dev (safe, won't affect production)
DATABASE_URL="postgresql://user:password@ep-xxx-preview.region.neon.tech/dbname?sslmode=require"

# Or create a separate dev branch
# DATABASE_URL="postgresql://user:password@ep-xxx-dev.region.neon.tech/dbname?sslmode=require"
```

## How It Works

The code in `lib/env.ts` automatically maps Vercel's `STOREAGE_` prefixed vars to `DATABASE_URL`, but you can override per environment:

1. **If `DATABASE_URL` is explicitly set** → Uses that (highest priority)
2. **Otherwise** → Maps from `STOREAGE_POSTGRES_PRISMA_URL`

This means:
- ✅ Production uses production database
- ✅ Preview deployments use preview database
- ✅ Local dev uses preview/dev database
- ✅ Main branch stays safe

## Vercel Storage Integration

If you're using Vercel Storage (which creates `STOREAGE_` vars):

**Option A: Use Separate Storage Instances**
- Create separate Vercel Storage databases for preview
- Each will have its own `STOREAGE_` vars
- Set them per environment in Vercel

**Option B: Use Neon Directly (Recommended)**
- Create Neon branches manually
- Set `DATABASE_URL` directly per environment
- More control, same infrastructure

## Migration Strategy

When working on feature branches:

1. **Run migrations on preview branch:**
   ```bash
   DATABASE_URL="preview-branch-url" npx prisma migrate dev
   ```

2. **Test on preview database** (isolated from production)

3. **After merge to main:**
   - Run migrations on production database
   - Production stays safe during development

## Safety Checklist

- [ ] Preview database is separate from production
- [ ] `DATABASE_URL` set per environment in Vercel
- [ ] Local `.env.local` uses preview/dev database
- [ ] Never run migrations on production during feature development
- [ ] Test migrations on preview branch first

## Quick Reference

**Current branch (feat/crystal-index-2.0):**
- Use preview branch database
- Set in `.env.local` for local dev
- Set in Vercel Preview environment for deployments

**Main branch:**
- Uses production database
- Never touched by feature branches
- Safe and isolated



