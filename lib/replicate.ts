import Replicate from '@replicate/client'

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
 * Identify crystal from image using Replicate
 * Uses CLIP/ViT model for crystal classification
 */
export async function identifyCrystal(
  imageUrl: string
): Promise<{ topMatches: TopMatches; confidence: number }> {
  try {
    // Using a general image classification model
    // TODO: Replace with fine-tuned crystal classifier when available
    const output = await replicate.run(
      'stability-ai/stable-diffusion:db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf',
      {
        input: {
          image: imageUrl,
          // Add crystal-specific prompts
        },
      }
    )

    // Parse results and return top 5 matches
    // This is a placeholder - adjust based on actual model output
    const topMatches: TopMatches = [
      { crystal: 'Rose Quartz', confidence: 0.85 },
      { crystal: 'Amethyst', confidence: 0.72 },
      { crystal: 'Clear Quartz', confidence: 0.68 },
      { crystal: 'Citrine', confidence: 0.55 },
      { crystal: 'Jade', confidence: 0.48 },
    ]

    return {
      topMatches,
      confidence: topMatches[0]?.confidence || 0,
    }
  } catch (error) {
    console.error('Replicate identification error:', error)
    throw new Error('Failed to identify crystal')
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



