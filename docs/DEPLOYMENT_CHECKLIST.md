# Deployment Checklist

## ✅ Pre-Deployment (You've Done This!)

- [x] All environment variables added to Vercel
- [x] Auth0 app configured
- [x] Code pushed to branch

## 🔧 Final Steps Before Deploy

### 1. Verify Environment Variables in Vercel

Go to Vercel Dashboard → Your Project → Settings → Environment Variables

**Required:**
- [ ] `DATABASE_URL` (Production)
- [ ] `AUTH0_CLIENT_ID`
- [ ] `AUTH0_CLIENT_SECRET`
- [ ] `AUTH0_ISSUER`
- [ ] `NEXTAUTH_URL` = `https://crystalindex.co.uk`
- [ ] `NEXTAUTH_SECRET`
- [ ] `COOKIE_SECRET`
- [ ] `OPENAI_API_KEY`
- [ ] `REPLICATE_API_TOKEN`
- [ ] `STRIPE_SECRET_KEY` (use live keys for production)
- [ ] `STRIPE_PUBLISHABLE_KEY` (use live keys for production)
- [ ] `BLOB_READ_WRITE_TOKEN`

**Optional:**
- [ ] `STRIPE_WEBHOOK_SECRET` (for subscription updates)
- [ ] `NEXT_PUBLIC_POSTHOG_KEY` (analytics)
- [ ] `NEXT_PUBLIC_OPENCAGE_API_KEY` (location features)

### 2. Update Auth0 Callbacks

Go to Auth0 Dashboard → Applications → "crystal index reg" → Settings

**Update:**
- [ ] Callback URLs include: `https://crystalindex.co.uk/api/auth/callback/auth0`
- [ ] Logout URLs include: `https://crystalindex.co.uk`
- [ ] Web Origins include: `https://crystalindex.co.uk`

### 3. Set Up Stripe Webhook (Production)

1. Go to Stripe Dashboard → Developers → Webhooks
2. Click **"Add endpoint"**
3. Endpoint URL: `https://crystalindex.co.uk/api/stripe/webhook`
4. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Copy **Signing secret** → Add as `STRIPE_WEBHOOK_SECRET` in Vercel

### 4. Database Migrations

Migrations should run automatically via `vercel-build` script, but verify:

```bash
# Check migration status
npx prisma migrate status

# If needed, run migrations manually
npx prisma migrate deploy
```

## 🚀 Deploy

### Option 1: Auto-Deploy (Recommended)
1. Merge PR to `main` branch
2. Vercel auto-deploys
3. Check deployment logs

### Option 2: Manual Deploy
```bash
vercel --prod
```

## ✅ Post-Deployment Verification

### 1. Test Authentication
- [ ] Visit: `https://crystalindex.co.uk/api/auth/signin`
- [ ] Sign in with Auth0
- [ ] Verify redirect works
- [ ] Check user created in database

### 2. Test Core Features
- [ ] Crystal identification (`/identify`)
- [ ] Collections (`/collections`)
- [ ] Blog (`/blog`)
- [ ] Pricing (`/pricing`)

### 3. Test Payments (Test Mode First!)
- [ ] Visit `/pricing`
- [ ] Use Stripe test card: `4242 4242 4242 4242`
- [ ] Complete checkout
- [ ] Verify webhook received

### 4. Check Logs
- [ ] Vercel Dashboard → Deployments → View logs
- [ ] Check for errors
- [ ] Verify all env vars loaded

## 🐛 Common Issues

### "Invalid callback URL"
- Check Auth0 callbacks match exactly
- Include `https://` not `http://`

### "Environment variable not found"
- Verify vars added in Vercel Dashboard
- Check variable names match exactly (case-sensitive)
- Redeploy after adding vars

### "Database connection failed"
- Verify `DATABASE_URL` is correct
- Check database allows connections from Vercel IPs
- Run migrations: `npx prisma migrate deploy`

### "Stripe webhook not working"
- Verify webhook endpoint URL is correct
- Check `STRIPE_WEBHOOK_SECRET` matches Stripe dashboard
- Test with Stripe CLI first

## 📊 Monitoring

After deployment, set up:
- [ ] Vercel Analytics (auto-enabled)
- [ ] Error monitoring (Sentry recommended)
- [ ] PostHog analytics (if configured)
- [ ] Database monitoring (Neon dashboard)

## 🎉 Success!

Once all checks pass, your app is live! 🚀

