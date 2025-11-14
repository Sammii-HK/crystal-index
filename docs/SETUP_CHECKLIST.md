# Setup Checklist - Getting the App Working & Testable

## ✅ Prerequisites

- [x] Node.js >= 18.x installed
- [x] pnpm installed
- [x] Git repository cloned
- [x] Branch: `crystal-index-2.0`

## 📦 Step 1: Install Dependencies

```bash
pnpm install
```

This will install:
- Next.js, React, TypeScript
- Prisma ORM
- AI SDK packages (`ai`, `@ai-sdk/openai`, `@ai-sdk/anthropic`)
- Stripe, PostHog, Replicate SDKs
- Vercel Blob storage
- NextAuth
- All other dependencies

## 🔐 Step 2: Environment Variables

Create/update `.env.local` with all required variables:

### Database (Required)
```bash
# Database URL (from Neon or Vercel Postgres)
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"

# For Vercel Storage (auto-mapped by lib/env.ts)
# STOREAGE_POSTGRES_PRISMA_URL="..." (optional, auto-mapped)
```

### NextAuth (Required for Authentication)
```bash
# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
COOKIE_SECRET="generate-with-openssl-rand-base64-32"

# OAuth Providers (at least one required)
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"

# OR/AND
GOOGLE_ID="your-google-client-id"
GOOGLE_SECRET="your-google-client-secret"
```

**Generate secrets:**
```bash
openssl rand -base64 32  # For NEXTAUTH_SECRET
openssl rand -base64 32  # For COOKIE_SECRET
```

**OAuth Setup:**
- GitHub: https://github.com/settings/developers → New OAuth App
- Google: https://console.cloud.google.com/apis/credentials → OAuth Client ID

### AI Services (Required for Blog Generation)
```bash
# OpenAI (for blog generation)
OPENAI_API_KEY="sk-..."

# Optional: Anthropic (if switching to Claude)
ANTHROPIC_API_KEY="sk-ant-..."
```

### Replicate (Required for Crystal Identification)
```bash
REPLICATE_API_TOKEN="r8_..."
```

Get from: https://replicate.com/account/api-tokens

### Stripe (Required for Payments)
```bash
# Stripe API Keys
STRIPE_SECRET_KEY="sk_test_..."  # or sk_live_... for production
STRIPE_PUBLISHABLE_KEY="pk_test_..."  # or pk_live_... for production
STRIPE_WEBHOOK_SECRET="whsec_..."  # For webhook verification

# For local webhook testing, use Stripe CLI:
# stripe listen --forward-to localhost:3000/api/stripe/webhook
```

### Vercel Blob (Required for Image Storage)
```bash
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_..."
```

Get from: Vercel Dashboard → Your Project → Storage → Blob → Settings

### PostHog (Optional but Recommended)
```bash
NEXT_PUBLIC_POSTHOG_KEY="phc_..."
NEXT_PUBLIC_POSTHOG_HOST="https://app.posthog.com"  # or your self-hosted URL
```

### Other (Optional)
```bash
# For location features (if using)
NEXT_PUBLIC_OPENCAGE_API_KEY="..."
```

## 🗄️ Step 3: Database Setup

### Option A: Using Neon (Recommended - 3GB free tier)

1. Create account at https://neon.tech
2. Create new project
3. Copy connection string → `DATABASE_URL` in `.env.local`
4. Run migrations:

```bash
pnpm migrate
```

### Option B: Using Vercel Postgres

1. In Vercel Dashboard → Storage → Postgres
2. Copy `POSTGRES_PRISMA_URL` → Will be auto-mapped to `DATABASE_URL` by `lib/env.ts`
3. Run migrations:

```bash
pnpm migrate
```

