import { GetServerSideProps } from 'next';
import { useState } from 'react';
import CrystalGallery from '../../components/Organisms/CrystalGallery';
import { SerialisableCrystalWithUser, ViewCrystalsProps } from '../../lib/types/crystal';
import { findAndSerializeAllCrystals } from '../../lib/helpers/serializeCrystalDates';
import SearchCrystals from '../../components/Molecules/SearchCrystals';
import { getSuperUserId } from '../../lib/helpers/checkUser';

const ViewCrystals: React.FC<ViewCrystalsProps> = (props) => {
  const crystals = props.crystals;
  const [matchingCrystals, setMatchingCrystals] = useState<SerialisableCrystalWithUser[]>(crystals || [])

  return (
    <div className="section">
      <SearchCrystals crystals={crystals} onCrystalSearch={setMatchingCrystals} />
      <CrystalGallery crystals={matchingCrystals} />
    </div>
  )
}

export default ViewCrystals;

export const getServerSideProps: GetServerSideProps<ViewCrystalsProps> = async () => {
  let serializedCrystals = await findAndSerializeAllCrystals()
  console.log("getSuperUser", await getSuperUserId());

  return { props: { crystals: serializedCrystals }}
}

