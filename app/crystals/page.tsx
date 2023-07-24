import { PHASE_PRODUCTION_BUILD } from "next/dist/shared/lib/constants";
import ViewCrystals from "../../components/Organisms/ViewCrystals";
import { findAndSerializeAllCrystals } from "../../lib/helpers/serializeCrystalDates";
import { CrystalProps, ViewCrystalsProps } from "../../lib/types/crystal";
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Crystal Gallery',
};

async function getCrystals() {
  if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) { return null };
  const basePath = process.env.SITE_URL
  // const allCrystalsPath = `${basePath}/api/crystal/allCrystals`;
  const allCrystalsPath = 'https://crystalindex.co.uk/api/crystal/allCrystals';
  
  const res = await fetch(allCrystalsPath);
  
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

// const ViewCrystals: React.FC<ViewCrystalsProps> = (props) => {
export default async function Page(props: ViewCrystalsProps) {
  const allCrystals = await getCrystals();

  return (
    <ViewCrystals crystals={allCrystals.crystals} galleryView={props.galleryView}  />
  )
};
