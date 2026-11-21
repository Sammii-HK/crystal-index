'use client'

import { useEffect, useState } from 'react'
import { ImageOff } from 'lucide-react'
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

  const [failed, setFailed] = useState(false)
  useEffect(() => { setFailed(false) }, [src])

  if (failed) return <figure className={`image is-square ${className}`} role={alt ? 'img' : undefined} aria-label={alt ? `${alt}: image unavailable` : undefined} aria-hidden={alt ? undefined : true} style={{position:'relative',width:'100%',padding:0,height:fill?'100%':height,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:12,background:'var(--ci-surface)',color:'var(--ci-text-muted)'}}><ImageOff size={28} aria-hidden /><span style={{fontSize:12}}>Image unavailable</span></figure>

  // For responsive containers, use fill prop
  if (fill) {
    return (
      <figure className={`image ${className}`} style={{ position: 'relative', width: '100%', height: '100%' }}>
        <Image
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
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
        onError={() => setFailed(true)}
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

