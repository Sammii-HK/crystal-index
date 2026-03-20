'use client'

import { BCarousel } from './Molecules';
import { useRouter } from 'next/navigation'
import { FaArrowLeft } from 'react-icons/fa';
import { SerialisableCrystalWithUser } from '../lib/types/crystal';
import {
  EnrichedCrystalData,
  chakraColours,
  elementIcons,
  rarityLabels,
} from '../lib/crystal-data-enrichment';

export interface ViewCrystalProps {
  crystal: SerialisableCrystalWithUser | null
  enrichedData?: EnrichedCrystalData | null
  allCrystalNames?: string[]
}

const workingWithIcons: Record<string, string> = {
  meditation: '🧘',
  spellwork: '🕯️',
  healing: '💎',
  manifestation: '✨',
}

export default function ViewCrystal({ crystal, enrichedData, allCrystalNames = [] }: ViewCrystalProps) {
  const router = useRouter()

  if (!crystal) return <p>Crystal not found</p>

  const accentColour = enrichedData?.ogColor || '#9333EA'
  const cssVars = { '--crystal-accent': accentColour } as React.CSSProperties

  // Merge data sources — enriched data takes priority for rich fields
  const name = crystal.name
  const altNames = enrichedData?.alternativeNames || (crystal.otherNames ? crystal.otherNames.split(',').map(n => n.trim()) : [])
  const description = enrichedData?.description || crystal.crystalInfo?.info || ''
  const keywords = enrichedData?.keywords || []
  const chakras = enrichedData?.chakras || crystal.crystalInfo?.chakra || []
  const zodiacSigns = enrichedData?.zodiacSigns || []
  const planets = enrichedData?.planets || []
  const elements = enrichedData?.elements || []
  const moonPhases = enrichedData?.moonPhases || []
  const intentions = enrichedData?.intentions || crystal.intention || []
  const hardness = enrichedData?.hardness || crystal.hardness
  const luster = crystal.luster
  const rarity = enrichedData?.rarity
  const primaryChakra = enrichedData?.primaryChakra
  const origins = enrichedData?.origin || (crystal.originLocation ? [crystal.originLocation] : [])
  const metaphysical = enrichedData?.metaphysicalProperties
  const physical = enrichedData?.physicalProperties
  const historical = enrichedData?.historicalUse
  const workingWith = enrichedData?.workingWith
  const careInstructions = enrichedData?.careInstructions
  const combinations = enrichedData?.combinations
  const correspondences = enrichedData?.correspondences
  const properties = enrichedData?.properties || []
  const categories = enrichedData?.categories || []

  // Build a lookup for crystal linking
  const crystalNameSet = new Set(allCrystalNames.map(n => n.toLowerCase()))

  const renderCrystalLink = (crystalName: string) => {
    const isLinkable = crystalNameSet.has(crystalName.toLowerCase())
    if (isLinkable) {
      return (
        <a
          key={crystalName}
          className="crystal-combinations__link"
          href={`/crystals?search=${encodeURIComponent(crystalName)}`}
        >
          {crystalName}
        </a>
      )
    }
    return (
      <span key={crystalName} className="crystal-combinations__link">
        {crystalName}
      </span>
    )
  }

  return (
    <div className="crystal-detail" style={cssVars}>
      <div className="container">
        {/* Back link */}
        <div className="px-4 pt-4">
          <a className="crystal-detail__back-link" onClick={() => router.push('/crystals')}>
            <FaArrowLeft /> Back to crystals
          </a>
        </div>

        {/* Hero */}
        <div className="crystal-hero">
          <h1 className="crystal-hero__name">{name}</h1>
          {altNames.length > 0 && (
            <p className="crystal-hero__alt-names">
              Also known as: {altNames.join(', ')}
            </p>
          )}
          {keywords.length > 0 && (
            <div className="crystal-hero__keywords">
              {keywords.map(kw => (
                <span key={kw} className="crystal-hero__keyword">{kw}</span>
              ))}
            </div>
          )}
        </div>

        {/* Main content: gallery + sidebar */}
        <div className="columns is-desktop px-4">
          {/* Gallery */}
          <div className="column is-7-desktop is-12-tablet">
            <div className="crystal-gallery__main">
              <BCarousel imageIds={crystal.image} />
            </div>

            {/* Description */}
            {description && (
              <div className="crystal-section mt-5">
                <h2 className="crystal-section__heading">About {name}</h2>
                <p className="crystal-description">{description}</p>
              </div>
            )}

            {/* Metaphysical properties */}
            {metaphysical && (
              <div className="crystal-section">
                <h2 className="crystal-section__heading">Metaphysical properties</h2>
                <p className="crystal-section__text">{metaphysical}</p>
              </div>
            )}

            {/* Physical properties */}
            {physical && (
              <div className="crystal-section">
                <h2 className="crystal-section__heading">Physical properties</h2>
                <p className="crystal-section__text">{physical}</p>
              </div>
            )}

            {/* Historical use */}
            {historical && (
              <div className="crystal-section">
                <h2 className="crystal-section__heading">Historical use</h2>
                <p className="crystal-section__text">{historical}</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="column is-4-desktop is-offset-1-desktop is-12-tablet">
            {/* Quick facts */}
            <div className="crystal-quick-facts">
              <h3 className="crystal-quick-facts__title">Quick facts</h3>

              {hardness && (
                <div className="crystal-quick-facts__item">
                  <span className="crystal-quick-facts__label">Hardness</span>
                  <span className="crystal-quick-facts__value">{hardness} Mohs</span>
                </div>
              )}

              {luster && (
                <div className="crystal-quick-facts__item">
                  <span className="crystal-quick-facts__label">Lustre</span>
                  <span className="crystal-quick-facts__value" style={{ textTransform: 'capitalize' }}>{luster}</span>
                </div>
              )}

              {rarity && (
                <div className="crystal-quick-facts__item">
                  <span className="crystal-quick-facts__label">Rarity</span>
                  <span className="crystal-quick-facts__value">
                    <span
                      className="rarity-badge"
                      style={{
                        borderColor: rarityLabels[rarity]?.colour || '#6B7280',
                        color: rarityLabels[rarity]?.colour || '#6B7280',
                      }}
                    >
                      <span
                        className="rarity-badge__dot"
                        style={{ background: rarityLabels[rarity]?.colour || '#6B7280' }}
                      />
                      {rarityLabels[rarity]?.label || rarity}
                    </span>
                  </span>
                </div>
              )}

              {primaryChakra && (
                <div className="crystal-quick-facts__item">
                  <span className="crystal-quick-facts__label">Primary chakra</span>
                  <span className="crystal-quick-facts__value">
                    <span
                      className="chakra-badge"
                      style={{
                        borderColor: chakraColours[primaryChakra.toLowerCase()] || '#9333EA',
                        color: chakraColours[primaryChakra.toLowerCase()] || '#9333EA',
                      }}
                    >
                      <span
                        className="chakra-badge__dot"
                        style={{ background: chakraColours[primaryChakra.toLowerCase()] || '#9333EA' }}
                      />
                      {primaryChakra}
                    </span>
                  </span>
                </div>
              )}

              {origins.length > 0 && (
                <div className="crystal-quick-facts__item">
                  <span className="crystal-quick-facts__label">Origin</span>
                  <span className="crystal-quick-facts__value">{origins.slice(0, 3).join(', ')}</span>
                </div>
              )}

              {categories.length > 0 && (
                <div className="crystal-quick-facts__item">
                  <span className="crystal-quick-facts__label">Categories</span>
                  <span className="crystal-quick-facts__value">{categories.join(', ')}</span>
                </div>
              )}
            </div>

            {/* Crystal bio from database */}
            {crystal.bio && (
              <div className="crystal-quick-facts">
                <h3 className="crystal-quick-facts__title">Personal notes</h3>
                <p className="crystal-section__text" style={{ fontSize: '0.9rem' }}>{crystal.bio}</p>
              </div>
            )}
          </div>
        </div>

        <hr className="crystal-divider" />

        {/* Properties grid */}
        {(chakras.length > 0 || zodiacSigns.length > 0 || planets.length > 0 || elements.length > 0 || moonPhases.length > 0 || intentions.length > 0) && (
          <div className="px-4">
            <div className="crystal-section">
              <h2 className="crystal-section__heading">Properties and associations</h2>
            </div>
            <div className="crystal-properties">
              {chakras.length > 0 && (
                <div className="crystal-property-card">
                  <h3 className="crystal-property-card__title">Chakras</h3>
                  <div className="crystal-property-card__items">
                    {chakras.map(chakra => (
                      <span
                        key={chakra}
                        className="chakra-badge"
                        style={{
                          borderColor: chakraColours[chakra.toLowerCase()] || '#9333EA',
                          color: chakraColours[chakra.toLowerCase()] || '#9333EA',
                        }}
                      >
                        <span
                          className="chakra-badge__dot"
                          style={{ background: chakraColours[chakra.toLowerCase()] || '#9333EA' }}
                        />
                        {chakra}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {zodiacSigns.length > 0 && (
                <div className="crystal-property-card">
                  <h3 className="crystal-property-card__title">Zodiac signs</h3>
                  <div className="crystal-property-card__items">
                    {zodiacSigns.map(sign => (
                      <span key={sign} className="crystal-badge">{sign}</span>
                    ))}
                  </div>
                </div>
              )}

              {planets.length > 0 && (
                <div className="crystal-property-card">
                  <h3 className="crystal-property-card__title">Planets</h3>
                  <div className="crystal-property-card__items">
                    {planets.map(planet => (
                      <span key={planet} className="crystal-badge">{planet}</span>
                    ))}
                  </div>
                </div>
              )}

              {elements.length > 0 && (
                <div className="crystal-property-card">
                  <h3 className="crystal-property-card__title">Elements</h3>
                  <div className="crystal-property-card__items">
                    {elements.map(el => (
                      <span key={el} className="crystal-badge">
                        {elementIcons[el.toLowerCase()] && (
                          <span>{elementIcons[el.toLowerCase()]}</span>
                        )}
                        {el}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {moonPhases.length > 0 && (
                <div className="crystal-property-card">
                  <h3 className="crystal-property-card__title">Moon phases</h3>
                  <div className="crystal-property-card__items">
                    {moonPhases.map(phase => (
                      <span key={phase} className="crystal-badge">{phase}</span>
                    ))}
                  </div>
                </div>
              )}

              {intentions.length > 0 && (
                <div className="crystal-property-card">
                  <h3 className="crystal-property-card__title">Intentions</h3>
                  <div className="crystal-property-card__items">
                    {intentions.map(intent => (
                      <span key={intent} className="crystal-badge">{intent}</span>
                    ))}
                  </div>
                </div>
              )}

              {properties.length > 0 && (
                <div className="crystal-property-card">
                  <h3 className="crystal-property-card__title">Properties</h3>
                  <div className="crystal-property-card__items">
                    {properties.map(prop => (
                      <span key={prop} className="crystal-badge">{prop}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Working with this crystal */}
        {workingWith && Object.keys(workingWith).length > 0 && (
          <div className="px-4">
            <div className="crystal-section">
              <h2 className="crystal-section__heading">Working with {name}</h2>
            </div>
            <div className="crystal-working-grid">
              {Object.entries(workingWith).map(([key, value]) => (
                value && (
                  <div key={key} className="crystal-working-card">
                    <div className="crystal-working-card__icon">
                      {workingWithIcons[key] || '✦'}
                    </div>
                    <h3 className="crystal-working-card__title">{key}</h3>
                    <p className="crystal-working-card__text">{value}</p>
                  </div>
                )
              ))}
            </div>
          </div>
        )}

        {/* Care instructions */}
        {careInstructions && (careInstructions.cleansing?.length || careInstructions.charging?.length || careInstructions.programming) && (
          <div className="px-4 mt-5">
            <div className="crystal-section">
              <h2 className="crystal-section__heading">Care instructions</h2>
            </div>
            <div className="crystal-care-grid">
              {careInstructions.cleansing && careInstructions.cleansing.length > 0 && (
                <div className="crystal-care-card">
                  <h3 className="crystal-care-card__title">Cleansing</h3>
                  <ul className="crystal-care-card__list">
                    {careInstructions.cleansing.map(method => (
                      <li key={method}>{method}</li>
                    ))}
                  </ul>
                </div>
              )}

              {careInstructions.charging && careInstructions.charging.length > 0 && (
                <div className="crystal-care-card">
                  <h3 className="crystal-care-card__title">Charging</h3>
                  <ul className="crystal-care-card__list">
                    {careInstructions.charging.map(method => (
                      <li key={method}>{method}</li>
                    ))}
                  </ul>
                </div>
              )}

              {careInstructions.programming && (
                <div className="crystal-care-card">
                  <h3 className="crystal-care-card__title">Programming</h3>
                  <p className="crystal-care-card__text">{careInstructions.programming}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Crystal combinations */}
        {combinations && (combinations.enhances?.length || combinations.complements?.length || combinations.avoid?.length) && (
          <div className="px-4 mt-5">
            <div className="crystal-section">
              <h2 className="crystal-section__heading">Crystal combinations</h2>
            </div>
            <div className="crystal-combinations">
              {combinations.enhances && combinations.enhances.length > 0 && (
                <div className="crystal-combinations__group">
                  <h3 className="crystal-combinations__group-title">Enhances</h3>
                  <div className="crystal-combinations__list">
                    {combinations.enhances.map(c => renderCrystalLink(c))}
                  </div>
                </div>
              )}

              {combinations.complements && combinations.complements.length > 0 && (
                <div className="crystal-combinations__group">
                  <h3 className="crystal-combinations__group-title">Complements</h3>
                  <div className="crystal-combinations__list">
                    {combinations.complements.map(c => renderCrystalLink(c))}
                  </div>
                </div>
              )}

              {combinations.avoid && combinations.avoid.length > 0 && (
                <div className="crystal-combinations__group">
                  <h3 className="crystal-combinations__group-title">Avoid</h3>
                  <div className="crystal-combinations__list">
                    {combinations.avoid.map(item => (
                      <span key={item} className="crystal-combinations__text">{item}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Correspondences */}
        {correspondences && (correspondences.herbs?.length || correspondences.tarot?.length || correspondences.incense?.length || correspondences.oils?.length || correspondences.numbers?.length) && (
          <div className="px-4 mt-5">
            <div className="crystal-section">
              <h2 className="crystal-section__heading">Correspondences</h2>
            </div>
            <div className="crystal-correspondences">
              {correspondences.herbs && correspondences.herbs.length > 0 && (
                <div className="crystal-correspondence-card">
                  <h3 className="crystal-correspondence-card__title">Herbs</h3>
                  <div className="crystal-correspondence-card__items">
                    {correspondences.herbs.map(h => (
                      <span key={h} className="crystal-badge">{h}</span>
                    ))}
                  </div>
                </div>
              )}

              {correspondences.tarot && correspondences.tarot.length > 0 && (
                <div className="crystal-correspondence-card">
                  <h3 className="crystal-correspondence-card__title">Tarot</h3>
                  <div className="crystal-correspondence-card__items">
                    {correspondences.tarot.map(t => (
                      <span key={t} className="crystal-badge">{t}</span>
                    ))}
                  </div>
                </div>
              )}

              {correspondences.incense && correspondences.incense.length > 0 && (
                <div className="crystal-correspondence-card">
                  <h3 className="crystal-correspondence-card__title">Incense</h3>
                  <div className="crystal-correspondence-card__items">
                    {correspondences.incense.map(i => (
                      <span key={i} className="crystal-badge">{i}</span>
                    ))}
                  </div>
                </div>
              )}

              {correspondences.oils && correspondences.oils.length > 0 && (
                <div className="crystal-correspondence-card">
                  <h3 className="crystal-correspondence-card__title">Essential oils</h3>
                  <div className="crystal-correspondence-card__items">
                    {correspondences.oils.map(o => (
                      <span key={o} className="crystal-badge">{o}</span>
                    ))}
                  </div>
                </div>
              )}

              {correspondences.numbers && correspondences.numbers.length > 0 && (
                <div className="crystal-correspondence-card">
                  <h3 className="crystal-correspondence-card__title">Numbers</h3>
                  <div className="crystal-correspondence-card__items">
                    {correspondences.numbers.map(n => (
                      <span key={n} className="crystal-badge">{n}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <hr className="crystal-divider" />

        {/* CTA */}
        <div className="crystal-cta" style={cssVars}>
          <h2 className="crystal-cta__title">Add {name} to your collection</h2>
          <p className="crystal-cta__text">
            Track your crystals, log your intentions, and build your personal crystal library.
          </p>
          <a
            href="https://apps.apple.com/app/crystal-index/id6504834819"
            className="crystal-cta__button"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download the app
          </a>
        </div>
      </div>
    </div>
  )
}
