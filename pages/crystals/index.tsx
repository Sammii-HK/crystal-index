import prisma from '../../lib/prisma';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router'
import { Crystal } from '@prisma/client';
import { useCallback, useMemo, useState } from 'react';
import { BField, BImage, BInput } from '../../components/Atoms';

type ViewCrystalsProps = {
  crystals: null | SerialisableCrystal[]
}

type SerialisableCrystal = Omit<Crystal, 'createdAt' | 'updatedAt'> & 
{
  id: number,
  name: string,
  image: number[],
}
& {createdAt: string, updatedAt: string}

const ViewCrystals: React.FC<ViewCrystalsProps> = (props) => {
  const crystals = props.crystals;
  const router = useRouter();

  const [searchState, setSearchState] = useState<string>('')

  const searchResults = useMemo(() => {
    const searchValue = searchState.toLowerCase();

    return  (crystals || []).filter(crystal => { 
      return (crystal.name && crystal.name.toLowerCase().includes(searchValue)) 
          || (crystal.memento && crystal.memento.toLowerCase().includes(searchValue))
          || (crystal.origin && crystal.origin.toLowerCase().includes(searchValue))
          // || (crystal.colour && crystal.colour.map(colour => colour.includes(searchValue)))
          || (crystal.chakra && crystal.chakra.includes(searchValue));
      }
    )
  }, [crystals, searchState]);

  if (!crystals) return <p>Crystals not found</p>;

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
      
      <div className="columns is-multiline mt-5">
        {searchResults.map(crystal => (
          <div className="column is-4" key={crystal.id}>
            <a onClick={() => router.push(`/crystals/${crystal.id}`)}>
              <BImage imageId={crystal.image[0]} />
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ViewCrystals;

export const getServerSideProps: GetServerSideProps<ViewCrystalsProps> = async (context) => {

  const crystalsResults = await prisma().crystal.findMany({
    include: { 
        createdBy: {select: {name: true}},
        image: {select: {id: true}},
        originLocation: {select: {placeName: true}},
        mementoLocation: {select: {placeName: true}},
      },
  });

  const serialisableCrystals = crystalsResults.map(crystal => crystal && {
    ...crystal,
    createdAt: crystal.createdAt.toISOString(),
    updatedAt: crystal.updatedAt.toISOString(),
    image: crystal.image.map(image => image.id),
    createdBy: crystal.createdBy.name,
    mementoLocation: crystal.mementoLocation?.placeName || null,
    originLocation: crystal.originLocation?.placeName || null,
  })

  return { props: { crystals: serialisableCrystals }}
}