## 🔄 Step 4: Run Database Migrations

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
pnpm migrate
```

This creates all tables:
- Users, Accounts, Sessions (NextAuth)
- Crystals, Images, CrystalInfo
- Identifications, UserCrystals (Collections)
- BlogPosts
- RateLimits, ApiKeys
- etc.

## 🧪 Step 5: Verify Setup

### Check Prisma Connection
```bash
npx prisma studio
```

Should open Prisma Studio showing your database tables.

### Check Environment Variables
```bash
# List all env vars (without values)
cat .env.local | grep -E "^[A-Z]" | cut -d'=' -f1 | sort
```

### Start Dev Server
```bash
pnpm dev
```

Visit: http://localhost:3000

## 🧩 Step 6: Test Key Features

### 1. Authentication
- [ ] Visit `/api/auth/signin` or sign in button
- [ ] Test GitHub/Google OAuth flow
- [ ] Verify user created in database

### 2. Crystal Identification
- [ ] Visit `/identify`
- [ ] Upload crystal image
- [ ] Verify identification works (requires `REPLICATE_API_TOKEN`)

### 3. Collections
- [ ] Visit `/collections`
- [ ] Add crystal to collection
- [ ] Add notes/tags

### 4. Blog Generation (Admin Only)
- [ ] Sign in as admin user
- [ ] Visit blog admin page
- [ ] Generate blog post for a crystal
- [ ] Verify blog post created

### 5. Blog Display
- [ ] Visit `/blog`
- [ ] View published blog posts
- [ ] Click individual post

### 6. Pricing/Stripe (Test Mode)
- [ ] Visit `/pricing`
- [ ] Test checkout flow (use Stripe test cards)
- [ ] Verify webhook receives events

## 🐛 Troubleshooting

### "DATABASE_URL not found"
- Check `.env.local` exists
- Verify `DATABASE_URL` is set
- If using Vercel Storage, check `STOREAGE_POSTGRES_PRISMA_URL` is set
- Restart dev server after adding env vars

### "Prisma Client not generated"
```bash
npx prisma generate
```

### "Migration failed"
```bash
# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Or create new migration
npx prisma migrate dev --name init
```

### "NextAuth error"
- Verify `NEXTAUTH_URL` matches your dev URL (`http://localhost:3000`)
- Check OAuth callback URLs match exactly
- Generate new secrets if needed

### "Stripe webhook not working locally"
```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Copy webhook secret to .env.local
```

### "Replicate API error"
- Verify `REPLICATE_API_TOKEN` is set
- Check token is valid at https://replicate.com/account/api-tokens

### "Vercel Blob error"
- Verify `BLOB_READ_WRITE_TOKEN` is set
- Check token has read/write permissions

## 📋 Quick Start Commands

```bash
# 1. Install dependencies
pnpm install

# 2. Set up .env.local (copy from template above)

# 3. Generate Prisma Client
npx prisma generate

# 4. Run migrations
pnpm migrate

# 5. Start dev server
pnpm dev
```

## 🚀 Production Deployment Checklist

Before deploying to Vercel:

1. **Environment Variables**: Add all vars in Vercel Dashboard
   - Production: Set `NEXTAUTH_URL` to production domain
   - Preview: Set `NEXTAUTH_URL` to preview URL pattern

2. **Database**: 
   - Production: Use production database
   - Preview: Use preview branch database (Neon supports this)

3. **Stripe**: 
   - Use live keys for production
   - Use test keys for preview

4. **OAuth Callbacks**: 
   - Update callback URLs in GitHub/Google OAuth apps
   - Add production and preview URLs

5. **Webhooks**:
   - Set up Stripe webhook endpoint in Stripe Dashboard
   - Point to: `https://yourdomain.com/api/stripe/webhook`

6. **Build Command**: Already set in `package.json`
   ```json
   "vercel-build": "prisma generate && next build && prisma migrate deploy"
   ```

## 📚 Additional Resources

- [NextAuth Setup Guide](./NEXTAUTH_SETUP.md)
- [AI SDK Setup Guide](./AI_SDK_SETUP.md)
- [Database Optimization](./DATABASE_OPTIMIZATION.md)
- [Neon Setup Guide](./NEON_SETUP.md) (if using Neon)

## ✅ Final Checklist

- [ ] Dependencies installed (`pnpm install`)
- [ ] All environment variables set in `.env.local`
- [ ] Database connected and migrations run
- [ ] Prisma Client generated
- [ ] Dev server starts without errors
- [ ] Can sign in with OAuth
- [ ] Can identify crystals (if Replicate token set)
- [ ] Can create collections
- [ ] Can generate blog posts (if OpenAI key set, admin only)
- [ ] Stripe checkout works (test mode)

Once all checked, you're ready to develop and test! 🎉



