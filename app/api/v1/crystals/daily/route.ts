import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../../lib/prisma'

/**
 * API v1: Daily Crystal
 * Returns a deterministic crystal based on date, optionally seeded by moon phase
 * Public endpoint - no auth required
 *
 * Query params:
 * - date: ISO date string (defaults to today)
 * - userId: Optional user ID for personalized selection
 * - moonPhase: Optional moon phase to filter by (new, waxing-crescent, first-quarter, waxing-gibbous, full, waning-gibbous, last-quarter, waning-crescent)
 */
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const dateStr = searchParams.get('date') || new Date().toISOString().split('T')[0]
    const userId = searchParams.get('userId')
    const moonPhase = searchParams.get('moonPhase')

    // Fetch all crystals (or filter by moon phase if provided)
    const where: any = {}

    // If moon phase is provided, we could add filtering here
    // For now, fetch all crystals and seed deterministically

    const crystals = await prisma().crystal.findMany({
      where,
      select: {
        id: true,
        name: true,
        bio: true,
        description: true,
        chakra: true,
        colour: true,
        intention: true,
        hardness: true,
        luster: true,
        otherNames: true,
        origin: true,
        crystalInfo: {
          select: {
            id: true,
            name: true,
            info: true,
            colour: true,
            chakra: true,
          },
        },
        image: {
          select: {
            id: true,
            blobUrl: true,
            blobUrlProcessed: true,
          },
        },
      },
      orderBy: { id: 'asc' }, // Consistent ordering for seeding
    })

    if (crystals.length === 0) {
      return NextResponse.json(
        { error: 'No crystals available' },
        { status: 404 }
      )
    }

    // Deterministic seeding: use date and optionally userId
    const date = new Date(dateStr)
    const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000)

    let seed: number
    if (userId) {
      // Personalized: combine day of year with user ID hash
      const userHash = userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
      seed = dayOfYear + userHash
    } else {
      // Generic: same for all users on this day
      seed = dayOfYear
    }

    const crystalIndex = Math.abs(seed) % crystals.length
    const crystal = crystals[crystalIndex]

    // Transform to match iOS app expectations
    const response = {
      crystal: {
        id: crystal.id.toString(),
        name: crystal.name,
        alternativeNames: crystal.otherNames ? [crystal.otherNames] : [],
        properties: [], // Could be derived from crystalInfo.name or chakra
        categories: crystal.chakra || [],
        chakras: crystal.chakra || [],
        elements: [], // Not directly available in schema
        zodiacSigns: [], // Not directly available in schema
        sunSigns: [],
        moonSigns: [],
        moonPhases: ['All Moon Phases'], // Could be enhanced with actual moon phase matching
        planets: [],
        intentions: crystal.intention || [],
        colors: crystal.colour || [],
        hardness: crystal.hardness || null,
        origin: crystal.origin ? [crystal.origin] : [],
        rarity: 'common', // Not in schema, default to common
        description: crystal.bio || crystal.crystalInfo?.info || '',
        metaphysicalProperties: crystal.crystalInfo?.info || '',
        physicalProperties: null,
        historicalUse: null,
        ogColor: crystal.colour?.[0] || '#9333EA', // Use first colour or purple default
        primaryChakra: crystal.chakra?.[0] || null,
        keywords: [],
        workingWith: {
          meditation: crystal.crystalInfo?.info || '',
          spellwork: '',
          healing: '',
          manifestation: '',
        },
        careInstructions: {
          cleansing: [],
          charging: [],
          programming: '',
        },
        combinations: {
          enhances: [],
          complements: [],
          avoid: [],
        },
        correspondences: {
          herbs: [],
          incense: [],
          oils: [],
          numbers: [],
          tarot: [],
        },
        // Add image URL if available
        imageUrl: crystal.image?.[0]?.blobUrl || null,
      },
      seededDate: dateStr,
      userId: userId || null,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('API daily crystal error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch daily crystal' },
      { status: 500 }
    )
  }
}
