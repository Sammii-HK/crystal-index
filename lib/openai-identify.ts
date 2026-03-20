import OpenAI from 'openai'
import { getAllEnrichedCrystalNames } from './crystal-data-enrichment'

let openaiClient: OpenAI | null = null

function getOpenAI(): OpenAI {
  if (!openaiClient) {
    openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  }
  return openaiClient
}

export interface IdentifyMatch {
  crystal: string
  confidence: number
}

export interface IdentifyResponse {
  topMatches: IdentifyMatch[]
  confidence: number
}

/**
 * Identify a crystal from an image URL using GPT-4o vision.
 * Returns top matches ranked by confidence.
 */
export async function identifyCrystalWithVision(imageUrl: string): Promise<IdentifyResponse> {
  const crystalNames = getAllEnrichedCrystalNames().join(', ')

  const systemPrompt = `You are an expert gemologist and crystal identifier with decades of experience.
Your task is to identify crystals and minerals from photographs.

Known crystals in our database: ${crystalNames}

Analyse the photo carefully, considering:
- Colour and colour variations (primary and secondary colours)
- Transparency (transparent, translucent, opaque)
- Lustre (vitreous, resinous, metallic, silky, pearly, adamantine)
- Crystal structure and habit (cubic, hexagonal, prismatic, massive, botryoidal, etc.)
- Surface texture and any visible patterns
- Special optical effects (chatoyancy, iridescence, asterism, fluorescence clues)
- Inclusions or internal features

Respond ONLY with valid JSON in exactly this format — no markdown, no explanation:
{
  "topMatches": [
    {"crystal": "Crystal Name", "confidence": 0.92},
    {"crystal": "Crystal Name", "confidence": 0.05},
    {"crystal": "Crystal Name", "confidence": 0.02},
    {"crystal": "Crystal Name", "confidence": 0.01}
  ]
}

Rules:
- "crystal" must be a name from the known database (exact spelling)
- Confidences must sum to 1.0
- Always provide 4-5 matches even if uncertain
- Confidence reflects certainty of identification (0.0 to 1.0)`

  const response = await getOpenAI().chat.completions.create({
    model: 'gpt-4o-mini',
    max_tokens: 300,
    temperature: 0.1,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'image_url',
            image_url: { url: imageUrl, detail: 'high' },
          },
          {
            type: 'text',
            text: 'Identify this crystal. Respond only with JSON.',
          },
        ],
      },
    ],
    response_format: { type: 'json_object' },
    system: systemPrompt,
  } as any)

  const content = response.choices[0]?.message?.content
  if (!content) throw new Error('No response from vision model')

  let parsed: { topMatches?: IdentifyMatch[] }
  try {
    parsed = JSON.parse(content)
  } catch {
    throw new Error('Failed to parse vision model response')
  }

  const topMatches = (parsed.topMatches || []).filter(
    (m): m is IdentifyMatch => typeof m.crystal === 'string' && typeof m.confidence === 'number'
  )

  if (topMatches.length === 0) {
    throw new Error('No matches returned from vision model')
  }

  return {
    topMatches,
    confidence: topMatches[0].confidence,
  }
}
