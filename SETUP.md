# Setup Guide

## Database Setup

### Option 1: Vercel Postgres (Recommended)

1. Go to your Vercel project dashboard
2. Navigate to **Storage** → **Create Database** → **Postgres**
3. Once created, Vercel automatically sets `DATABASE_URL` as an environment variable
4. Copy the connection string from Vercel dashboard
5. Add it to your local `.env` file:

```bash
DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"
```

### Option 2: Local Development (Docker)

1. Create a `.env` file in the root directory:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/crystal_index_dev?schema=public"
DB_USERNAME=postgres
DB_PASSWORD=postgres
```

2. Start the database:

```bash
docker-compose up -d crystalsdb
```

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

