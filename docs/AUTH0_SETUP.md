# Auth0 Setup with NextAuth.js

## ✅ Yes, You Can Use Auth0!

NextAuth.js supports Auth0 as a provider. Here's how to set it up:

## 🔧 Step 1: Get Auth0 Credentials

Since you already have Auth0 CLI installed, you can:

### Option A: Use Auth0 CLI (Easier)
```bash
# Login (if not already)
auth0 login

# Create a new application
auth0 apps create

# Or list existing apps
auth0 apps list

# Get credentials for an app
auth0 apps show <app-id>
```

### Option B: Use Auth0 Dashboard
1. Go to: https://manage.auth0.com
2. Navigate to **Applications** → **Applications**
3. Click **"Create Application"** (or use existing)
4. Choose **"Regular Web Application"**
5. Go to **Settings** tab
6. Copy:
   - **Domain** → Used for `AUTH0_ISSUER`
   - **Client ID** → `AUTH0_CLIENT_ID`
   - **Client Secret** → `AUTH0_CLIENT_SECRET`

## 🔐 Step 2: Configure Auth0 Application

In Auth0 Dashboard → Your Application → Settings:

### Allowed Callback URLs:
```
http://localhost:3000/api/auth/callback/auth0
https://crystalindex.co.uk/api/auth/callback/auth0
```

### Allowed Logout URLs:
```
http://localhost:3000
https://crystalindex.co.uk
```

### Allowed Web Origins:
```
http://localhost:3000
https://crystalindex.co.uk
```

## 📝 Step 3: Environment Variables

Add to `.env.local`:

```bash
# Auth0 Configuration
AUTH0_CLIENT_ID="your-auth0-client-id"
AUTH0_CLIENT_SECRET="your-auth0-client-secret"
AUTH0_ISSUER="https://your-tenant.auth0.com"  # e.g., https://dev-lji2ti0xxkebshe2.uk.auth0.com

# NextAuth (still required)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
COOKIE_SECRET="generate-with-openssl-rand-base64-32"
```

## 🎯 Step 4: Update NextAuth Config

The code has been updated to use Auth0. Your `pages/api/auth/[...nextauth].ts` now uses:

```typescript
Auth0Provider({
  clientId: process.env.AUTH0_CLIENT_ID!,
  clientSecret: process.env.AUTH0_CLIENT_SECRET!,
  issuer: process.env.AUTH0_ISSUER!,
})
```

## ✅ Step 5: Test It

1. **Restart dev server:**
   ```bash
   pnpm dev
   ```

2. **Visit:** `http://localhost:3000/api/auth/signin`

3. **You should see:** Auth0 sign-in button

4. **Click it** → Redirects to Auth0 → Sign in → Back to your app!

## 🚀 Benefits of Auth0

- ✅ **Unified auth** - One provider for all users
- ✅ **Social logins** - Configure GitHub, Google, etc. in Auth0 dashboard
- ✅ **User management** - Built-in user database
- ✅ **More control** - Customize login flows, branding
- ✅ **Enterprise features** - MFA, SSO, etc.

## 🔄 Using Auth0 + Social Logins

You can configure social logins (GitHub, Google) **within Auth0**:

1. Go to Auth0 Dashboard → **Authentication** → **Social**
2. Enable GitHub/Google connections
3. Configure them
4. Users can sign in with GitHub/Google through Auth0!

This way you get:
- Auth0 as your main provider
- Social logins configured in Auth0 (not separate NextAuth providers)
- All users stored in Auth0

## 📋 Quick Checklist

- [ ] Created Auth0 application
- [ ] Set callback URLs in Auth0
- [ ] Got `AUTH0_CLIENT_ID`
- [ ] Got `AUTH0_CLIENT_SECRET`
- [ ] Got `AUTH0_ISSUER` (your tenant domain)
- [ ] Added to `.env.local`
- [ ] Restarted dev server
- [ ] Tested sign-in

## 🆚 Auth0 vs Direct OAuth

| Feature | Auth0 | Direct GitHub/Google |
|---------|-------|---------------------|
| Setup Complexity | Medium | Easy |
| User Management | Built-in | Need to manage yourself |
| Social Logins | Configure in Auth0 | Separate providers |
| Cost | Free tier available | Free |
| Control | More features | Simpler |

**Recommendation:** If you already have Auth0 set up, use it! It's more powerful and gives you better user management.

