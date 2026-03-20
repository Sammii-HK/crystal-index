'use client'

import { useState } from 'react';
import CrystalGallery from '../../components/Organisms/CrystalGallery';
import { SerialisableCrystalWithUser, ViewCrystalsProps } from '../../lib/types/crystal';
import SearchCrystals from '../../components/Molecules/SearchCrystals';
import BackToTop from '../Atoms/BackToTop';

export default function ViewCrystals(props: ViewCrystalsProps) {
  const crystals = props.crystals;

  const [matchingCrystals, setMatchingCrystals] = useState<SerialisableCrystalWithUser[]>(crystals || [])

  return (
    <div className="section">
      <SearchCrystals crystals={crystals} onCrystalSearch={setMatchingCrystals} />
      <CrystalGallery crystals={matchingCrystals} galleryView={props.galleryView} />
      <BackToTop />
    </div>
  )
};
