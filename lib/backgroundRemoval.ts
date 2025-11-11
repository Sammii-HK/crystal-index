import { removeBackground as replicateRemoveBackground } from './replicate'
import { uploadImageToBlob } from './blob'

/**
 * Remove background from image and upload processed version
 */
export async function processBackgroundRemoval(
  imageUrl: string,
  originalFilename: string
): Promise<string> {
  try {
    // Remove background using Replicate
    const processedImageUrl = await replicateRemoveBackground(imageUrl)

    // Upload processed image to Vercel Blob
    const response = await fetch(processedImageUrl)
    const buffer = Buffer.from(await response.arrayBuffer())

    const { url } = await uploadImageToBlob(
      buffer,
      `processed_${originalFilename}`,
      { compress: true }
    )

    return url
  } catch (error) {
    console.error('Background removal processing error:', error)
    throw error
  }
}



