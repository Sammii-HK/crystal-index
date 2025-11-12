import { prisma } from '../lib/prisma'

/**
 * Remove binary image data after migration to Vercel Blob
 * WARNING: Only run this after verifying all images are accessible via blobUrl
 */
async function removeBinaryImages() {
  console.log('🗑️  Removing binary image data...\n')
  console.log('⚠️  WARNING: This will permanently delete binary data from database')
  console.log('   Make sure all images have been migrated to Vercel Blob first!\n')

  // Get count of images with both binary and blobUrl
  const imagesWithBoth = await prisma().image.count({
    where: {
      file: { not: null },
      blobUrl: { not: null },
    },
  })

  console.log(`Found ${imagesWithBoth} images with both binary and blobUrl`)
  
  if (imagesWithBoth === 0) {
    console.log('✅ No images to clean up!')
    return
  }

  // Update all images to remove binary data (set to null)
  const result = await prisma().image.updateMany({
    where: {
      file: { not: null },
      blobUrl: { not: null },
    },
    data: {
      file: null,
    },
  })

  console.log(`\n✅ Removed binary data from ${result.count} images`)
  console.log(`   Images are now stored only in Vercel Blob`)
  console.log(`   This should free up significant database space!`)
}

// Uncomment to run:
// removeBinaryImages()
//   .catch(console.error)
//   .finally(() => prisma().$disconnect())

console.log('⚠️  Script is commented out for safety.')
console.log('   Uncomment the function call at the bottom to run this cleanup.')

