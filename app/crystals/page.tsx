import ViewCrystals from "../../components/Organisms/ViewCrystals";
import { SerialisableCrystalWithUser, ViewCrystalsProps } from "../../lib/types/crystal";
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Crystal Gallery',
  description: 'Easily discover crystal meanings and identify crystals in the most beautiful, informative and personal way.',
  keywords: ['crystals', 'identification', 'index', 'meaning', 'identifier', 'crystal', 'personal' ]
};

async function getCrystals(): Promise<{crystals: SerialisableCrystalWithUser[]} | null> {
  // Determine base URL for API calls
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
    // During build, API might not be available - return empty array
    console.error('Error fetching crystals during build:', error)
    return { crystals: [] }
  }
}

export default async function Page(props: ViewCrystalsProps) {
  const allCrystals = await getCrystals();

  return (
    <ViewCrystals crystals={allCrystals?.crystals || []} galleryView={props.galleryView}  />
  )
};

// Make this page dynamic to avoid build-time fetch issues
export const dynamic = 'force-dynamic'
