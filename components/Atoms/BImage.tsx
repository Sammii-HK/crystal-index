import Image from 'next/image'

type BImageProps = {
  imageId?: number
  blobUrl?: string
  alt?: string
  width?: number
  height?: number
  priority?: boolean
  className?: string
  sizes?: string
}

const BImage: React.FC<BImageProps> = ({
  imageId,
  blobUrl,
  alt = 'Picture of a crystal',
  width = 500,
  height = 500,
  priority = false,
  className = '',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
}) => {
  // Support both old API route and new Blob URLs
  const src = blobUrl || (imageId ? `/api/image/${imageId}` : '/placeholder-crystal.jpg')

  return (
    <figure className={`image is-square ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        quality={85}
        priority={priority}
        sizes={sizes}
        style={{ objectFit: 'cover' }}
        loading={priority ? undefined : 'lazy'}
      />
    </figure>
  )
}

export default BImage

