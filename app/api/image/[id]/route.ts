import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

// NOT edge: Prisma cannot run on the Edge runtime, so this handler threw
// "PrismaClient is not configured to run in Edge Runtime" on every request —
// 758 failures across 13 users between 1 Jul and 1 Oct 2026. That is every
// crystal photo in the paid iOS app, which resolves images through this route.
export const runtime = 'nodejs'

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
      // Immutable per-id mapping, so let the CDN hold the redirect instead of
      // querying the database once per image view.
      return NextResponse.redirect(image.blobUrl, {
        headers: { 'Cache-Control': 'public, s-maxage=31536000, max-age=86400, immutable' },
      })
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

