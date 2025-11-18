import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

/**
 * API v1: List Crystals
 * Public endpoint - no auth required
 */
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')
    const chakra = searchParams.get('chakra')
    const colour = searchParams.get('colour')

    const where: any = {}
    if (chakra) {
      where.chakra = { has: chakra }
    }
    if (colour) {
      where.colour = { has: colour }
    }

    const [crystals, total] = await Promise.all([
      prisma().crystal.findMany({
        where,
        take: Math.min(limit, 100), // Max 100 per request
        skip: offset,
        select: {
          id: true,
          name: true,
          chakra: true,
          colour: true,
          crystalInfo: {
            select: {
              info: true,
              colour: true,
              chakra: true,
            },
          },
          image: {
            take: 1,
            select: {
              blobUrl: true,
            },
          },
        },
        orderBy: { name: 'asc' },
      }),
      prisma().crystal.count({ where }),
    ])

    return NextResponse.json({
      crystals,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    })
  } catch (error) {
    console.error('API crystals list error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch crystals' },
      { status: 500 }
    )
  }
}

