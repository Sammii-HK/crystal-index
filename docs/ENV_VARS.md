# Environment Variables Reference

## 📋 Complete List

### 🔴 Required (App won't work without these)

```bash
# Database
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"

# NextAuth (Authentication)
NEXTAUTH_URL="http://localhost:3000"  # Production: https://crystalindex.co.uk
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
COOKIE_SECRET="generate-with-openssl-rand-base64-32"

# OAuth (at least one required)
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"
# OR/AND
GOOGLE_ID="your-google-client-id"
GOOGLE_SECRET="your-google-client-secret"

# AI Services
OPENAI_API_KEY="sk-..."  # For blog generation
REPLICATE_API_TOKEN="r8_..."  # For crystal identification

# Stripe (Payments)
STRIPE_SECRET_KEY="sk_test_..."  # or sk_live_... for production
STRIPE_PUBLISHABLE_KEY="pk_test_..."  # or pk_live_... for production

# Vercel Blob (Image Storage)
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_..."
```

### 🟡 Optional (Features work but limited)

```bash
# Stripe Webhook (for subscription updates)
STRIPE_WEBHOOK_SECRET="whsec_..."  # Only needed for webhook verification

# Anthropic (Alternative to OpenAI)
ANTHROPIC_API_KEY="sk-ant-..."  # Only if switching from OpenAI

# PostHog (Analytics)
NEXT_PUBLIC_POSTHOG_KEY="phc_..."
NEXT_PUBLIC_POSTHOG_HOST="https://app.posthog.com"

# Site URL (for SEO/sitemaps)
NEXT_PUBLIC_SITE_URL="https://crystalindex.co.uk"  # Production domain

# OpenCage (Location features - if using)
NEXT_PUBLIC_OPENCAGE_API_KEY="..."
```

### 🔵 Vercel Auto-Mapped (Don't need to set manually)

```bash
# These are auto-mapped by lib/env.ts if using Vercel Storage
STOREAGE_POSTGRES_PRISMA_URL="..."  # Auto-mapped to DATABASE_URL
VERCEL_URL="..."  # Auto-set by Vercel
```

## 🚀 Quick Setup

### Generate Secrets

```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32

# Generate COOKIE_SECRET
openssl rand -base64 32
```

### Where to Get Each Key

| Variable | Where to Get |
|----------|-------------|
| `DATABASE_URL` | Neon: https://neon.tech or Vercel Postgres |
| `GITHUB_ID/SECRET` | https://github.com/settings/developers |
| `GOOGLE_ID/SECRET` | https://console.cloud.google.com/apis/credentials |
| `OPENAI_API_KEY` | https://platform.openai.com/api-keys |
| `REPLICATE_API_TOKEN` | https://replicate.com/account/api-tokens |
| `STRIPE_SECRET_KEY` | https://dashboard.stripe.com/test/apikeys |
| `STRIPE_PUBLISHABLE_KEY` | https://dashboard.stripe.com/test/apikeys |
| `BLOB_READ_WRITE_TOKEN` | Vercel Dashboard → Storage → Blob |
| `POSTHOG_KEY` | https://app.posthog.com → Project Settings |

## 📝 Production vs Development

### Development (.env.local)
```bash
NEXTAUTH_URL="http://localhost:3000"
STRIPE_SECRET_KEY="sk_test_..."  # Test keys
```

### Production (Vercel Environment Variables)
```bash
NEXTAUTH_URL="https://crystalindex.co.uk"
STRIPE_SECRET_KEY="sk_live_..."  # Live keys
STRIPE_PUBLISHABLE_KEY="pk_live_..."  # Live keys
NEXT_PUBLIC_SITE_URL="https://crystalindex.co.uk"
```

## ✅ Minimum Required Set

To get the app running with basic features:

```bash
DATABASE_URL="..."
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="..."
COOKIE_SECRET="..."
GITHUB_ID="..."
GITHUB_SECRET="..."
OPENAI_API_KEY="..."
REPLICATE_API_TOKEN="..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
BLOB_READ_WRITE_TOKEN="..."
```

## 🔍 Check What You Have

```bash
# List all env vars (without values)
cat .env.local | grep -E "^[A-Z]" | cut -d'=' -f1 | sort
```

