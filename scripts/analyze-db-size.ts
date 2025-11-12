import { prisma } from '../lib/prisma'

/**
 * Analyze database storage usage
 */
async function analyzeDatabaseSize() {
  console.log('📊 Analyzing database storage...\n')

  // Count records per table
  const counts = {
    users: await prisma().user.count(),
    crystals: await prisma().crystal.count(),
    images: await prisma().image.count(),
    locations: await prisma().location.count(),
    crystalInfos: await prisma().crystalInfo.count(),
    identifications: await prisma().identification.count(),
    userCrystals: await prisma().userCrystal.count(),
    blogPosts: await prisma().blogPost.count(),
    rateLimits: await prisma().rateLimit.count(),
    apiKeys: await prisma().apiKey.count(),
  }

  console.log('Record counts:')
  Object.entries(counts).forEach(([table, count]) => {
    console.log(`  ${table}: ${count.toLocaleString()}`)
  })

  // Check images with binary data
  const imagesWithBinary = await prisma().image.count({
    where: {
      file: { not: null },
    },
  })

  const imagesWithBlob = await prisma().image.count({
    where: {
      blobUrl: { not: null },
    },
  })

  console.log(`\n📸 Image storage:`)
  console.log(`  Images with binary data: ${imagesWithBinary}`)
  console.log(`  Images with Blob URLs: ${imagesWithBlob}`)
  console.log(`  Images needing migration: ${imagesWithBinary - imagesWithBlob}`)

  // Estimate binary image sizes (rough)
  if (imagesWithBinary > 0) {
    console.log(`\n⚠️  Binary images are likely taking up significant space`)
    console.log(`   Average image size: ~500KB-2MB`)
    console.log(`   Estimated storage: ${(imagesWithBinary * 1).toFixed(1)}MB - ${(imagesWithBinary * 2).toFixed(1)}MB`)
  }

  // Check for old/unused data
  const oldRateLimits = await prisma().rateLimit.count({
    where: {
      resetAt: {
        lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Older than 30 days
      },
    },
  })

  console.log(`\n🗑️  Cleanup opportunities:`)
  console.log(`  Old rate limit records (>30 days): ${oldRateLimits}`)

  // Check for duplicate/unused identifications
  const identificationsWithoutCrystal = await prisma().identification.count({
    where: {
      crystalId: null,
    },
  })

  console.log(`  Identifications without crystal link: ${identificationsWithoutCrystal}`)

  console.log(`\n💡 Recommendations:`)
  console.log(`  1. Migrate images to Vercel Blob (will free up most space)`)
  console.log(`  2. Clean up old rate limit records`)
  console.log(`  3. Archive old identifications`)
  console.log(`  4. Consider archiving old blog posts if not needed`)
}

analyzeDatabaseSize()
  .catch(console.error)
  .finally(() => prisma().$disconnect())

