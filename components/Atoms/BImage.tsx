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
  fill?: boolean // For responsive containers
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
  fill = false,
}) => {
  // Prefer blobUrl for better performance (CDN, optimized)
  // Fallback to API route for backward compatibility
  const src = blobUrl || (imageId ? `/api/image/${imageId}` : '/placeholder-crystal.jpg')

  // For responsive containers, use fill prop
  if (fill) {
    return (
      <figure className={`image is-square ${className}`} style={{ position: 'relative', width: '100%', height: '100%' }}>
        <Image
          src={src}
          alt={alt}
          fill
          quality={85}
          priority={priority}
          sizes={sizes}
          style={{ objectFit: 'cover' }}
          loading={priority ? undefined : 'lazy'}
        />
      </figure>
    )
  }

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

