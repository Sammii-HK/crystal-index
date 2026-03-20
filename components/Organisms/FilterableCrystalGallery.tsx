'use client'

import { useState, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { SerialisableCrystalWithUser } from '../../lib/types/crystal'
import { BImage } from '../Atoms'
import BackToTop from '../Atoms/BackToTop'
import { FaTimes, FaSearch, FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa'
import { slugify } from '../../lib/helpers/slugify'

// ============================================
// Constants
// ============================================

const CHAKRAS = [
  { label: 'Root', value: 'root', colour: '#c82020' },
  { label: 'Sacral', value: 'sacral', colour: '#eb5e00' },
  { label: 'Solar Plexus', value: 'solar plexus', colour: '#daa000' },
  { label: 'Heart', value: 'heart', colour: '#95c012' },
  { label: 'Throat', value: 'throat', colour: '#16c3c3' },
  { label: 'Third Eye', value: 'third eye', colour: '#0066cc' },
  { label: 'Crown', value: 'crown', colour: '#9c4cc5' },
] as const

const COLOURS = [
  { label: 'Red', value: 'red', hex: '#c82020' },
  { label: 'Pink', value: 'pink', hex: '#d72c70' },
  { label: 'Orange', value: 'orange', hex: '#eb5e00' },
  { label: 'Yellow', value: 'yellow', hex: '#daa000' },
  { label: 'Green', value: 'green', hex: '#95c012' },
  { label: 'Blue', value: 'blue', hex: '#16c3c3' },
  { label: 'Indigo', value: 'indigo', hex: '#0066cc' },
  { label: 'Violet', value: 'violet', hex: '#9c4cc5' },
  { label: 'Brown', value: 'brown', hex: '#663300' },
  { label: 'Black', value: 'black', hex: '#333' },
  { label: 'White', value: 'white', hex: '#fff' },
  { label: 'Clear', value: 'clear', hex: '#e0e0e0' },
] as const

const ZODIAC_SIGNS = [
  { label: 'Aries', symbol: '\u2648' },
  { label: 'Taurus', symbol: '\u2649' },
  { label: 'Gemini', symbol: '\u264A' },
  { label: 'Cancer', symbol: '\u264B' },
  { label: 'Leo', symbol: '\u264C' },
  { label: 'Virgo', symbol: '\u264D' },
  { label: 'Libra', symbol: '\u264E' },
  { label: 'Scorpio', symbol: '\u264F' },
  { label: 'Sagittarius', symbol: '\u2650' },
  { label: 'Capricorn', symbol: '\u2651' },
  { label: 'Aquarius', symbol: '\u2652' },
  { label: 'Pisces', symbol: '\u2653' },
] as const

const ELEMENTS = ['Earth', 'Air', 'Fire', 'Water'] as const

const ZODIAC_ELEMENT_MAP: Record<string, string> = {
  aries: 'Fire', taurus: 'Earth', gemini: 'Air', cancer: 'Water',
  leo: 'Fire', virgo: 'Earth', libra: 'Air', scorpio: 'Water',
  sagittarius: 'Fire', capricorn: 'Earth', aquarius: 'Air', pisces: 'Water',
}

const ELEMENT_ZODIAC_MAP: Record<string, string[]> = {
  Fire: ['aries', 'leo', 'sagittarius'],
  Earth: ['taurus', 'virgo', 'capricorn'],
  Air: ['gemini', 'libra', 'aquarius'],
  Water: ['cancer', 'scorpio', 'pisces'],
}

type SortOption = 'name-asc' | 'name-desc' | 'recent' | 'hardness'

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: 'Name A\u2013Z', value: 'name-asc' },
  { label: 'Name Z\u2013A', value: 'name-desc' },
  { label: 'Recently added', value: 'recent' },
  { label: 'Hardness', value: 'hardness' },
]

const COLOR_MAP: Record<string, string> = {
  red: '#c82020', pink: '#d72c70', orange: '#eb5e00', yellow: '#daa000',
  green: '#95c012', blue: '#16c3c3', indigo: '#0066cc', violet: '#9c4cc5',
  brown: '#663300', black: '#333', white: '#fff', clear: '#e0e0e0',
}

