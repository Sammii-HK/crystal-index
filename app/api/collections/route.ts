import { NextRequest, NextResponse } from 'next/server'
import { getSessionApp } from '../../../lib/session-app'
import { prisma } from '../../../lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const session = await getSessionApp()
    if (!session?.userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const collections = await prisma().userCrystal.findMany({
      where: { userId: session.userId },
      include: {
        crystal: {
          include: {
            crystalInfo: true,
            image: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ collections })
  } catch (error) {
    console.error('Collections fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch collections' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSessionApp()
    if (!session?.userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { crystalId, customName, photos, notes, tags } = body

    const collection = await prisma().userCrystal.create({
      data: {
        userId: session.userId,
        crystalId: crystalId || null,
        customName,
        photos: photos || [],
        notes,
        tags: tags || [],
      },
      include: {
        crystal: {
          include: {
            crystalInfo: true,
          },
        },
      },
    })

    return NextResponse.json({ collection })
  } catch (error) {
    console.error('Collection create error:', error)
    return NextResponse.json(
      { error: 'Failed to create collection item' },
      { status: 500 }
    )
  }
}



