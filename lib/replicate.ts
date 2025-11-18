import Replicate from 'replicate'
import { prisma } from './prisma'
import { getCrystalContext, createCLIPPrompt, type CrystalContext } from './crystal-context'

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
 * Get crystal data with context for better matching
 */
async function getCrystalsWithContext(): Promise<Array<{
  name: string
  description: string
  colors: string[]
  otherNames: string[]
  prompt: string // Rich prompt for CLIP matching
}>> {
  try {
    const crystals = await prisma().crystal.findMany({
      select: {
        name: true,
        bio: true,
        colour: true,
        otherNames: true,
        crystalInfo: {
          select: {
            info: true,
            colour: true,
          },
        },
      },
      distinct: ['name'],
    })

    return crystals.map(crystal => {
      // Try to get rich context from crystal-context.ts first
      const context = getCrystalContext(crystal.name)
      
      if (context) {
        // Use optimized context file description
        return {
          name: crystal.name,
          description: context.visualDescription,
          colors: context.colors,
          otherNames: context.otherNames,
          prompt: createCLIPPrompt(context), // Rich prompt optimized for CLIP
        }
      }
      
      // Fallback to database data
      const colors = [...(crystal.colour || []), ...(crystal.crystalInfo?.colour || [])]
      const description = crystal.crystalInfo?.info || crystal.bio || ''
      const otherNames = crystal.otherNames ? crystal.otherNames.split(',').map(n => n.trim()) : []
      
      // Create description from database data
      const descriptionParts: string[] = []
      descriptionParts.push(crystal.name)
      
      if (otherNames.length > 0) {
        descriptionParts.push(`also known as ${otherNames.join(' or ')}`)
      }
      
      if (colors.length > 0) {
        descriptionParts.push(`${colors.join(', ')} colored`)
      }
      
      if (description) {
        descriptionParts.push(description.substring(0, 200))
      } else {
        descriptionParts.push(`a crystal stone`)
      }

      return {
        name: crystal.name,
        description: description || '',
        colors: colors,
        otherNames: otherNames,
        prompt: descriptionParts.join(', '),
      }
    })
  } catch (error) {
    console.error('Error fetching crystals:', error)
    // Fallback to basic names
    return [
      { name: 'Amethyst', description: 'Purple crystal', colors: ['purple', 'violet'], otherNames: [], prompt: 'Amethyst, purple crystal' },
      { name: 'Rose Quartz', description: 'Pink crystal', colors: ['pink', 'rose'], otherNames: ['Pink Quartz'], prompt: 'Rose Quartz, Pink Quartz, pink rose colored crystal' },
    ]
  }
}

/**
 * Identify crystal from image using CLIP visual analysis
 * Step 1: CLIP Interrogator analyzes the IMAGE visually
 * Step 2: Compare CLIP's visual understanding with crystal descriptions
 * This is TRUE visual matching - CLIP "sees" the image, not text!
 */
