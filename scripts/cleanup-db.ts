import { prisma } from '../lib/prisma'

/**
 * Clean up old/unused database records to free up space
 */
async function cleanupDatabase() {
  console.log('🧹 Starting database cleanup...\n')

  // 1. Clean up old rate limit records (older than 30 days)
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  
  const deletedRateLimits = await prisma().rateLimit.deleteMany({
    where: {
      resetAt: {
        lt: thirtyDaysAgo,
      },
    },
  })

  console.log(`✅ Deleted ${deletedRateLimits.count} old rate limit records`)

  // 2. Clean up old/unused identifications (older than 90 days, no feedback)
  const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
  
  const deletedOldIdentifications = await prisma().identification.deleteMany({
    where: {
      createdAt: {
        lt: ninetyDaysAgo,
      },
      feedback: null,
      confirmedLabel: null,
    },
  })

  console.log(`✅ Deleted ${deletedOldIdentifications.count} old unused identifications`)

  // 3. Clean up images that have been migrated to Blob (keep binary for now, but mark)
  // We'll do this in a separate migration script

  console.log(`\n✨ Cleanup complete!`)
  console.log(`   Freed up space by removing old records`)
  console.log(`   Note: Image binary data cleanup should be done separately after migration`)
}

cleanupDatabase()
  .catch(console.error)
  .finally(() => prisma().$disconnect())

