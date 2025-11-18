import { NextRequest, NextResponse } from 'next/server'
import { getSessionApp } from '../../../../lib/session-app'
import { prisma } from '../../../../lib/prisma'
import { checkIdentificationRateLimit } from '../../../../lib/rateLimit'

export async function GET(req: NextRequest) {
  try {
    const session = await getSessionApp()
    if (!session?.userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const user = await prisma().user.findUnique({
      where: { id: session.userId },
      select: { plan: true },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const rateLimit = await checkIdentificationRateLimit(session.userId, user.plan as any)

    return NextResponse.json({
      remaining: rateLimit.remaining,
      limit: rateLimit.limit,
      resetAt: rateLimit.resetAt.toISOString(),
    })
  } catch (error) {
    console.error('Rate limit fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch rate limit' },
      { status: 500 }
    )
  }
}

