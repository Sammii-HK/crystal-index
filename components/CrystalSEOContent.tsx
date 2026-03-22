import { EnrichedCrystalData } from '../lib/crystal-data-enrichment'

interface Props {
  crystal: { name: string; crystalInfo?: { info?: string | null } | null }
  enrichedData: EnrichedCrystalData | null
}

/**
 * SEO + GEO-rich text block for crystal pages.
 * Rendered as accessible, structured prose — readable by users, search engines, and AI systems.
 */
export default function CrystalSEOContent({ crystal, enrichedData }: Props) {
  if (!enrichedData) return null

  const name = crystal.name
  const e = enrichedData

  const sections: Array<{ heading: string; body: string }> = []

  // Overview
  const description = e.description || crystal.crystalInfo?.info
  if (description) {
    sections.push({ heading: `What is ${name}?`, body: description })
  }

  // Physical & metaphysical properties
  if (e.metaphysicalProperties) {
    sections.push({
      heading: `${name} healing properties`,
      body: e.metaphysicalProperties,
    })
  }

  if (e.physicalProperties) {
    sections.push({
      heading: `${name} physical properties`,
      body: e.physicalProperties,
    })
  }

  // Chakras
  if (e.chakras?.length) {
    const chakraText = e.chakras.length === 1
      ? `${name} is associated with the ${e.chakras[0]} chakra.`
      : `${name} resonates with the ${e.chakras.slice(0, -1).join(', ')} and ${e.chakras[e.chakras.length - 1]} chakras.`
    sections.push({ heading: `${name} chakra association`, body: chakraText })
  }

  // Zodiac
  if (e.zodiacSigns?.length) {
    const signs = e.zodiacSigns
    const signText = signs.length === 1
      ? `${name} is the birthstone and companion crystal for ${signs[0]}.`
      : `${name} is particularly beneficial for ${signs.slice(0, -1).join(', ')} and ${signs[signs.length - 1]}.`
    sections.push({ heading: `${name} zodiac signs`, body: signText })
  }

  // Elements & planets
  const contextParts: string[] = []
  if (e.elements?.length) contextParts.push(`Element${e.elements.length > 1 ? 's' : ''}: ${e.elements.join(', ')}`)
  if (e.planets?.length) contextParts.push(`Planet${e.planets.length > 1 ? 's' : ''}: ${e.planets.join(', ')}`)
  if (e.hardness) contextParts.push(`Mohs hardness: ${e.hardness}`)
  if (e.rarity) contextParts.push(`Rarity: ${e.rarity}`)
  if (e.colors?.length) contextParts.push(`Colour: ${e.colors.join(', ')}`)
  if (contextParts.length) {
    sections.push({
      heading: `${name} quick facts`,
      body: contextParts.join(' · '),
    })
  }

  // Historical use
  if (e.historicalUse) {
    sections.push({ heading: `History of ${name}`, body: e.historicalUse })
  }

  // Working with
  if (e.workingWith) {
    const w = e.workingWith
    const uses = [
      w.meditation && `Meditation: ${w.meditation}`,
      w.healing && `Healing: ${w.healing}`,
      w.manifestation && `Manifestation: ${w.manifestation}`,
      w.spellwork && `Spellwork: ${w.spellwork}`,
    ].filter(Boolean) as string[]
    if (uses.length) {
      sections.push({ heading: `How to work with ${name}`, body: uses.join(' ') })
    }
  }

  // Care instructions
  if (e.careInstructions) {
    const c = e.careInstructions
    const parts: string[] = []
    if (c.cleansing?.length) parts.push(`Cleanse ${name} using ${c.cleansing.join(', ')}.`)
    if (c.charging?.length) parts.push(`Charge it with ${c.charging.join(', ')}.`)
    if (c.programming) parts.push(c.programming)
    if (parts.length) {
      sections.push({ heading: `How to cleanse and charge ${name}`, body: parts.join(' ') })
    }
  }

  // Crystal combinations
  if (e.combinations) {
    const comb = e.combinations
    const parts: string[] = []
    if (comb.enhances?.length) parts.push(`${name} enhances the energy of ${comb.enhances.join(', ')}.`)
    if (comb.complements?.length) parts.push(`It complements ${comb.complements.join(', ')}.`)
    if (comb.avoid?.length) parts.push(`Avoid pairing with ${comb.avoid.join(', ')}.`)
    if (parts.length) {
      sections.push({ heading: `${name} crystal combinations`, body: parts.join(' ') })
    }
  }

  // Correspondences
  if (e.correspondences) {
    const cor = e.correspondences
    const parts: string[] = []
    if (cor.tarot?.length) parts.push(`Tarot cards: ${cor.tarot.join(', ')}.`)
    if (cor.herbs?.length) parts.push(`Herbs: ${cor.herbs.join(', ')}.`)
    if (cor.numbers?.length) parts.push(`Numbers: ${cor.numbers.join(', ')}.`)
    if (parts.length) {
      sections.push({ heading: `${name} spiritual correspondences`, body: parts.join(' ') })
    }
  }

  // Alternative names
  if (e.alternativeNames?.length) {
    sections.push({
      heading: `Other names for ${name}`,
      body: `${name} is also known as ${e.alternativeNames.join(', ')}.`,
    })
  }

  if (sections.length === 0) return null

  return (
    <section
      aria-label={`About ${name}`}
      style={{
        background: 'var(--ci-card-bg)',
        borderTop: '1px solid var(--ci-divider)',
        marginTop: '3rem',
        padding: '2.5rem 1.5rem',
      }}
    >
      <div className="container" style={{ maxWidth: '860px' }}>
        <h2
          className="title is-4"
          style={{ marginBottom: '2rem', color: 'var(--ci-text)' }}
        >
          About {name}
        </h2>
        <div className="columns is-multiline">
          {sections.map((s, i) => (
            <div key={i} className="column is-half" style={{ marginBottom: '1.5rem' }}>
              <h3
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '0.4rem',
                  color: 'var(--ci-text-muted)',
                }}
              >
                {s.heading}
              </h3>
              <p style={{ fontSize: '0.92rem', lineHeight: '1.6', color: 'var(--ci-text-muted)' }}>
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
