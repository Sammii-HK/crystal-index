import { NextRequest, NextResponse } from 'next/server'
import { getSessionApp } from '../../../../lib/session-app'
import { prisma } from '../../../../lib/prisma'

export async function PUT(
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

    const body = await req.json()
    const { customName, photos, notes, tags } = body

    // Verify ownership
    const existing = await prisma().userCrystal.findUnique({
      where: { id: params.id },
    })

    if (!existing || existing.userId !== session.userId) {
      return NextResponse.json(
        { error: 'Not found or unauthorized' },
        { status: 404 }
      )
    }

    const collection = await prisma().userCrystal.update({
      where: { id: params.id },
      data: {
        customName,
        photos,
        notes,
        tags,
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
    console.error('Collection update error:', error)
    return NextResponse.json(
      { error: 'Failed to update collection item' },
      { status: 500 }
    )
  }
}

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

    // Verify ownership
    const existing = await prisma().userCrystal.findUnique({
      where: { id: params.id },
    })

    if (!existing || existing.userId !== session.userId) {
      return NextResponse.json(
        { error: 'Not found or unauthorized' },
        { status: 404 }
      )
    }

    await prisma().userCrystal.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Collection delete error:', error)
    return NextResponse.json(
      { error: 'Failed to delete collection item' },
      { status: 500 }
    )
  }
}



