import { NextRequest, NextResponse } from 'next/server'
import { getSessionApp } from '../../../lib/session-app'
import { prisma } from '../../../lib/prisma'
import { checkIdentificationRateLimit } from '../../../lib/rateLimit'
import { identifyCrystal } from '../../../lib/replicate'
import { uploadImageToBlob, blobExists } from '../../../lib/blob'
import { generateImageHash } from '../../../lib/imageHash'
import { processBackgroundRemoval } from '../../../lib/backgroundRemoval'
import { getPostHogServer } from '../../../lib/posthog'

// Note: Using Node.js runtime for Prisma compatibility
// Image processing can be optimized separately

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

    // Get user from database
    const user = await prisma().user.findUnique({
      where: { id: session.userId },
      select: { id: true, plan: true, credits: true },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Check rate limit
    const rateLimit = await checkIdentificationRateLimit(user.id, user.plan)
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          resetAt: rateLimit.resetAt,
          remaining: rateLimit.remaining,
        },
        { status: 429 }
      )
    }

    // Parse form data
    const formData = await req.formData()
    const file = formData.get('image') as File
    const removeBackground = formData.get('removeBackground') === 'true'

    if (!file) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      )
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Generate image hash for duplicate detection
    const imageHash = await generateImageHash(buffer)

    // Check if we've seen this image before (edge caching)
    // TODO: Implement cache lookup

    // Compress and upload image to Vercel Blob
    const { url: imageUrl } = await uploadImageToBlob(
      buffer,
      file.name,
      { compress: true, maxWidth: 1920 }
    )

    // Process background removal if requested
    let processedImageUrl: string | null = null
    if (removeBackground) {
      try {
        processedImageUrl = await processBackgroundRemoval(imageUrl, file.name)
      } catch (error) {
        console.error('Background removal failed:', error)
        // Continue without background removal
      }
    }

    // Identify crystal using Replicate
    const identificationResult = await identifyCrystal(
      processedImageUrl || imageUrl
    )

    // Store identification result
    const identification = await prisma().identification.create({
      data: {
        userId: user.id,
        imageUrl,
        processedImageUrl,
        guess: identificationResult.topMatches[0]?.crystal || 'Unknown',
        confidence: identificationResult.confidence,
        topMatches: identificationResult.topMatches as any,
      },
    })

    // Deduct credit if on credit-based plan
    if (user.plan === 'FREE' && user.credits > 0) {
      await prisma().user.update({
        where: { id: user.id },
        data: { credits: { decrement: 1 } },
      })
    }

    // Track in PostHog
    const posthog = getPostHogServer()
    if (posthog) {
      posthog.capture({
        distinctId: user.id,
        event: 'crystal_identified',
        properties: {
          confidence: identificationResult.confidence,
          crystal: identificationResult.topMatches[0]?.crystal,
          plan: user.plan,
          backgroundRemoved: !!processedImageUrl,
        },
      })
    }

    // Return results (watermark free tier results in frontend)
    return NextResponse.json({
      id: identification.id,
      topMatches: identificationResult.topMatches,
      confidence: identificationResult.confidence,
      imageUrl,
      processedImageUrl,
      watermarked: user.plan === 'FREE',
      remaining: rateLimit.remaining,
    })
  } catch (error) {
    console.error('Identification error:', error)
    return NextResponse.json(
      { error: 'Failed to identify crystal', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

