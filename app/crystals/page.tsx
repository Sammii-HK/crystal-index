import FilterableCrystalGallery from "../../components/Organisms/FilterableCrystalGallery";
import { SerialisableCrystalWithUser } from "../../lib/types/crystal";
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Crystal Directory — Browse 200+ Crystals by Chakra, Colour, Zodiac & Properties',
  description: 'Explore our crystal directory. Filter by chakra, colour, zodiac sign, element and more. Discover meanings, properties and healing uses for over 200 crystals.',
  keywords: ['crystals', 'crystal directory', 'crystal meanings', 'chakra crystals', 'zodiac crystals', 'crystal colours', 'healing crystals', 'crystal properties']
};

async function getCrystals(): Promise<{crystals: SerialisableCrystalWithUser[]} | null> {
  const basePath = process.env.NEXT_PUBLIC_SITE_URL
    || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
  const allCrystalsPath = `${basePath}/api/crystal/allCrystals`;

  try {
    const res = await fetch(allCrystalsPath, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error('Failed to fetch crystals:', res.status)
      return null
    }

    return res.json()
  } catch (error) {
    console.error('Error fetching crystals during build:', error)
    return { crystals: [] }
  }
}

export default async function Page() {
  const allCrystals = await getCrystals();

  return (
    <div className="section crystal-directory">
      <div className="container">
        <div className="crystal-directory__header mb-5">
          <h1 className="title is-3 has-text-white">Crystal Directory</h1>
          <p className="subtitle is-6 has-text-grey-light">
            Browse and filter our collection of crystals by chakra, colour, zodiac sign and more.
          </p>
        </div>
        <FilterableCrystalGallery crystals={allCrystals?.crystals || []} />
      </div>
    </div>
  )
}

export const dynamic = 'force-dynamic'
