import { NextRequest, NextResponse } from 'next/server'
import { getSessionApp } from '../../../../lib/session-app'
import { prisma } from '../../../../lib/prisma'

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
      select: {
        plan: true,
        credits: true,
        subscriptionStatus: true,
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      plan: user.plan,
      credits: user.credits,
      subscriptionStatus: user.subscriptionStatus,
    })
  } catch (error) {
    console.error('User plan fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user plan' },
      { status: 500 }
    )
  }
}

