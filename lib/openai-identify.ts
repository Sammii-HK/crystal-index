import OpenAI from 'openai'
import { getAllEnrichedCrystalNames } from './crystal-data-enrichment'

let deepinfraClient: OpenAI | null = null

function getClient(): OpenAI {
  if (!deepinfraClient) {
    deepinfraClient = new OpenAI({
      apiKey: process.env.DEEPINFRA_API_TOKEN,
      baseURL: 'https://api.deepinfra.com/v1/openai',
    })
  }
  return deepinfraClient
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
 * Identify a crystal from an image URL using Qwen3-VL-30B on DeepInfra.
 * Optionally accepts few-shot examples from the learning DB to boost accuracy.
 */
export async function identifyCrystalWithVision(
  imageUrl: string,
  fewShotExamples?: Array<{ crystalName: string }>
): Promise<IdentifyResponse> {
  const crystalNames = getAllEnrichedCrystalNames().join(', ')

  let fewShotText = ''
  if (fewShotExamples && fewShotExamples.length > 0) {
    const names = [...new Set(fewShotExamples.map(e => `"${e.crystalName}"`))]
    fewShotText = `\n\nVisually similar confirmed crystals from our learning database:\n${names.join(', ')}\nWeigh these heavily when making your identification.`
  }

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
- Inclusions or internal features${fewShotText}

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

  const response = await getClient().chat.completions.create({
    model: 'Qwen/Qwen3-VL-30B-A3B-Instruct',
    max_tokens: 400,
    temperature: 0.1,
    messages: [
      {
        role: 'system',
        content: systemPrompt,
      },
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
  } as any)

  const rawContent = response.choices[0]?.message?.content
  if (!rawContent) throw new Error('No response from vision model')

  // Qwen3-VL sometimes wraps output in ```json ... ``` blocks — strip them
  const content = rawContent
    .replace(/^```json\s*/i, '')
    .replace(/\s*```$/, '')
    .trim()

  let parsed: { topMatches?: IdentifyMatch[] }
  try {
    parsed = JSON.parse(content)
  } catch {
    throw new Error(`Failed to parse vision model response: ${content.slice(0, 200)}`)
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
