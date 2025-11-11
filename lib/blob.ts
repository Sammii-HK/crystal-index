import { put, list, del, head } from '@vercel/blob'
import sharp from 'sharp'

/**
 * Upload image to Vercel Blob storage
 */
export async function uploadImageToBlob(
  file: Buffer | File,
  filename: string,
  options?: { compress?: boolean; maxWidth?: number }
): Promise<{ url: string; size: number }> {
  let buffer: Buffer

  if (file instanceof File) {
    const arrayBuffer = await file.arrayBuffer()
    buffer = Buffer.from(arrayBuffer)
  } else {
    buffer = file
  }

  // Compress and optimize image if requested
  if (options?.compress || options?.maxWidth) {
    let sharpInstance = sharp(buffer)

    if (options.maxWidth) {
      sharpInstance = sharpInstance.resize(options.maxWidth, null, {
        withoutEnlargement: true,
        fit: 'inside',
      })
    }

    buffer = await sharpInstance
      .webp({ quality: 85 })
      .toBuffer()
    filename = filename.replace(/\.[^.]+$/, '.webp')
  }

  const blob = await put(filename, buffer, {
    access: 'public',
    contentType: `image/${filename.split('.').pop()}`,
  })

  return {
    url: blob.url,
    size: blob.size,
  }
}

/**
 * Delete image from Vercel Blob storage
 */
export async function deleteImageFromBlob(url: string): Promise<void> {
  try {
    await del(url)
  } catch (error) {
    console.error('Error deleting blob:', error)
    // Don't throw - allow graceful failure
  }
}

/**
 * Check if blob exists
 */
export async function blobExists(url: string): Promise<boolean> {
  try {
    await head(url)
    return true
  } catch {
    return false
  }
}