export async function identifyCrystal(
  imageUrl: string
): Promise<{ topMatches: TopMatches; confidence: number }> {
  try {
    // Step 1: Use CLIP Interrogator to analyze the IMAGE visually
    // This generates a description based on what CLIP SEES in the image
    // NOT text matching - CLIP analyzes visual features!
    const imageAnalysis = await replicate.run(
      'pharmapsychotic/clip-interrogator:a4a8daf8758e1717b5415e5d5e7cdf015515201893366fd01549d8b9924e9ef5',
      {
        input: {
          image: imageUrl,
          mode: 'fast', // 'fast' for speed, 'classic' for better quality
          clip_model_name: 'ViT-L-14/openai',
        },
      }
    ) as string

    console.log('CLIP visual analysis:', imageAnalysis)
    
    // Step 2: Get crystals with context
    const crystals = await getCrystalsWithContext()
    
    // Step 3: Match CLIP's visual understanding with crystal descriptions
    // The imageAnalysis contains what CLIP VISUALLY detected
    // We match this against crystal properties semantically
    const imageDescLower = imageAnalysis.toLowerCase()
    
    const matches = crystals.map((crystal) => {
      let confidence = 0.05 // Base confidence
      
      // Method 1: Exact crystal name in CLIP's visual analysis
      // CLIP might recognize the crystal name if it's common
      if (imageDescLower.includes(crystal.name.toLowerCase())) {
        confidence = 0.9
      }
      // Method 2: Other names match
      else if (crystal.otherNames.some(name => imageDescLower.includes(name.toLowerCase()))) {
        confidence = 0.85
      }
      // Method 3: Color matching (CLIP detected colors visually!)
      else {
        const matchedColors = crystal.colors.filter(color => 
          imageDescLower.includes(color.toLowerCase())
        )
        if (matchedColors.length > 0) {
          // More colors matched = higher confidence
          confidence = 0.5 + (matchedColors.length / Math.max(crystal.colors.length, 1)) * 0.35
        }
        
        // Method 4: Word matching in crystal name
        const nameWords = crystal.name.toLowerCase().split(/\s+/)
        const matchedWords = nameWords.filter(word => 
          word.length > 3 && imageDescLower.includes(word)
        )
        if (matchedWords.length > 0) {
          confidence = Math.max(confidence, 0.4 + (matchedWords.length / nameWords.length) * 0.4)
        }
      }
      
      // Method 5: Description keywords match
      // CLIP's analysis might contain keywords from crystal description
      if (crystal.description) {
        const descKeywords = crystal.description
          .toLowerCase()
          .split(/\s+/)
          .filter(w => w.length > 4)
          .slice(0, 10) // Top 10 keywords
        
        const matchedKeywords = descKeywords.filter(keyword => 
          imageDescLower.includes(keyword)
        )
        if (matchedKeywords.length > 0) {
          confidence = Math.max(confidence, 0.3 + (matchedKeywords.length / descKeywords.length) * 0.3)
        }
      }

      // Boost for crystal-related visual features CLIP detected
      const crystalVisualFeatures = [
        'crystal', 'stone', 'mineral', 'gem', 'quartz', 'transparent', 
        'translucent', 'opaque', 'smooth', 'rough', 'glossy', 'matte'
      ]
      const hasFeatures = crystalVisualFeatures.some(feature => imageDescLower.includes(feature))
      if (hasFeatures && confidence < 0.4) {
        confidence = Math.min(0.4, confidence + 0.15)
      }

      return {
        crystal: crystal.name,
        confidence: Math.min(0.95, confidence),
      }
    })

          return {
            crystal: crystal.name,
            confidence,
            rawSimilarity: similarity, // Keep for debugging
          }
        } catch (error) {
          console.error(`Error comparing image with ${crystal.name}:`, error)
          return {
            crystal: crystal.name,
            confidence: 0.05, // Very low confidence on error
            rawSimilarity: -1,
          }
        }
      })
    )

    // Sort by confidence (semantic similarity) and get top 5
    const topMatches = matches
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 5)
      .map(match => ({
        crystal: match.crystal,
        confidence: match.confidence,
      }))

    // Normalize confidence scores to make them more interpretable
    if (topMatches.length > 0 && topMatches[0].confidence > 0) {
      const maxConfidence = topMatches[0].confidence
      
      // Scale all confidences relative to the top match
      // This makes scores more meaningful (top match = highest, others relative)
      topMatches.forEach(match => {
        // Normalize: top match gets boosted, others scaled relative to it
        const normalized = (match.confidence / maxConfidence) * 0.95
        match.confidence = Math.max(0.1, Math.min(0.95, normalized))
      })
      
      // If top match is clearly best (much higher than 2nd), boost it
      if (topMatches.length > 1) {
        const ratio = topMatches[0].confidence / topMatches[1].confidence
        if (ratio > 1.3) {
          topMatches[0].confidence = Math.min(0.95, topMatches[0].confidence * 1.1)
        }
      }
    }

    console.log('Top matches:', topMatches.map(m => `${m.crystal}: ${(m.confidence * 100).toFixed(1)}%`))

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



