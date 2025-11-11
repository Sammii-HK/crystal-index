import { prisma } from './prisma'

export interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetAt: Date
}

/**
 * Check rate limit for a user action
 */
export async function checkRateLimit(
  userId: string,
  action: string,
  limit: number,
  windowMinutes: number
): Promise<RateLimitResult> {
  const now = new Date()
  const resetAt = new Date(now.getTime() + windowMinutes * 60 * 1000)

  // Clean up old rate limit records
  await prisma().rateLimit.deleteMany({
    where: {
      resetAt: {
        lt: now,
      },
    },
  })

  // Get current count for this window
  const currentWindow = await prisma().rateLimit.findMany({
    where: {
      userId,
      action,
      resetAt: {
        gte: now,
      },
    },
  })

  const count = currentWindow.reduce((sum, rl) => sum + rl.count, 0)

  if (count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: currentWindow[0]?.resetAt || resetAt,
    }
  }

  // Record this attempt
  await prisma().rateLimit.create({
    data: {
      userId,
      identifier: userId,
      action,
      count: 1,
      resetAt,
    },
  })

  return {
    allowed: true,
    remaining: limit - count - 1,
    resetAt,
  }
}

/**
 * Check identification rate limit based on user plan
 */
export async function checkIdentificationRateLimit(
  userId: string,
  userPlan: string
): Promise<RateLimitResult> {
  // Free tier: 3 per month
  if (userPlan === 'FREE') {
    return checkRateLimit(userId, 'identification', 3, 30 * 24 * 60) // 30 days
  }

  // Pro and above: unlimited (but still check cooldown)
  // Check 1-minute cooldown for free users, no cooldown for paid
  if (userPlan === 'FREE') {
    const cooldown = await checkRateLimit(userId, 'identification_cooldown', 1, 1)
    if (!cooldown.allowed) {
      return {
        allowed: false,
        remaining: 0,
        resetAt: cooldown.resetAt,
      }
    }
  }

  return {
    allowed: true,
    remaining: Infinity,
    resetAt: new Date(),
  }
}



