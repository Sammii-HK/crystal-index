import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../../lib/prisma'

/**
 * API v1: Get Crystal Details
 * Public endpoint - no auth required
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const crystalId = parseInt(params.id)

    if (isNaN(crystalId)) {
      return NextResponse.json(
        { error: 'Invalid crystal ID' },
        { status: 400 }
      )
    }

    const crystal = await prisma().crystal.findUnique({
      where: { id: crystalId },
      include: {
        crystalInfo: true,
        image: {
          select: {
            id: true,
            blobUrl: true,
            blobUrlProcessed: true,
          },
        },
      },
    })

    if (!crystal) {
      return NextResponse.json(
        { error: 'Crystal not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ crystal })
  } catch (error) {
    console.error('API crystal fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch crystal' },
      { status: 500 }
    )
  }
}

