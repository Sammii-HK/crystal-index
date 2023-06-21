import ViewCrystals from "../../components/Organisms/ViewCrystals";
import { findAndSerializeAllCrystals } from "../../lib/helpers/serializeCrystalDates";
import { ViewCrystalsProps } from "../../lib/types/crystal";
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Crystal Gallery',
};

// const ViewCrystals: React.FC<ViewCrystalsProps> = (props) => {
export default async function Page(props: ViewCrystalsProps) {
  const crystals = await findAndSerializeAllCrystals();

  return (
    <ViewCrystals crystals={crystals} galleryView="mainGallery"  />
  )
};
