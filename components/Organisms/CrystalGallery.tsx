import { useRouter } from 'next/router';
import {BImage } from '../../components/Atoms';
import { ViewCrystalsProps } from '../../lib/types/crystal';

const CrystalGallery:React.FC<ViewCrystalsProps> = (props) => {
  const crystals = props.crystals;
  const router = useRouter();

  if (!crystals) return <p>Crystals not found</p>;

  return (
    <div className="columns is-multiline mt-5">
      {crystals.map(crystal => (
        <div className="column is-4" key={crystal.id}>
          <a onClick={() => router.push(`/crystals/${crystal.id}`)}>
            <BImage imageId={crystal.image[0]} />
          </a>
        </div>
      ))}
    </div>
  )
}

export default CrystalGallery