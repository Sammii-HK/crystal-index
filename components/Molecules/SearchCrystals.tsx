import { useEffect, useState } from "react";
import { BField, BInput } from "../Atoms";
import { SerialisableCrystalWithUser } from "../../lib/types/crystal";
import { FaTimes } from "react-icons/fa";

const SearchCrystals: React.FC<
  {
    crystals: SerialisableCrystalWithUser[] | null,
    onCrystalSearch: (matchingCrystals: SerialisableCrystalWithUser[]) => void
  }
> = (props) => {
  const crystals = props.crystals;
  const [searchState, setSearchState] = useState<string>('')
  const [matchCount, setMatchCount] = useState<number | null>(null)

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
    setMatchCount(searchValue ? matchingCrystals.length : null);
  }, [crystals, searchState]);

  return (
    <BField>
      <div className="search-container" style={{ position: 'relative' }}>
        <BInput
          id="search"
          placeholder='Search by name, colours, chakra or location...'
          value={searchState}
          onChange={(newValue: string) => {
            setSearchState(newValue)
          }}
        />
        {searchState && (
          <button
            className="search-clear-btn"
            onClick={() => setSearchState('')}
            type="button"
            aria-label="Clear search"
          >
            <FaTimes />
          </button>
        )}
      </div>
      {matchCount !== null && (
        <p className="search-result-count">
          {matchCount} crystal{matchCount !== 1 ? 's' : ''} found
        </p>
      )}
    </BField>
  )
}

export default SearchCrystals;
