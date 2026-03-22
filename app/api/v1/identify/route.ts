import { NextRequest, NextResponse } from 'next/server'
import { getSessionApp } from '../../../../lib/session-app'
import { verifyApiKey } from '../../../../lib/api-auth'
import { prisma } from '../../../../lib/prisma'
import { checkIdentificationRateLimit } from '../../../../lib/rateLimit'
import { identifyCrystalWithVision } from '../../../../lib/openai-identify'
import { uploadImageToBlob } from '../../../../lib/blob'
import { generateImageHash } from '../../../../lib/imageHash'
import { processBackgroundRemoval } from '../../../../lib/backgroundRemoval'
import { generateClipEmbedding, findSimilarConfirmed } from '../../../../lib/clip-embedding'

/**
 * API v1: Identify Crystal
 * Supports both session-based and API key authentication
 */
export async function POST(req: NextRequest) {
  try {
    // Try API key auth first, then session auth
    let userId: string | null = null
    let userPlan: string = 'FREE'

    // Check for API key
    const apiKeyUserId = await verifyApiKey(req)
    if (apiKeyUserId) {
      userId = apiKeyUserId
      const user = await prisma().user.findUnique({
        where: { id: userId },
        select: { plan: true },
      })
      userPlan = user?.plan || 'FREE'
    } else {
      // Fall back to session auth
      const session = await getSessionApp()
      if (!session?.userId) {
        return NextResponse.json(
          { error: 'Unauthorized. Provide API key in Authorization header or sign in.' },
          { status: 401 }
        )
      }
      userId = session.userId
      const user = await prisma().user.findUnique({
        where: { id: userId },
        select: { plan: true },
      })
      userPlan = user?.plan || 'FREE'
    }

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check rate limit
    const rateLimit = await checkIdentificationRateLimit(userId, userPlan as any)
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          resetAt: rateLimit.resetAt,
          remaining: rateLimit.remaining,
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimit.limit.toString(),
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimit.resetAt).toISOString(),
          },
        }
      )
    }

    // Parse request body (JSON for API, FormData for web)
    const contentType = req.headers.get('content-type') || ''
    let imageData: Buffer
    let removeBackground = false

    if (contentType.includes('application/json')) {
      // API request with base64 or URL
      const body = await req.json()
      const { image, removeBackground: rb } = body

      if (!image) {
        return NextResponse.json(
          { error: 'No image provided' },
          { status: 400 }
        )
      }

      removeBackground = rb === true

      // Handle base64 or URL
      if (image.startsWith('data:image')) {
        // Base64 data URL
        const base64Data = image.split(',')[1]
        imageData = Buffer.from(base64Data, 'base64')
      } else if (image.startsWith('http')) {
        // URL - fetch the image
        const imageResponse = await fetch(image)
        const arrayBuffer = await imageResponse.arrayBuffer()
        imageData = Buffer.from(arrayBuffer)
      } else {
        return NextResponse.json(
          { error: 'Invalid image format. Provide base64 data URL or image URL.' },
          { status: 400 }
        )
      }
    } else {
      // FormData (web upload)
      const formData = await req.formData()
      const file = formData.get('image') as File
      removeBackground = formData.get('removeBackground') === 'true'

      if (!file) {
        return NextResponse.json(
          { error: 'No image provided' },
          { status: 400 }
        )
      }

      const arrayBuffer = await file.arrayBuffer()
      imageData = Buffer.from(arrayBuffer)
    }

    // Generate image hash
    const imageHash = await generateImageHash(imageData)

    // Upload to blob
    const { url: imageUrl } = await uploadImageToBlob(
      imageData,
      'crystal.jpg',
      { compress: true, maxWidth: 1920 }
    )

    // Process background removal if requested
    let processedImageUrl: string | null = null
    if (removeBackground) {
      try {
        processedImageUrl = await processBackgroundRemoval(imageUrl, 'crystal.jpg')
      } catch (error) {
        console.error('Background removal failed:', error)
        // Continue without background removal
      }
    }

    // Query learning DB for visually similar confirmed images (few-shot context)
    let fewShotExamples: Array<{ crystalName: string }> = []
    try {
      const clipEmbedding = await generateClipEmbedding(processedImageUrl || imageUrl)
      if (clipEmbedding) {
        const similar = await findSimilarConfirmed(clipEmbedding, 5)
        // Only use examples with reasonable similarity (>0.7)
        fewShotExamples = similar
          .filter(s => s.similarity > 0.7)
          .map(s => ({ crystalName: s.crystalName }))
      }
    } catch (err) {
      console.error('Learning DB lookup failed (non-fatal):', err)
    }

    // Identify crystal using Qwen3-VL-30B on DeepInfra
    const identificationResult = await identifyCrystalWithVision(
      processedImageUrl || imageUrl,
      fewShotExamples.length > 0 ? fewShotExamples : undefined
    )

    // Store identification
    const identification = await prisma().identification.create({
      data: {
        userId,
        imageUrl,
        processedImageUrl,
        imageHash,
        guess: identificationResult.topMatches[0]?.crystal || 'Unknown',
        confidence: identificationResult.confidence,
        topMatches: identificationResult.topMatches as any,
      },
    })

    // Deduct credit if on credit-based plan
    if (userPlan === 'FREE') {
      const user = await prisma().user.findUnique({
        where: { id: userId },
        select: { credits: true },
      })
      if (user && user.credits > 0) {
        await prisma().user.update({
          where: { id: userId },
          data: { credits: { decrement: 1 } },
        })
      }
    }

    // Return API response
    return NextResponse.json({
      id: identification.id,
      topMatches: identificationResult.topMatches,
      confidence: identificationResult.confidence,
      imageUrl,
      processedImageUrl,
      createdAt: identification.createdAt,
    }, {
      headers: {
        'X-RateLimit-Limit': rateLimit.limit.toString(),
        'X-RateLimit-Remaining': (rateLimit.remaining - 1).toString(),
        'X-RateLimit-Reset': new Date(rateLimit.resetAt).toISOString(),
      },
    })
  } catch (error) {
    console.error('API identification error:', error)
    return NextResponse.json(
      {
        error: 'Failed to identify crystal',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

