import crystalsData from '../data/crystals.json'

export interface EnrichedCrystalData {
  id: string
  name: string
  alternativeNames?: string[]
  properties?: string[]
  categories?: string[]
  chakras?: string[]
  elements?: string[]
  zodiacSigns?: string[]
  sunSigns?: string[]
  moonSigns?: string[]
  moonPhases?: string[]
  planets?: string[]
  intentions?: string[]
  colors?: string[]
  hardness?: number
  origin?: string[]
  rarity?: string
  ogColor?: string
  primaryChakra?: string
  keywords?: string[]
  description?: string
  metaphysicalProperties?: string
  physicalProperties?: string
  historicalUse?: string
  workingWith?: {
    meditation?: string
    spellwork?: string
    healing?: string
    manifestation?: string
  }
  careInstructions?: {
    cleansing?: string[]
    charging?: string[]
    programming?: string
  }
  combinations?: {
    enhances?: string[]
    complements?: string[]
    avoid?: string[]
  }
  correspondences?: {
    herbs?: string[]
    incense?: string[]
    oils?: string[]
    numbers?: number[]
    tarot?: string[]
  }
}

const crystals = crystalsData as EnrichedCrystalData[]

/**
 * Look up a crystal by name from the encyclopaedia data.
 * Uses case-insensitive matching and also checks alternative names.
 */
export function enrichCrystalData(crystalName: string): EnrichedCrystalData | null {
  if (!crystalName) return null

  const normalised = crystalName.toLowerCase().trim()

  // Direct name match
  const match = crystals.find(c => c.name.toLowerCase() === normalised)
  if (match) return match

  // Check alternative names
  const altMatch = crystals.find(c =>
    c.alternativeNames?.some(alt => alt.toLowerCase() === normalised)
  )
  if (altMatch) return altMatch

  // Partial match (e.g. "Rose Quartz" matching "rose quartz tumbled")
  const partialMatch = crystals.find(c =>
    normalised.includes(c.name.toLowerCase()) || c.name.toLowerCase().includes(normalised)
  )
  if (partialMatch) return partialMatch

  return null
}

/**
 * Get all crystal names from the encyclopaedia for linking purposes.
 */
export function getAllEnrichedCrystalNames(): string[] {
  return crystals.map(c => c.name)
}

/**
 * Chakra colour mapping for UI badges.
 */
export const chakraColours: Record<string, string> = {
  'crown': '#9333EA',
  'crown chakra': '#9333EA',
  'third eye': '#4F46E5',
  'third eye chakra': '#4F46E5',
  'throat': '#0EA5E9',
  'throat chakra': '#0EA5E9',
  'heart': '#22C55E',
  'heart chakra': '#22C55E',
  'higher heart': '#2DD4BF',
  'higher heart chakra': '#2DD4BF',
  'solar plexus': '#EAB308',
  'solar plexus chakra': '#EAB308',
  'sacral': '#F97316',
  'sacral chakra': '#F97316',
  'root': '#EF4444',
  'root chakra': '#EF4444',
  'earth star': '#78350F',
  'earth star chakra': '#78350F',
  'soul star': '#E879F9',
  'soul star chakra': '#E879F9',
}

/**
 * Element icon mapping.
 */
export const elementIcons: Record<string, string> = {
  'fire': '🔥',
  'water': '💧',
  'earth': '🌍',
  'air': '💨',
  'spirit': '✦',
  'storm': '⚡',
}

/**
 * Rarity labels for display.
 */
export const rarityLabels: Record<string, { label: string; colour: string }> = {
  'common': { label: 'Common', colour: '#6B7280' },
  'uncommon': { label: 'Uncommon', colour: '#22C55E' },
  'rare': { label: 'Rare', colour: '#3B82F6' },
  'very rare': { label: 'Very rare', colour: '#8B5CF6' },
  'extremely rare': { label: 'Extremely rare', colour: '#F59E0B' },
}
