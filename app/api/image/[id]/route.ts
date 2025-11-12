import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export const runtime = 'edge'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const image = await prisma().image.findUnique({
      where: { id: parseInt(params.id) },
    })

    if (!image) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      )
    }

    // If blobUrl exists, redirect to it (better performance)
    if (image.blobUrl) {
      return NextResponse.redirect(image.blobUrl)
    }

    // Fallback to binary storage (backward compatibility)
    if (image.file) {
      return new NextResponse(image.file, {
        headers: {
          'Content-Type': image.type,
          'Content-Disposition': 'inline',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      })
    }

    return NextResponse.json(
      { error: 'Image data not found' },
      { status: 404 }
    )
  } catch (error) {
    console.error('Image fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch image' },
      { status: 500 }
    )
  }
}

