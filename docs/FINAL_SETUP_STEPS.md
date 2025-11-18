# Final Setup Steps - Beyond Environment Variables

## ✅ You Have Env Vars - What's Next?

### 1. Database Migrations (Critical)

Make sure your database schema is up to date:

```bash
# Generate Prisma Client (if not done)
npx prisma generate

# Run migrations
pnpm migrate
```

**Check:** Open Prisma Studio to verify tables exist:
```bash
npx prisma studio
```

Should show: Users, Crystals, Identifications, BlogPosts, etc.

---

### 2. Test Authentication

```bash
# Start dev server
pnpm dev

# Visit: http://localhost:3000/api/auth/signin
# Click Auth0 sign-in → Should redirect and log you in
```

**Verify:**
- [ ] Can sign in with Auth0
- [ ] User created in database
- [ ] Session persists (refresh page, still logged in)
- [ ] Can sign out

---

### 3. Test Core Features

#### Crystal Identification
- [ ] Visit `/identify`
- [ ] Upload a crystal image
- [ ] Verify identification works (needs `REPLICATE_API_TOKEN`)

#### Collections
- [ ] Visit `/collections` (after signing in)
- [ ] Add crystal to collection
- [ ] Add notes/tags

#### Blog (Admin Only)
- [ ] Sign in as admin user
- [ ] Generate blog post (needs `OPENAI_API_KEY`)
- [ ] View at `/blog`

#### Payments (Test Mode)
- [ ] Visit `/pricing`
- [ ] Test checkout with Stripe test card: `4242 4242 4242 4242`
- [ ] Verify webhook receives events (if `STRIPE_WEBHOOK_SECRET` set)

---

### 4. Production Deployment Checklist

#### Vercel Environment Variables
Add all env vars to Vercel Dashboard:
- [ ] `DATABASE_URL` (production)
- [ ] `AUTH0_CLIENT_ID`, `AUTH0_CLIENT_SECRET`, `AUTH0_ISSUER`
- [ ] `NEXTAUTH_URL` = `https://crystalindex.co.uk`
- [ ] `NEXTAUTH_SECRET`, `COOKIE_SECRET`
- [ ] `OPENAI_API_KEY`
- [ ] `REPLICATE_API_TOKEN`
- [ ] `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY` (live keys for prod)
- [ ] `BLOB_READ_WRITE_TOKEN`
- [ ] `NEXT_PUBLIC_POSTHOG_KEY` (optional)

#### Auth0 Production Setup
- [ ] Update Auth0 app callback URLs to production domain
- [ ] Add production logout URLs
- [ ] Test production sign-in flow

#### Stripe Production
- [ ] Switch to live API keys in Vercel
- [ ] Set up webhook endpoint in Stripe Dashboard
- [ ] Point to: `https://crystalindex.co.uk/api/stripe/webhook`
- [ ] Test webhook receives events

#### Database
- [ ] Run migrations on production database
- [ ] Verify all tables created
- [ ] Set up database backups (if using Neon, auto-enabled)

---

### 5. Optional But Recommended

#### Error Monitoring
- [ ] Set up Sentry (or similar)
- [ ] Add error tracking

#### Analytics
- [ ] Configure PostHog for production
- [ ] Set up conversion tracking

#### Performance
- [ ] Enable Vercel Analytics
- [ ] Test page load speeds
- [ ] Verify image optimization working

---

## 🚀 Quick Test Commands

```bash
# 1. Check database connection
npx prisma studio

# 2. Verify migrations
npx prisma migrate status

# 3. Test build
pnpm build

# 4. Start dev server
pnpm dev

# 5. Check what env vars you have
cat .env.local | grep -E "^[A-Z]" | cut -d'=' -f1 | sort
```

---

## ✅ Minimum to Get Running

If you have all env vars, you just need:

1. **Run migrations** (if not done):
   ```bash
   pnpm migrate
   ```

2. **Start dev server**:
   ```bash
   pnpm dev
   ```

3. **Test sign-in**:
   - Visit `http://localhost:3000/api/auth/signin`
   - Sign in with Auth0
   - Should work! 🎉

---

## 🎯 What You Can Test Right Now

Even without all services, you can test:

- ✅ **Browse crystals** - `/crystals` (if you have data)
- ✅ **Read blog posts** - `/blog` (if published)
- ✅ **View pricing** - `/pricing`
- ✅ **Sign in** - `/api/auth/signin` (if Auth0 configured)

---

## 📋 Summary

**If you have all env vars:**
1. ✅ Run migrations: `pnpm migrate`
2. ✅ Start server: `pnpm dev`
3. ✅ Test sign-in
4. ✅ Test features

**For production:**
1. Add env vars to Vercel
2. Update Auth0 callbacks
3. Set up Stripe webhook
4. Deploy!

You're basically ready! 🚀

