import { NextRequest } from 'next/server'
import { prisma } from './prisma'
import crypto from 'crypto'

/**
 * Verify API key from Authorization header
 * Returns userId if valid, null otherwise
 */
export async function verifyApiKey(req: NextRequest): Promise<string | null> {
  const authHeader = req.headers.get('authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }

  const apiKey = authHeader.substring(7) // Remove 'Bearer ' prefix
  
  // Hash the provided key
  const keyHash = crypto.createHash('sha256').update(apiKey).digest('hex')
  
  // Find API key in database
  const apiKeyRecord = await prisma().apiKey.findUnique({
    where: { keyHash },
    include: {
      user: {
        select: {
          id: true,
          plan: true,
        },
      },
    },
  })

  if (!apiKeyRecord) {
    return null
  }

  // Check if user has RETAIL plan
  if (apiKeyRecord.user.plan !== 'RETAIL') {
    return null
  }

  // Update last used timestamp
  await prisma().apiKey.update({
    where: { id: apiKeyRecord.id },
    data: { lastUsedAt: new Date() },
  })

  return apiKeyRecord.userId
}

/**
 * Generate a new API key
 * Returns the plaintext key (only shown once!)
 */
export function generateApiKey(): string {
  // Generate a secure random key
  const key = crypto.randomBytes(32).toString('hex')
  return `ci_${key}`
}

/**
 * Hash an API key for storage
 */
export function hashApiKey(key: string): string {
  return crypto.createHash('sha256').update(key).digest('hex')
}

