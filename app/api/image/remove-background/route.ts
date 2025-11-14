import { NextRequest, NextResponse } from 'next/server'
import { getSessionApp } from '../../../../lib/session-app'
import { processBackgroundRemoval } from '../../../../lib/backgroundRemoval'

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const session = await getSessionApp()
    if (!session?.userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { imageUrl, filename } = await req.json()

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'No image URL provided' },
        { status: 400 }
      )
    }

    // Process background removal
    const processedUrl = await processBackgroundRemoval(
      imageUrl,
      filename || 'image.jpg'
    )

    return NextResponse.json({
      processedUrl,
      originalUrl: imageUrl,
    })
  } catch (error) {
    console.error('Background removal error:', error)
    return NextResponse.json(
      { error: 'Failed to remove background', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}



