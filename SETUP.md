# Setup Guide

## Database Setup

### Use Neon Directly (3GB Free Tier + Preview Branches)

**Recommended:** Use Neon directly for 3GB storage and preview branch support:

1. Sign up at https://neon.tech (3GB free tier)
2. Create a new project (this is your production database)
3. Create a preview branch for preview deployments:
   - Go to **Branches** → **Create Branch**
   - Name it `preview`
   - Copy the connection string
4. Add connection strings to Vercel:
   - **Production**: Main branch connection string
   - **Preview**: Preview branch connection string
   - Go to Vercel → Settings → Environment Variables
   - Add `DATABASE_URL` for each environment
5. Add to local `.env`:
   ```bash
   DATABASE_URL="postgresql://user:password@ep-xxx.region.neon.tech/dbname?sslmode=require"
   ```

**Benefits:**

- ✅ 3GB storage (vs 0.5GB through Vercel)
- ✅ Preview branches for isolated testing
- ✅ Schema sync between branches
- ✅ Easy cleanup of preview data

See [NEON_SETUP.md](./NEON_SETUP.md) for detailed setup instructions with preview branches.

## Environment Variables

Copy `.env.example` to `.env` and fill in all required values:

```bash
cp .env.example .env
```

### Required Variables:

- **DATABASE_URL** - PostgreSQL connection string (from Vercel or local)
- **NEXTAUTH_URL** - Your app URL (http://localhost:3000 for dev)
- **NEXTAUTH_SECRET** - Generate with: `openssl rand -base64 32`
- **REPLICATE_API_TOKEN** - Get from https://replicate.com/account/api-tokens
- **BLOB_READ_WRITE_TOKEN** - Get from Vercel dashboard → Storage → Blob
- **STRIPE_SECRET_KEY** - Get from Stripe dashboard
- **POSTHOG_KEY** - Get from PostHog dashboard (optional for now)

## Installation & Migration

1. Install dependencies:

```bash
pnpm install
```

2. Generate Prisma client:

```bash
npx prisma generate
```

3. Run database migrations:

```bash
npx prisma migrate dev --name init
```

4. (Optional) Seed the database:

```bash
npx prisma db seed
```

## Running the App

```bash
pnpm dev
```

The app will be available at http://localhost:3000

## Troubleshooting

### Prisma errors about DATABASE_URL

- Make sure `.env` file exists and contains `DATABASE_URL`
- Check that the database is running (if using Docker)
- Verify the connection string format is correct

### Package installation errors

- Make sure you're using Node.js 18+ (`node --version`)
- Try deleting `node_modules` and `pnpm-lock.yaml`, then `pnpm install` again
