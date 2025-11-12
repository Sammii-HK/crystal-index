import { prisma } from '../lib/prisma'
import { uploadImageToBlob, deleteImageFromBlob } from '../lib/blob'

/**
 * Migrate images from binary storage to Vercel Blob
 * This will significantly reduce database size
 */
async function migrateImagesToBlob() {
  console.log('📦 Starting image migration to Vercel Blob...\n')

  // Get all images with binary data but no blobUrl
  const imagesToMigrate = await prisma().image.findMany({
    where: {
      file: { not: null },
      blobUrl: null,
    },
    take: 100, // Process in batches
  })

  if (imagesToMigrate.length === 0) {
    console.log('✅ No images to migrate!')
    return
  }

  console.log(`Found ${imagesToMigrate.length} images to migrate\n`)

  let migrated = 0
  let errors = 0

  for (const image of imagesToMigrate) {
    try {
      if (!image.file) continue

      // Upload to Vercel Blob
      const { url } = await uploadImageToBlob(
        Buffer.from(image.file),
        image.name,
        { compress: true, maxWidth: 1920 }
      )

      // Update database record
      await prisma().image.update({
        where: { id: image.id },
        data: {
          blobUrl: url,
          // Keep file for now as backup, can delete later
        },
      })

      migrated++
      console.log(`✅ Migrated ${image.name} (${migrated}/${imagesToMigrate.length})`)

      // Small delay to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 100))
    } catch (error) {
      errors++
      console.error(`❌ Error migrating ${image.name}:`, error)
    }
  }

  console.log(`\n✨ Migration complete!`)
  console.log(`   Migrated: ${migrated}`)
  console.log(`   Errors: ${errors}`)
  console.log(`\n💡 Next step: After verifying, run cleanup script to remove binary data`)
}

migrateImagesToBlob()
  .catch(console.error)
  .finally(() => prisma().$disconnect())

