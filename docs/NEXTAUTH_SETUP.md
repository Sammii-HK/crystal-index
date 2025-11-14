# NextAuth Setup Guide

## What is NextAuth?

**NextAuth.js** is an authentication library for Next.js that handles:
- User sign-in/sign-out
- OAuth providers (GitHub, Google, etc.)
- Session management
- User data storage in your database

**In your app:**
- Users can sign in with GitHub or Google
- Sessions are stored in your database (via Prisma)
- User data is automatically saved to the `User` table
- Protected routes can check if user is authenticated

## Required Environment Variables

### For Local Development (.env.local)

```bash
# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"  # Generate with: openssl rand -base64 32

# OAuth Providers (choose one or both)
# GitHub OAuth
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"

# Google OAuth
GOOGLE_ID="your-google-client-id"
GOOGLE_SECRET="your-google-client-secret"

# Cookie Secret (for session encryption)
COOKIE_SECRET="your-cookie-secret-here"  # Generate with: openssl rand -base64 32
```

### For Production (Vercel)

Set these in Vercel → Settings → Environment Variables:

**Production:**
- `NEXTAUTH_URL` = `https://crystalindex.co.uk` (your production domain)
- `NEXTAUTH_SECRET` = (same secret or generate new one)
- `GITHUB_ID` = (your GitHub OAuth app client ID)
- `GITHUB_SECRET` = (your GitHub OAuth app secret)
- `GOOGLE_ID` = (your Google OAuth client ID)
- `GOOGLE_SECRET` = (your Google OAuth client secret)
- `COOKIE_SECRET` = (same as NEXTAUTH_SECRET or separate)

**Preview:**
- Same variables, but `NEXTAUTH_URL` = your preview URL (e.g., `https://crystal-index-git-feat-crystal-index-2-0-sammiihk.vercel.app`)

## Step-by-Step Setup

### 1. Generate Secrets

```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32

# Generate COOKIE_SECRET (can be same or different)
openssl rand -base64 32
```

### 2. Set Up GitHub OAuth

1. Go to https://github.com/settings/developers
2. Click **New OAuth App**
3. Fill in:
   - **Application name**: Crystal Index
   - **Homepage URL**: 
     - Local: `http://localhost:3000`
     - Production: `https://crystalindex.co.uk`
   - **Authorization callback URL**:
     - Local: `http://localhost:3000/api/auth/callback/github`
     - Production: `https://crystalindex.co.uk/api/auth/callback/github`
4. Click **Register application**
5. Copy **Client ID** → `GITHUB_ID`
6. Generate **Client Secret** → `GITHUB_SECRET`

### 3. Set Up Google OAuth

1. Go to https://console.cloud.google.com/apis/credentials
2. Click **Create Credentials** → **OAuth client ID**
3. Configure consent screen (if first time)
4. Create OAuth client:
   - **Application type**: Web application
   - **Name**: Crystal Index
   - **Authorized redirect URIs**:
     - Local: `http://localhost:3000/api/auth/callback/google`
     - Production: `https://crystalindex.co.uk/api/auth/callback/google`
5. Copy **Client ID** → `GOOGLE_ID`
6. Copy **Client Secret** → `GOOGLE_SECRET`

### 4. Add to Local .env.local

```bash
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="paste-generated-secret-here"
COOKIE_SECRET="paste-generated-secret-here"
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"
GOOGLE_ID="your-google-client-id"
GOOGLE_SECRET="your-google-client-secret"
```

### 5. Add to Vercel Environment Variables

**For Production:**
- Go to Vercel → Your Project → Settings → Environment Variables
- Add all the variables above
- Set `NEXTAUTH_URL` to your production domain
- Select **Production** environment

**For Preview:**
- Add same variables
- Set `NEXTAUTH_URL` to your preview URL pattern (Vercel auto-generates this)
- Or use: `https://crystal-index-*.vercel.app` (wildcard)
- Select **Preview** environment

## How It Works

1. **User clicks "Sign In"** → Redirected to GitHub/Google
2. **User authorizes** → Redirected back to your app
3. **NextAuth creates session** → Stores in database
4. **User is logged in** → Can access protected routes

## Testing

1. Start dev server: `pnpm dev`
2. Go to `http://localhost:3000`
3. Click sign in → Should redirect to GitHub/Google
4. After auth → Redirected back, logged in

## Troubleshooting

**"Invalid callback URL" error:**
- Make sure callback URL in OAuth app matches exactly
- Check `NEXTAUTH_URL` is correct

**"NEXTAUTH_SECRET missing" error:**
- Make sure `NEXTAUTH_SECRET` is set in `.env.local`
- Generate new secret if needed

**Session not persisting:**
- Check `COOKIE_SECRET` is set
- Verify database connection (sessions stored in DB)

## Quick Setup Commands

```bash
# Generate secrets
openssl rand -base64 32  # For NEXTAUTH_SECRET
openssl rand -base64 32  # For COOKIE_SECRET

# Add to .env.local (already have DATABASE_URL)
echo 'NEXTAUTH_URL="http://localhost:3000"' >> .env.local
echo 'NEXTAUTH_SECRET="paste-secret-here"' >> .env.local
echo 'COOKIE_SECRET="paste-secret-here"' >> .env.local
echo 'GITHUB_ID="your-id"' >> .env.local
echo 'GITHUB_SECRET="your-secret"' >> .env.local
echo 'GOOGLE_ID="your-id"' >> .env.local
echo 'GOOGLE_SECRET="your-secret"' >> .env.local
```

## Current Setup

Your app already has:
- ✅ NextAuth configured with GitHub & Google providers
- ✅ Prisma adapter (stores users in database)
- ✅ Session callbacks (adds userId and role to session)
- ✅ Auth routes at `/api/auth/*`

You just need to add the environment variables!



