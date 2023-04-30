import { GetServerSideProps } from 'next';
import { useMemo, useState } from 'react';
import { BField, BInput } from '../../components/Atoms';
import CrystalGallery from '../../components/Organisms/CrystalGallery';
import { ViewCrystalsProps } from '../../lib/types/crystal';
import { findAndSerializeAllCrystals } from '../../lib/helpers/serializeCrystalDates';

const ViewCrystals: React.FC<ViewCrystalsProps> = (props) => {
  const crystals = props.crystals;  
  const [searchState, setSearchState] = useState<string>('')

  const searchResults = useMemo(() => {
    const searchValue = searchState.toLowerCase();
    return  (crystals || []).filter(crystal => {
      return (crystal.name && crystal.name.toLowerCase().includes(searchValue)) 
        || (crystal.memento && crystal.memento.toLowerCase().includes(searchValue))
        || (crystal.origin && crystal.origin.toLowerCase().includes(searchValue))
        || (crystal.colour && crystal.crystalInfo?.colour.find(colour => colour.toLowerCase().includes(searchValue)))
        || (crystal.chakra && crystal.crystalInfo?.chakra.find(chakra => chakra.toLowerCase().includes(searchValue)))
      }
    )
  }, [crystals, searchState]);

  return (
    <div className="section">
      <BField>
        <BInput
        id="search"
        placeholder='Search...'
        value={searchState}
        onChange={(newValue: string) => {
          setSearchState(newValue)
        }}
        />
      </BField>
      <CrystalGallery crystals={searchResults} />
    </div>
  )
}

export default ViewCrystals;

export const getServerSideProps: GetServerSideProps<ViewCrystalsProps> = async () => {
  let serializedCrystals = await findAndSerializeAllCrystals()

  return { props: { crystals: serializedCrystals }}
}

