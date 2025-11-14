# Quick Start - Get App Running Now

## Current Status ✅

- ✅ Dependencies installed (`ai` package found)
- ✅ Prisma Client generated
- ✅ Database connected (`DATABASE_URL` set)
- ✅ Vercel Blob configured (`BLOB_READ_WRITE_TOKEN` set)
- ✅ OpenAI configured (`OPENAI_API_KEY` set)

## Missing - Add These to `.env.local` ⚠️

### 1. NextAuth (Required for Sign In)

```bash
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="$(openssl rand -base64 32)"
COOKIE_SECRET="$(openssl rand -base64 32)"

# Choose one or both OAuth providers:
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"

# OR
GOOGLE_ID="your-google-client-id"
GOOGLE_SECRET="your-google-client-secret"
```

**Quick OAuth Setup:**
- **GitHub**: https://github.com/settings/developers → New OAuth App
  - Callback: `http://localhost:3000/api/auth/callback/github`
- **Google**: https://console.cloud.google.com/apis/credentials → OAuth Client ID
  - Callback: `http://localhost:3000/api/auth/callback/google`

### 2. Replicate (Required for Crystal Identification)

```bash
REPLICATE_API_TOKEN="r8_..."
```

Get from: https://replicate.com/account/api-tokens

### 3. Stripe (Required for Payments)

```bash
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."  # Optional for local dev
```

Get from: https://dashboard.stripe.com/test/apikeys

### 4. PostHog (Optional - Analytics)

```bash
NEXT_PUBLIC_POSTHOG_KEY="phc_..."
NEXT_PUBLIC_POSTHOG_HOST="https://app.posthog.com"
```

## 🚀 Start Now

### Step 1: Install Missing AI SDK Providers

```bash
pnpm install @ai-sdk/openai @ai-sdk/anthropic
```

### Step 2: Add Missing Env Vars

Add the variables above to `.env.local`

### Step 3: Run Migrations (if not done)

```bash
pnpm migrate
```

### Step 4: Start Dev Server

```bash
pnpm dev
```

Visit: http://localhost:3000

## 🧪 Test Without All Services

You can test parts of the app even without all services:

### ✅ Works Without Setup:
- **Crystal browsing** - `/crystals` (if you have crystal data)
- **Blog reading** - `/blog` (if you have published posts)
- **Static pages** - Home, About, etc.

### ⚠️ Requires Setup:
- **Sign In** - Needs NextAuth OAuth providers
- **Crystal Identification** - Needs `REPLICATE_API_TOKEN`
- **Blog Generation** - Needs `OPENAI_API_KEY` (✅ you have this!)
- **Payments** - Needs Stripe keys
- **Collections** - Needs authentication (NextAuth)

## 📋 Priority Order

1. **NextAuth** (if you want to test user features)
2. **Replicate** (if you want to test crystal identification)
3. **Stripe** (if you want to test payments)
4. **PostHog** (optional, for analytics)

## 🎯 Minimal Test Setup

To just see the app running:

```bash
# 1. Install AI SDK providers
pnpm install @ai-sdk/openai @ai-sdk/anthropic

# 2. Start dev server (will work, some features disabled)
pnpm dev
```

Then visit http://localhost:3000 - you can browse crystals and read blog posts even without auth!

## 📚 Full Setup Guide

See [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md) for complete setup instructions.



