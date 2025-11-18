# OAuth Setup Guide - Get Your Credentials

## Quick Answer

You need **OAuth credentials** from GitHub and/or Google to enable login. Here's how to get them:

## 🔵 GitHub OAuth Setup

### Step 1: Create OAuth App
1. Go to: https://github.com/settings/developers
2. Click **"New OAuth App"** (or **"OAuth Apps"** → **"New OAuth App"**)

### Step 2: Fill in Details

**Application name:** `Crystal Index` (or any name)

**Homepage URL:**
- **Local dev:** `http://localhost:3000`
- **Production:** `https://crystalindex.co.uk`

**Authorization callback URL:**
- **Local dev:** `http://localhost:3000/api/auth/callback/github`
- **Production:** `https://crystalindex.co.uk/api/auth/callback/github`

### Step 3: Get Credentials
1. Click **"Register application"**
2. Copy the **Client ID** → This is your `GITHUB_ID`
3. Click **"Generate a new client secret"**
4. Copy the **Client secret** → This is your `GITHUB_SECRET`

⚠️ **Important:** The client secret is only shown once! Save it immediately.

### Step 4: Add to .env.local
```bash
GITHUB_ID="your-client-id-here"
GITHUB_SECRET="your-client-secret-here"
```

---

## 🔴 Google OAuth Setup

### Step 1: Create OAuth Client
1. Go to: https://console.cloud.google.com/apis/credentials
2. Make sure you have a project selected (or create one)
3. Click **"+ CREATE CREDENTIALS"** → **"OAuth client ID"**

### Step 2: Configure Consent Screen (if first time)
1. If prompted, click **"Configure Consent Screen"**
2. Choose **"External"** (unless you have Google Workspace)
3. Fill in:
   - **App name:** `Crystal Index`
   - **User support email:** Your email
   - **Developer contact:** Your email
4. Click **"Save and Continue"** through the steps
5. Go back to **"Credentials"** tab

### Step 3: Create OAuth Client
1. Click **"+ CREATE CREDENTIALS"** → **"OAuth client ID"**
2. **Application type:** `Web application`
3. **Name:** `Crystal Index`
4. **Authorized JavaScript origins:**
   - `http://localhost:3000` (for dev)
   - `https://crystalindex.co.uk` (for production)
5. **Authorized redirect URIs:**
   - `http://localhost:3000/api/auth/callback/google` (for dev)
   - `https://crystalindex.co.uk/api/auth/callback/google` (for production)
6. Click **"Create"**

### Step 4: Get Credentials
1. Copy the **Client ID** → This is your `GOOGLE_ID`
2. Copy the **Client secret** → This is your `GOOGLE_SECRET`

### Step 5: Add to .env.local
```bash
GOOGLE_ID="your-client-id-here"
GOOGLE_SECRET="your-client-secret-here"
```

---

## ✅ Which One Do You Need?

**You only need ONE of these:**
- GitHub OAuth (easier, faster setup)
- Google OAuth (more users have Google accounts)

**Or BOTH** (users can choose which to sign in with)

---

## 🧪 Test It

After adding credentials:

1. **Restart your dev server:**
   ```bash
   pnpm dev
   ```

2. **Visit:** `http://localhost:3000/api/auth/signin`

3. **You should see:** GitHub and/or Google sign-in buttons

4. **Click one** → Should redirect to OAuth provider → Back to your app → Logged in!

---

## 🚀 Production Setup

For production, you need to:

1. **Add production URLs** to your OAuth apps:
   - GitHub: Update callback URL to production domain
   - Google: Add production URLs to authorized redirect URIs

2. **Set environment variables in Vercel:**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add `GITHUB_ID`, `GITHUB_SECRET`, `GOOGLE_ID`, `GOOGLE_SECRET`
   - Set `NEXTAUTH_URL` to `https://crystalindex.co.uk`

---

## 🔍 Troubleshooting

### "Invalid callback URL"
- Make sure callback URL matches **exactly** (including `http://` vs `https://`)
- Check for trailing slashes

### "Client ID not found"
- Double-check you copied the Client ID correctly
- Make sure it's set in `.env.local` (not `.env`)

### "Redirect URI mismatch"
- Verify the redirect URI in your OAuth app matches what NextAuth expects
- For GitHub: `/api/auth/callback/github`
- For Google: `/api/auth/callback/google`

### "OAuth app not found"
- Make sure you're using the correct OAuth app
- Check you're logged into the right GitHub/Google account

---

## 📝 Quick Checklist

- [ ] Created GitHub OAuth App (or Google OAuth Client)
- [ ] Set callback URL correctly
- [ ] Copied Client ID → `GITHUB_ID` / `GOOGLE_ID`
- [ ] Copied Client Secret → `GITHUB_SECRET` / `GOOGLE_SECRET`
- [ ] Added to `.env.local`
- [ ] Restarted dev server
- [ ] Tested sign-in flow

---

## 💡 Pro Tips

1. **Use different OAuth apps for dev/prod** (optional but recommended)
   - Dev: `http://localhost:3000` callbacks
   - Prod: `https://crystalindex.co.uk` callbacks

2. **GitHub is faster to set up** - Good for quick testing

3. **Google requires consent screen setup** - Takes a bit longer but more users have Google accounts

4. **Save secrets securely** - Never commit `.env.local` to git!

