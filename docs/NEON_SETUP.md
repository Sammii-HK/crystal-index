# Neon Database Setup with Preview Storage

Neon supports **database branching** - perfect for preview deployments! Here's how to set it up:

## Step 1: Create Neon Account & Project

1. Sign up at https://neon.tech (3GB free tier)
2. Create a new project
3. Copy your connection string from the dashboard

## Step 2: Set Up Database Branches

Neon allows you to create branches (like git branches) for different environments:

### Production Database (Main Branch)
- This is your default/main branch
- Used for production deployments

### Preview Database Branch
- Create a branch for preview deployments
- Automatically syncs schema from main
- Isolated data for testing

## Step 3: Configure Vercel Environment Variables

In your Vercel project dashboard:

1. Go to **Settings** → **Environment Variables**

2. Add `DATABASE_URL` for each environment:

   **Production:**
   ```
   DATABASE_URL=postgresql://user:password@ep-xxx-main.region.neon.tech/dbname?sslmode=require
   ```

   **Preview:**
   ```
   DATABASE_URL=postgresql://user:password@ep-xxx-preview.region.neon.tech/dbname?sslmode=require
   ```
   
   **Development:**
   ```
   DATABASE_URL=postgresql://user:password@ep-xxx-dev.region.neon.tech/dbname?sslmode=require
   ```

3. Make sure to select the correct environment for each:
   - ✅ Production
   - ✅ Preview  
   - ✅ Development

## Step 4: Create Preview Branch in Neon

### Option A: Using Neon Console

1. Go to your Neon project dashboard
2. Click on **Branches** in the sidebar
3. Click **Create Branch**
4. Name it `preview` or `staging`
5. Copy the connection string for this branch
6. Add it to Vercel Preview environment variables

### Option B: Using Neon API (Automated)

You can automate branch creation for each preview deployment using Neon's API.

## Step 5: Local Development Setup

Create `.env.local` for local development:

```bash
DATABASE_URL="postgresql://user:password@ep-xxx-dev.region.neon.tech/dbname?sslmode=require"
```

Or use the same preview branch for local dev.

## Step 6: Run Migrations

After setting up branches, run migrations on each:

```bash
# Production
DATABASE_URL="your-production-url" npx prisma migrate deploy

# Preview (run on Vercel preview deployments automatically)
DATABASE_URL="your-preview-url" npx prisma migrate deploy
```

## Benefits of Neon Branches

✅ **Isolated data** - Preview deployments don't affect production
✅ **Schema sync** - Branches automatically sync schema from main
✅ **Easy cleanup** - Delete preview branches when done
✅ **Cost effective** - Only pay for storage used, branches are cheap
✅ **Fast** - Instant branch creation

## Vercel Integration

Vercel will automatically:
- Use Preview `DATABASE_URL` for preview deployments
- Use Production `DATABASE_URL` for production deployments
- Run migrations via `vercel-build` script

## Quick Setup Checklist

- [ ] Create Neon account
- [ ] Create main project (production database)
- [ ] Create preview branch
- [ ] Add Production `DATABASE_URL` to Vercel
- [ ] Add Preview `DATABASE_URL` to Vercel  
- [ ] Add Development `DATABASE_URL` to local `.env`
- [ ] Run `npx prisma generate`
- [ ] Run `npx prisma migrate dev` on main branch
- [ ] Test preview deployments

## Storage Considerations

With Neon's 3GB free tier:
- **Production**: Use main branch (your real data)
- **Preview**: Use preview branch (test data, can be smaller)
- **Development**: Can share preview branch or use separate dev branch

Each branch shares the same storage pool, so you're not duplicating storage costs!

## Troubleshooting

**Preview deployments failing:**
- Check that Preview `DATABASE_URL` is set in Vercel
- Verify the branch exists in Neon
- Run migrations on preview branch

**Connection errors:**
- Make sure `sslmode=require` is in connection string
- Check that IP allowlist allows Vercel IPs (usually auto-allowed)
- Verify credentials are correct

