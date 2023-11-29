import { PHASE_PRODUCTION_BUILD } from "next/dist/shared/lib/constants";
import ViewCrystals from "../../components/Organisms/ViewCrystals";
import { findAndSerializeAllCrystals } from "../../lib/helpers/serializeCrystalDates";
import { CrystalProps, SerialisableCrystalWithUser, ViewCrystalsProps } from "../../lib/types/crystal";
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Crystal Gallery',
  description: 'Easily discover crystal meanings and identify crystals in the most beautiful, informative and personal way.',
  keywords: ['crystals', 'identification', 'index', 'meaning', 'identifier', 'crystal', 'personal' ]
};

async function getCrystals(): Promise<{crystals: SerialisableCrystalWithUser[]} | null> {
  // if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) { return null };
  const basePath = process.env.SITE_URL
  const allCrystalsPath = `${basePath}/api/crystal/allCrystals`;
  // const allCrystalsPath = 'localhost:3000/api/crystal/allCrystals';
  
  const res = await fetch(allCrystalsPath, {next: { revalidate: 60 }});
  
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

// const ViewCrystals: React.FC<ViewCrystalsProps> = (props) => {
export default async function Page(props: ViewCrystalsProps) {
  const allCrystals = await getCrystals();

  console.log("all crystals result in Page", allCrystals)

  return (
    <ViewCrystals crystals={allCrystals?.crystals || null} galleryView={props.galleryView}  />
  )
};
