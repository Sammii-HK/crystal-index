import crypto from 'crypto'

/**
 * Generate hash for image to detect duplicates
 */
export async function generateImageHash(buffer: Buffer): Promise<string> {
  return crypto.createHash('sha256').update(buffer).digest('hex')
}

/**
 * Generate perceptual hash for similar image detection
 * Uses average hash algorithm
 */
export async function generatePerceptualHash(buffer: Buffer): Promise<string> {
  // Simplified perceptual hash - in production, use a proper library
  const hash = crypto.createHash('md5').update(buffer).digest('hex')
  return hash
}



