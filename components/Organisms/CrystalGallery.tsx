import { useRouter } from 'next/router';
import {BImage } from '../../components/Atoms';
import { ViewCrystalsProps } from '../../lib/types/crystal';
import classNames from 'classnames';

const CrystalGallery:React.FC<ViewCrystalsProps> = (props) => {
  const crystals = props.crystals;
  const galleryView = props.galleryView
  const router = useRouter();

  if (!crystals) return <p>Crystals not found</p>;

  return (
    <div className={
      classNames(
        'columns is-multiline', 
        {
          'location-crystal-gallery': galleryView,
          'mt-0': galleryView,
          'mt-5': !galleryView,
        },
      )
    }>
      {crystals.map(crystal => (
        <div key={crystal.id} 
        className={
          classNames('column', 'is-4', {
            "is-12": galleryView === 'location',
            // "is-4": galleryView === 'profile',
          })
        }>
          <a onClick={() => router.push(`/crystals/${crystal.id}`)}>
            <BImage imageId={crystal.image[0]} />
          </a>
        </div>
      ))}
    </div>
  )
}

export default CrystalGallery
