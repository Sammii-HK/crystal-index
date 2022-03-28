import useUserId from '../../lib/hooks';
import prisma from '../../lib/prisma';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router'
import { useCallback } from 'react';
import { BImage } from '../../components/Atoms';

const ViewCrystal: React.FC<ViewCrystalProps> = (props) => {
  const crystals = props.crystals;
  const router = useRouter();
  
  const viewCrystal = useCallback(async (id: number) => {
    router.push(`/crystals/${id}`)
  }, []);

  if (!crystals) return <p>Crystals not found</p>;

  return (
    <div className="section">
      <div className="columns">
        {crystals.map(crystal => (
          <div className="column is-4">
            <a onClick={() => viewCrystal(crystal.id)}>
              <BImage imageId={crystal.image[0]} />
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ViewCrystal;

type ViewCrystalProps = {
  crystals: null | SerialisableCrystal[]
}

// type SerialisableCrystal = Omit<Crystal, 'createdAt' | 'updatedAt'>
type SerialisableCrystal = {
  id: number,
  name: string,
  image: number[],
}

export const getServerSideProps: GetServerSideProps<ViewCrystalProps> = async (context) => {

  const crystalsResults = await prisma.crystal.findMany({
    include: { image: true }
  });

  const serialisableCrystals = crystalsResults.map(crystal => {
    return {
      id: crystal.id,
      name: crystal.name,
      image: crystal.image.map(image => image.id)
    }
  })

  return { props: {crystals: serialisableCrystals }}
}
