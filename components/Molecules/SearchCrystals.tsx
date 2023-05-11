import { useEffect, useMemo, useState } from "react";
import { BField, BInput } from "../Atoms";
import { SerialisableCrystalWithUser } from "../../lib/types/crystal";

const SearchCrystals: React.FC<
  {
    crystals: SerialisableCrystalWithUser[] | null,
    onCrystalSearch: (matchingCrystals: SerialisableCrystalWithUser[]) => void
  }
> = (props) => {
  const crystals = props.crystals;
  const [searchState, setSearchState] = useState<string>('')

  useEffect(() => {
    const searchValue = searchState.toLowerCase();
    const matchingCrystals = (crystals || []).filter(crystal => {
      return (crystal.name && crystal.name.toLowerCase().includes(searchValue)) 
        || (crystal.memento && crystal.memento.toLowerCase().includes(searchValue))
        || (crystal.origin && crystal.origin.toLowerCase().includes(searchValue))
        || (crystal.colour && crystal.crystalInfo?.colour.find(colour => colour.toLowerCase().includes(searchValue)))
        || (crystal.chakra && crystal.crystalInfo?.chakra.find(chakra => chakra.toLowerCase().includes(searchValue)))
      }
    );
    props.onCrystalSearch(matchingCrystals);
  }, [crystals, searchState]);

  return (
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
  )
}

export default SearchCrystals;