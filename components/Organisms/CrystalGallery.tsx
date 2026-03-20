import { useRouter } from 'next/navigation';
import { BImage } from '../../components/Atoms';
import { ViewCrystalsProps } from '../../lib/types/crystal';
import classNames from 'classnames';
import { slugify } from '../../lib/helpers/slugify';

const COLOR_MAP: Record<string, string> = {
  red: '#c82020',
  pink: '#d72c70',
  orange: '#eb5e00',
  yellow: '#daa000',
  green: '#95c012',
  blue: '#16c3c3',
  indigo: '#0066cc',
  violet: '#9c4cc5',
  brown: '#663300',
  black: '#333',
  white: '#fff',
  clear: '#e0e0e0',
};

const CHAKRA_COLOUR_MAP: Record<string, string> = {
  root: '#c82020',
  sacral: '#eb5e00',
  'solar plexus': '#daa000',
  heart: '#95c012',
  throat: '#16c3c3',
  'third eye': '#0066cc',
  crown: '#9c4cc5',
};

const CrystalGallery: React.FC<ViewCrystalsProps> = (props) => {
  const crystals = props.crystals;
  const galleryView = props.galleryView;
  const router = useRouter();

  if (crystals === null) {
    return (
      <div className="empty-state">
        <div className="empty-state__icon">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 4L6 14v20l18 10 18-10V14L24 4z" stroke="#9333EA" strokeWidth="2" fill="none" opacity="0.4"/>
          </svg>
        </div>
        <div className="empty-state__title">Could not load crystals</div>
        <div className="empty-state__description">
          Something went wrong. Try refreshing the page.
        </div>
      </div>
    );
  }

  if (crystals.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state__icon">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="14" stroke="#9333EA" strokeWidth="2" fill="none" opacity="0.4"/>
            <path d="M30 30l12 12" stroke="#9333EA" strokeWidth="2" opacity="0.4"/>
          </svg>
        </div>
        <div className="empty-state__title">No crystals found</div>
        <div className="empty-state__description">
          Try adjusting your search or filters.
        </div>
      </div>
    );
  }

  return (
    <div className={
      classNames(
        'columns is-multiline',
        {
          'crystal-gallery': !galleryView || galleryView === 'mainGallery',
          'location-crystal-gallery': galleryView === 'location',
          'mt-0': galleryView === 'location',
          'mt-5': galleryView !== 'location',
        },
      )
    }>
      {crystals.map((crystal, index) => (
        <div
          key={crystal.id}
          className={classNames('column', {
            'is-4-desktop is-6-tablet is-12-mobile': galleryView !== 'location',
            'is-12': galleryView === 'location',
          })}
          style={{ animationDelay: `${Math.min(index * 0.04, 1.2)}s` }}
        >
          <div
            className="crystal-card"
            onClick={() => router.push(`/crystals/${crystal.slug || slugify(crystal.name)}`)}
          >
            <div className="crystal-card__image-wrap">
              <BImage
                imageId={typeof crystal.image[0] === 'object' ? crystal.image[0].id : crystal.image[0]}
                blobUrl={typeof crystal.image[0] === 'object' ? crystal.image[0].blobUrl : undefined}
                alt={crystal.name}
                fill
              />
            </div>
            <div className="crystal-card__overlay">
              <div className="crystal-card__meta">
                {crystal.crystalInfo?.chakra && crystal.crystalInfo.chakra.length > 0 && (
                  <span
                    className="crystal-card__chakra-badge"
                    style={{ backgroundColor: CHAKRA_COLOUR_MAP[crystal.crystalInfo.chakra[0].toLowerCase()] || '#9333EA' }}
                  >
                    {crystal.crystalInfo.chakra[0]}
                  </span>
                )}
              </div>
              <div className="crystal-card__name">{crystal.name}</div>
              {crystal.crystalInfo?.colour && crystal.crystalInfo.colour.length > 0 && (
                <div className="crystal-card__colors">
                  {crystal.crystalInfo.colour.slice(0, 5).map((color) => (
                    <span
                      key={color}
                      className="crystal-card__color-dot"
                      style={{
                        backgroundColor: COLOR_MAP[color.toLowerCase()] || '#999',
                        border: color.toLowerCase() === 'white' || color.toLowerCase() === 'clear' ? '1px solid #666' : 'none',
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CrystalGallery;
