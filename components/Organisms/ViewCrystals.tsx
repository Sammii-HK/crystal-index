'use client'

import { useState } from 'react';
import CrystalGallery from '../../components/Organisms/CrystalGallery';
import { SerialisableCrystalWithUser, ViewCrystalsProps } from '../../lib/types/crystal';
import SearchCrystals from '../../components/Molecules/SearchCrystals';

export default function ViewCrystals(props: ViewCrystalsProps) {
  const crystals = props.crystals;
  console.log("crystals", crystals);
  
  const [matchingCrystals, setMatchingCrystals] = useState<SerialisableCrystalWithUser[]>(crystals || [])

  return (
    <div className="section">
      <SearchCrystals crystals={crystals} onCrystalSearch={setMatchingCrystals} />
      <CrystalGallery crystals={matchingCrystals} galleryView={props.galleryView} />
    </div>
  )
};
