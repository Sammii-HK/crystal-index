import Replicate from 'replicate'
import { prisma } from './prisma'

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
})

export interface IdentificationResult {
  crystal: string
  confidence: number
}

export interface TopMatches {
  crystal: string
  confidence: number
}[]

/**
 * Get list of crystal names from database for classification
 */
async function getCrystalNames(): Promise<string[]> {
  try {
    const crystals = await prisma().crystal.findMany({
      select: { name: true },
      distinct: ['name'],
    })
    return crystals.map(c => c.name)
  } catch (error) {
    console.error('Error fetching crystal names:', error)
    // Fallback to common crystals
    return [
      'Amethyst', 'Rose Quartz', 'Clear Quartz', 'Citrine', 'Jade',
      'Obsidian', 'Tiger Eye', 'Lapis Lazuli', 'Turquoise', 'Quartz',
      'Agate', 'Carnelian', 'Moonstone', 'Sunstone', 'Labradorite',
      'Malachite', 'Hematite', 'Pyrite', 'Fluorite', 'Selenite',
    ]
  }
}

/**
 * Identify crystal from image using Replicate CLIP model
 * Uses CLIP Interrogator to get description, then matches against crystal names
 */
export async function identifyCrystal(
  imageUrl: string
): Promise<{ topMatches: TopMatches; confidence: number }> {
  try {
    // Get crystal names from database
    const crystalNames = await getCrystalNames()
    
    // Use CLIP Interrogator to get a detailed description of the image
    const description = await replicate.run(
      'pharmapsychotic/clip-interrogator:a4a8daf8758e1717b5415e5d5e7cdf015515201893366fd01549d8b9924e9ef5',
      {
        input: {
          image: imageUrl,
          mode: 'fast', // 'fast' for speed, 'classic' for better quality
          clip_model_name: 'ViT-L-14/openai',
        },
      }
    ) as string

    console.log('CLIP description:', description)

    // Match description against crystal names
    const descLower = description.toLowerCase()
    
    // Score each crystal based on description match
    const matches = crystalNames.map(crystalName => {
      const nameLower = crystalName.toLowerCase()
      let confidence = 0.1 // Base confidence
      
      // Exact name match in description
      if (descLower.includes(nameLower)) {
        confidence = 0.9
      }
      // Partial match (e.g., "rose quartz" contains "quartz")
      else {
        const nameWords = nameLower.split(/\s+/)
        const matchedWords = nameWords.filter(word => 
          word.length > 3 && descLower.includes(word)
        )
        if (matchedWords.length > 0) {
          confidence = 0.5 + (matchedWords.length / nameWords.length) * 0.3
        }
      }
      
      // Boost confidence for common crystal-related keywords
      const crystalKeywords = ['crystal', 'stone', 'mineral', 'gem', 'quartz', 'amethyst', 'jade']
      const hasKeywords = crystalKeywords.some(keyword => descLower.includes(keyword))
      if (hasKeywords && confidence < 0.5) {
        confidence = Math.min(0.5, confidence + 0.2)
      }

      return {
        crystal: crystalName,
        confidence: Math.min(1, confidence),
      }
    })

    // Sort by confidence and get top 5
    const topMatches = matches
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 5)
      .map(match => ({
        crystal: match.crystal,
        confidence: match.confidence,
      }))

    // Normalize confidence scores (make top match more confident if it's clearly best)
    if (topMatches.length > 0 && topMatches[0].confidence > 0.7) {
      topMatches[0].confidence = Math.min(0.95, topMatches[0].confidence + 0.1)
    }

    return {
      topMatches: topMatches as TopMatches,
      confidence: topMatches[0]?.confidence || 0,
    }
  } catch (error) {
    console.error('Replicate identification error:', error)
    throw new Error(`Failed to identify crystal: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/**
 * Remove background from image using Replicate rembg model
 */
export async function removeBackground(imageUrl: string): Promise<string> {
  try {
    const output = await replicate.run(
      'cjwbw/rembg:fb8af171cfa1616ddcf1242c093f9c46bcada5ad4cf6f2fbe8b81b330ec5c003f',
      {
        input: {
          image: imageUrl,
        },
      }
    )

    // Return the processed image URL
    return output as string
  } catch (error) {
    console.error('Background removal error:', error)
    throw new Error('Failed to remove background')
  }
}

export default replicate