const CHAKRA_COLOUR_MAP: Record<string, string> = {
  root: '#c82020', sacral: '#eb5e00', 'solar plexus': '#daa000',
  heart: '#95c012', throat: '#16c3c3', 'third eye': '#0066cc', crown: '#9c4cc5',
}

// ============================================
// Component
// ============================================

type Props = {
  crystals: SerialisableCrystalWithUser[]
}

export default function FilterableCrystalGallery({ crystals }: Props) {
  const router = useRouter()

  // Filter state
  const [search, setSearch] = useState('')
  const [selectedChakras, setSelectedChakras] = useState<string[]>([])
  const [selectedColours, setSelectedColours] = useState<string[]>([])
  const [selectedZodiac, setSelectedZodiac] = useState<string[]>([])
  const [selectedElements, setSelectedElements] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<SortOption>('name-asc')

  // Toggle helpers
  const toggle = useCallback((arr: string[], value: string, setter: (v: string[]) => void) => {
    setter(arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value])
  }, [])

  const hasActiveFilters = search || selectedChakras.length || selectedColours.length || selectedZodiac.length || selectedElements.length

  const clearAll = useCallback(() => {
    setSearch('')
    setSelectedChakras([])
    setSelectedColours([])
    setSelectedZodiac([])
    setSelectedElements([])
    setSortBy('name-asc')
  }, [])

  // Active filter chips
  const activeChips = useMemo(() => {
    const chips: { label: string; onRemove: () => void }[] = []
    if (search) chips.push({ label: `"${search}"`, onRemove: () => setSearch('') })
    selectedChakras.forEach(c => chips.push({
      label: CHAKRAS.find(ch => ch.value === c)?.label || c,
      onRemove: () => setSelectedChakras(prev => prev.filter(v => v !== c))
    }))
    selectedColours.forEach(c => chips.push({
      label: COLOURS.find(co => co.value === c)?.label || c,
      onRemove: () => setSelectedColours(prev => prev.filter(v => v !== c))
    }))
    selectedZodiac.forEach(z => chips.push({
      label: ZODIAC_SIGNS.find(zs => zs.label.toLowerCase() === z)?.label || z,
      onRemove: () => setSelectedZodiac(prev => prev.filter(v => v !== z))
    }))
    selectedElements.forEach(e => chips.push({
      label: e,
      onRemove: () => setSelectedElements(prev => prev.filter(v => v !== e))
    }))
    return chips
  }, [search, selectedChakras, selectedColours, selectedZodiac, selectedElements])

  // Filtered + sorted crystals
  const filteredCrystals = useMemo(() => {
    let results = [...crystals]

    // Text search
    if (search) {
      const q = search.toLowerCase()
      results = results.filter(c =>
        c.name?.toLowerCase().includes(q) ||
        c.bio?.toLowerCase().includes(q) ||
        c.crystalInfo?.info?.toLowerCase().includes(q) ||
        c.memento?.toLowerCase().includes(q) ||
        c.origin?.toLowerCase().includes(q) ||
        c.crystalInfo?.colour?.some(co => co.toLowerCase().includes(q)) ||
        c.crystalInfo?.chakra?.some(ch => ch.toLowerCase().includes(q))
      )
    }

    // Chakra filter
    if (selectedChakras.length > 0) {
      results = results.filter(c =>
        c.crystalInfo?.chakra?.some(ch => selectedChakras.includes(ch.toLowerCase()))
      )
    }

    // Colour filter
    if (selectedColours.length > 0) {
      results = results.filter(c =>
        c.crystalInfo?.colour?.some(co => selectedColours.includes(co.toLowerCase()))
      )
    }

    // Zodiac filter (match via crystal name/info containing zodiac sign name)
    if (selectedZodiac.length > 0) {
      results = results.filter(c => {
        const crystalText = `${c.name} ${c.bio || ''} ${c.crystalInfo?.info || ''} ${(c.intention || []).join(' ')}`.toLowerCase()
        return selectedZodiac.some(z => crystalText.includes(z))
      })
    }

    // Element filter (maps to zodiac signs, then filters same as zodiac)
    if (selectedElements.length > 0) {
      const relevantZodiac = selectedElements.flatMap(e => ELEMENT_ZODIAC_MAP[e] || [])
      results = results.filter(c => {
        const crystalText = `${c.name} ${c.bio || ''} ${c.crystalInfo?.info || ''} ${(c.intention || []).join(' ')}`.toLowerCase()
        return relevantZodiac.some(z => crystalText.includes(z))
      })
    }

    // Sort
    switch (sortBy) {
      case 'name-asc':
        results.sort((a, b) => (a.name || '').localeCompare(b.name || ''))
        break
      case 'name-desc':
        results.sort((a, b) => (b.name || '').localeCompare(a.name || ''))
        break
      case 'recent':
        results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case 'hardness':
        results.sort((a, b) => (b.hardness || 0) - (a.hardness || 0))
        break
    }

    return results
  }, [crystals, search, selectedChakras, selectedColours, selectedZodiac, selectedElements, sortBy])

  return (
    <div className="filterable-gallery">
      {/* ============ Filter bar ============ */}
      <div className="filter-bar">
        {/* Search */}
        <div className="filter-bar__search">
          <div className="control has-icons-left">
            <input
              className="input filter-bar__search-input"
              type="text"
              placeholder="Search crystals by name, colour, chakra, location..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <span className="icon is-left">
              <FaSearch />
            </span>
            {search && (
              <button
                className="filter-bar__search-clear"
                onClick={() => setSearch('')}
                type="button"
                aria-label="Clear search"
              >
                <FaTimes />
              </button>
            )}
          </div>
        </div>

        {/* Filter groups */}
        <div className="filter-bar__groups">
          {/* Chakra */}
          <div className="filter-group">
            <span className="filter-group__label">Chakra</span>
            <div className="filter-group__options">
              {CHAKRAS.map(chakra => (
                <button
                  key={chakra.value}
                  className={`filter-pill filter-pill--chakra ${selectedChakras.includes(chakra.value) ? 'filter-pill--active' : ''}`}
                  style={{
                    '--pill-colour': chakra.colour,
                    '--pill-colour-faint': `${chakra.colour}33`,
                  } as React.CSSProperties}
                  onClick={() => toggle(selectedChakras, chakra.value, setSelectedChakras)}
                  type="button"
                >
                  <span className="filter-pill__dot" style={{ backgroundColor: chakra.colour }} />
                  {chakra.label}
                </button>
              ))}
            </div>
          </div>

          {/* Colour */}
          <div className="filter-group">
            <span className="filter-group__label">Colour</span>
            <div className="filter-group__options">
              {COLOURS.map(colour => (
                <button
                  key={colour.value}
                  className={`filter-pill filter-pill--colour ${selectedColours.includes(colour.value) ? 'filter-pill--active' : ''}`}
                  style={{
                    '--pill-colour': colour.hex,
                    '--pill-colour-faint': `${colour.hex}33`,
                  } as React.CSSProperties}
                  onClick={() => toggle(selectedColours, colour.value, setSelectedColours)}
                  type="button"
                >
                  <span
                    className="filter-pill__dot"
                    style={{
                      backgroundColor: colour.hex,
                      border: colour.value === 'white' || colour.value === 'clear' ? '1px solid #666' : 'none',
                    }}
                  />
                  {colour.label}
                </button>
              ))}
            </div>
          </div>

          {/* Zodiac */}
          <div className="filter-group">
            <span className="filter-group__label">Zodiac</span>
            <div className="filter-group__options">
              {ZODIAC_SIGNS.map(sign => (
                <button
                  key={sign.label}
                  className={`filter-pill filter-pill--zodiac ${selectedZodiac.includes(sign.label.toLowerCase()) ? 'filter-pill--active' : ''}`}
                  onClick={() => toggle(selectedZodiac, sign.label.toLowerCase(), setSelectedZodiac)}
                  type="button"
                >
                  <span className="filter-pill__symbol">{sign.symbol}</span>
                  {sign.label}
                </button>
              ))}
            </div>
          </div>

          {/* Element */}
          <div className="filter-group">
            <span className="filter-group__label">Element</span>
            <div className="filter-group__options">
              {ELEMENTS.map(element => (
                <button
                  key={element}
                  className={`filter-pill filter-pill--element ${selectedElements.includes(element) ? 'filter-pill--active' : ''}`}
                  onClick={() => toggle(selectedElements, element, setSelectedElements)}
                  type="button"
                >
                  {element}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div className="filter-group">
            <span className="filter-group__label">Sort</span>
            <div className="filter-group__options">
              <div className="select is-small filter-bar__sort-select">
                <select value={sortBy} onChange={e => setSortBy(e.target.value as SortOption)}>
                  {SORT_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Active chips + clear */}
        {hasActiveFilters && (
          <div className="filter-bar__active">
            <div className="filter-chips">
              {activeChips.map((chip, i) => (
                <span key={i} className="filter-chip">
                  {chip.label}
                  <button
                    className="filter-chip__remove"
                    onClick={chip.onRemove}
                    type="button"
                    aria-label={`Remove ${chip.label} filter`}
                  >
                    <FaTimes />
                  </button>
                </span>
              ))}
            </div>
            <button className="filter-bar__clear-all" onClick={clearAll} type="button">
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* ============ Result count ============ */}
      <div className="filter-results__count">
        Showing {filteredCrystals.length} of {crystals.length} crystal{crystals.length !== 1 ? 's' : ''}
      </div>

      {/* ============ Results grid ============ */}
      {filteredCrystals.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state__icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 4L6 14v20l18 10 18-10V14L24 4z" stroke="#9333EA" strokeWidth="2" fill="none" opacity="0.4"/>
              <path d="M24 4v40M6 14l18 10 18-10" stroke="#9333EA" strokeWidth="2" fill="none" opacity="0.3"/>
            </svg>
          </div>
          <div className="empty-state__title">No crystals match your filters</div>
          <div className="empty-state__description">
            Try removing some filters or adjusting your search.
          </div>
          <button className="button is-small mt-3 filter-bar__clear-all" onClick={clearAll} type="button">
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="columns is-multiline crystal-gallery-grid">
          {filteredCrystals.map((crystal, index) => (
            <div
              key={crystal.id}
              className="column is-4-desktop is-6-tablet is-12-mobile"
              style={{ animationDelay: `${Math.min(index * 0.04, 1.2)}s` }}
            >
              <div
                className="crystal-card"
                onClick={() => router.push(`/crystals/${crystal.slug || slugify(crystal.name)}`)}
              >
                <div className="crystal-card__image-wrap">
                  <BImage
                    imageId={typeof crystal.image[0] === 'object' ? crystal.image[0].id : crystal.image[0]}
                    blobUrl={typeof crystal.image[0] === 'object' ? crystal.image[0].blobUrl : undefined}
                    alt={crystal.name}
                    fill
                  />
                </div>
                <div className="crystal-card__overlay">
                  <div className="crystal-card__meta">
                    {crystal.crystalInfo?.chakra && crystal.crystalInfo.chakra.length > 0 && (
                      <span
                        className="crystal-card__chakra-badge"
                        style={{ backgroundColor: CHAKRA_COLOUR_MAP[crystal.crystalInfo.chakra[0].toLowerCase()] || '#9333EA' }}
                      >
                        {crystal.crystalInfo.chakra[0]}
                      </span>
                    )}
                  </div>
                  <div className="crystal-card__name">{crystal.name}</div>
                  <div className="crystal-card__bottom-row">
                    {crystal.crystalInfo?.colour && crystal.crystalInfo.colour.length > 0 && (
                      <div className="crystal-card__colors">
                        {crystal.crystalInfo.colour.slice(0, 5).map(color => (
                          <span
                            key={color}
                            className="crystal-card__color-dot"
                            style={{
                              backgroundColor: COLOR_MAP[color.toLowerCase()] || '#999',
                              border: color.toLowerCase() === 'white' || color.toLowerCase() === 'clear' ? '1px solid #666' : 'none',
                            }}
                          />
                        ))}
                      </div>
                    )}
                    {crystal.bio && (
                      <p className="crystal-card__description">{crystal.bio}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <BackToTop />
    </div>
  )
}
