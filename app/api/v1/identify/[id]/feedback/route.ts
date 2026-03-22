import { NextRequest, NextResponse } from 'next/server'
import { getSessionApp } from '../../../../../../lib/session-app'
import { verifyApiKey } from '../../../../../../lib/api-auth'
import { prisma } from '../../../../../../lib/prisma'
import { generateClipEmbedding, storeConfirmedEmbedding } from '../../../../../../lib/clip-embedding'

/**
 * POST /api/v1/identify/:id/feedback
 * Body: { correct: boolean, crystalName?: string }
 *
 * Tells the learning DB whether the identification was right.
 * On correction, stores a CLIP embedding so similar images get a better hint next time.
 */
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Auth: API key or session
    let userId: string | null = null
    const apiKeyUserId = await verifyApiKey(req)
    if (apiKeyUserId) {
      userId = apiKeyUserId
    } else {
      const session = await getSessionApp()
      userId = session?.userId ?? null
    }

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = params
    const body = await req.json()
    const { correct, crystalName } = body as { correct: boolean; crystalName?: string }

    if (typeof correct !== 'boolean') {
      return NextResponse.json({ error: '"correct" (boolean) is required' }, { status: 400 })
    }

    // Fetch the identification — must belong to this user
    const identification = await prisma().identification.findUnique({
      where: { id },
    })

    if (!identification) {
      return NextResponse.json({ error: 'Identification not found' }, { status: 404 })
    }

    if (identification.userId !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Determine the confirmed crystal name
    const confirmedCrystal = correct
      ? identification.guess
      : (crystalName ?? null)

    // Update identification record
    await prisma().identification.update({
      where: { id },
      data: {
        userConfirmed: correct,
        confirmedLabel: confirmedCrystal,
        correctedCrystal: correct ? null : (crystalName ?? null),
        feedback: correct ? 'correct' : 'wrong',
      },
    })

    // Store CLIP embedding in the background (best-effort, non-blocking)
    if (confirmedCrystal && identification.imageHash && identification.imageUrl) {
      void (async () => {
        try {
          const embedding = await generateClipEmbedding(identification.imageUrl)
          if (embedding) {
            await storeConfirmedEmbedding(
              identification.imageHash!,
              confirmedCrystal,
              embedding
            )
          }
        } catch (err) {
          console.error('Learning DB update failed (non-fatal):', err)
        }
      })()
    }

    return NextResponse.json({
      success: true,
      userConfirmed: correct,
      confirmedLabel: confirmedCrystal,
    })
  } catch (error) {
    console.error('Feedback endpoint error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
