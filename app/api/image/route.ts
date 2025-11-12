import { NextRequest, NextResponse } from 'next/server'
import { getSessionApp } from '../../../lib/session-app'
import { uploadImageToBlob } from '../../../lib/blob'
import { prisma } from '../../../lib/prisma'
import { processBackgroundRemoval } from '../../../lib/backgroundRemoval'

export async function POST(req: NextRequest) {
  try {
    const session = await getSessionApp()
    if (!session?.userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const formData = await req.formData()
    const file = formData.get('file') as File
    const removeBackground = formData.get('removeBackground') === 'true'
    const crystalId = formData.get('crystalId') ? parseInt(formData.get('crystalId') as string) : null

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Upload to Vercel Blob
    const { url: blobUrl } = await uploadImageToBlob(
      buffer,
      file.name,
      { compress: true, maxWidth: 1920 }
    )

    // Process background removal if requested
    let blobUrlProcessed: string | null = null
    if (removeBackground) {
      try {
        blobUrlProcessed = await processBackgroundRemoval(blobUrl, file.name)
      } catch (error) {
        console.error('Background removal failed:', error)
        // Continue without background removal
      }
    }

    // Save to database
    const image = await prisma().image.create({
      data: {
        name: file.name,
        type: file.type,
        blobUrl,
        blobUrlProcessed,
        crystalId,
      },
    })

    return NextResponse.json({
      id: image.id,
      url: blobUrl,
      processedUrl: blobUrlProcessed,
    })
  } catch (error) {
    console.error('Image upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload image', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

