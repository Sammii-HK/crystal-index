import { NextRequest, NextResponse } from 'next/server'
import { getSessionApp } from '../../../../lib/session-app'
import { prisma } from '../../../../lib/prisma'

// Delete an API key
export async function DELETE(
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

    // Verify the API key belongs to the user
    const apiKey = await prisma().apiKey.findUnique({
      where: { id: params.id },
      select: { userId: true },
    })

    if (!apiKey || apiKey.userId !== session.userId) {
      return NextResponse.json(
        { error: 'API key not found' },
        { status: 404 }
      )
    }

    await prisma().apiKey.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('API key deletion error:', error)
    return NextResponse.json(
      { error: 'Failed to delete API key' },
      { status: 500 }
    )
  }
}

