# Database Optimization Guide

With only **0.5GB storage limit**, we need to keep the database lean. Here's how:

## Current Strategy ✅

**We're NOT storing images in the database** - they go to Vercel Blob. This is correct!

## Database Optimization Best Practices

### 1. Schema Optimizations

**Use appropriate data types:**
- ✅ `String` for IDs (cuid) - efficient
- ✅ `Int` for IDs where possible (smaller than String)
- ✅ `Json` for flexible data (topMatches) - good choice
- ✅ `String[]` for arrays - efficient
- ✅ `DateTime` - efficient timestamp storage

**Avoid:**
- ❌ `Bytes` for images (we're using Blob URLs instead ✅)
- ❌ Large text fields without limits
- ❌ Storing redundant data

### 2. Index Strategy

**Current indexes are good:**
- User lookups: `@@index([userId])`
- Date queries: `@@index([createdAt])`
- Relations: `@@index([crystalId])`

**Don't over-index** - each index takes space. Only index what you query frequently.

### 3. Data Lifecycle Management

**Automatic cleanup:**
- Rate limits: Auto-delete after expiry (already in schema)
- Old identifications: Archive after 90 days
- Unused data: Regular cleanup scripts

**Archive strategy:**
- Keep recent data in main tables
- Move old data to archive tables or delete
- Use soft deletes (mark as deleted) vs hard deletes when possible

### 4. JSON Storage Optimization

**Current usage:**
- `topMatches` in Identification - stores array of matches
- This is efficient - JSON is compressed

**Best practices:**
- Keep JSON payloads small (< 10KB per record)
- Don't store full image data in JSON
- Use arrays for simple lists, objects for structured data

### 5. Text Field Optimization

**Current text fields:**
- `notes` in UserCrystal - `@db.Text` ✅
- `content` in BlogPost - `@db.Text` ✅
- `info` in CrystalInfo - `String` (should be fine)

**Guidelines:**
- Use `@db.Text` for potentially long content
- Consider max length limits for user input
- Store large content in Blob/object storage if > 10KB

### 6. Array Storage

**Current arrays:**
- `photos` in UserCrystal - stores URLs ✅
- `tags` in BlogPost - efficient ✅
- `colour`, `chakra`, `intention` - efficient ✅

**Best practices:**
- Arrays are efficient for small lists (< 100 items)
- Store URLs/references, not full data
- Consider separate relation table if arrays get very large

## Monitoring & Maintenance

### Regular Checks

1. **Monitor table sizes:**
   ```sql
   SELECT 
     schemaname,
     tablename,
     pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
   FROM pg_tables
   WHERE schemaname = 'public'
   ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
   ```

2. **Check for large records:**
   - Blog posts with huge content
   - UserCrystal notes that are very long
   - JSON fields with large payloads

3. **Clean up regularly:**
   - Old rate limits (auto-expire)
   - Unused identifications
   - Test/development data

## Estimated Storage Per Record

**Small records (< 1KB):**
- User: ~500 bytes
- RateLimit: ~200 bytes
- ApiKey: ~300 bytes

**Medium records (1-5KB):**
- Crystal: ~2KB
- Identification: ~3KB (with JSON)
- UserCrystal: ~2KB
- Location: ~500 bytes

**Large records (5-50KB):**
- BlogPost: ~10-50KB (content can be large)
- CrystalInfo: ~5KB

**With 0.5GB (500MB = 512,000KB):**
- Can store ~50,000-100,000 small records
- Can store ~10,000-50,000 medium records  
- Can store ~1,000-10,000 large records

**Your current usage (0.32GB):**
- You have ~180MB free
- Room for significant growth if optimized

## Key Takeaways

✅ **Good practices we're following:**
- Images in Vercel Blob (not database)
- Efficient data types
- Proper indexing
- JSON for flexible data

✅ **Keep doing:**
- Regular cleanup of old data
- Monitor storage usage
- Archive old records when needed
- Use external storage for large files

✅ **Future considerations:**
- If blog posts get very large, consider storing content in Vercel Blob
- Archive old identifications after 1 year
- Consider separate archive database if needed

## Quick Commands

```bash
# Analyze current usage
pnpm db:analyze

# Clean up old data
pnpm db:cleanup

# Check specific table sizes (run in Prisma Studio or SQL)
```

Your database structure is already well-optimized! The 0.5GB limit should be sufficient for metadata and structured data, especially since images are stored externally.
