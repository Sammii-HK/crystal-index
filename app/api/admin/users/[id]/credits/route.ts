import { NextRequest, NextResponse } from 'next/server'
import { getSessionApp } from '../../../../../../lib/session-app'
import { prisma } from '../../../../../../lib/prisma'

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSessionApp()
    if (!session?.userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user is admin
    const admin = await prisma().user.findUnique({
      where: { id: session.userId },
      select: { role: true },
    })

    if (admin?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }

    const body = await req.json()
    const { credits } = body

    if (typeof credits !== 'number' || credits < 0) {
      return NextResponse.json(
        { error: 'Invalid credits value' },
        { status: 400 }
      )
    }

    await prisma().user.update({
      where: { id: params.id },
      data: { credits },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('User credits update error:', error)
    return NextResponse.json(
      { error: 'Failed to update user credits' },
      { status: 500 }
    )
  }
}

