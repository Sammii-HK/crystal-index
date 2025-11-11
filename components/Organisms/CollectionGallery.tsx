'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface CollectionItem {
  id: string
  customName?: string | null
  crystal?: {
    id: number
    name: string
    crystalInfo?: {
      info: string
      colour: string[]
      chakra: string[]
    } | null
    image: Array<{ id: number; blobUrl?: string | null }>
  } | null
  photos: string[]
  notes?: string | null
  tags: string[]
  createdAt: Date
}

interface CollectionGalleryProps {
  collections: CollectionItem[]
}

export default function CollectionGallery({ collections }: CollectionGalleryProps) {
  const [selectedCollection, setSelectedCollection] = useState<CollectionItem | null>(null)

  if (collections.length === 0) {
    return (
      <div className="box has-text-centered">
        <p className="mb-4">Your collection is empty.</p>
        <Link href="/identify" className="button is-primary">
          Identify Your First Crystal
        </Link>
      </div>
    )
  }

  return (
    <div className="collection-gallery">
      <div className="columns is-multiline">
        {collections.map((collection) => {
          const crystal = collection.crystal
          const displayName = collection.customName || crystal?.name || 'Unnamed Crystal'
          const imageUrl = collection.photos[0] || 
            crystal?.image[0]?.blobUrl || 
            (crystal?.image[0] ? `/api/image/${crystal.image[0].id}` : null)

          return (
            <div key={collection.id} className="column is-4">
              <div className="card">
                <div className="card-image">
                  {imageUrl ? (
                    <figure className="image is-square">
                      <Image
                        src={imageUrl}
                        alt={displayName}
                        width={400}
                        height={400}
                        style={{ objectFit: 'cover' }}
                        className="has-rounded-corners"
                      />
                    </figure>
                  ) : (
                    <div className="image is-square has-background-grey-lighter">
                      <div className="has-text-centered is-flex is-align-items-center is-justify-content-center" style={{ height: '100%' }}>
                        <span className="icon is-large">
                          <i className="fas fa-gem"></i>
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="card-content">
                  <h3 className="title is-5">{displayName}</h3>
                  {crystal?.crystalInfo && (
                    <div className="tags mb-2">
                      {crystal.crystalInfo.colour.map((color, i) => (
                        <span key={i} className="tag">{color}</span>
                      ))}
                    </div>
                  )}
                  {collection.tags.length > 0 && (
                    <div className="tags">
                      {collection.tags.map((tag, i) => (
                        <span key={i} className="tag is-light">{tag}</span>
                      ))}
                    </div>
                  )}
                  {collection.notes && (
                    <p className="mt-2 is-size-7">{collection.notes.substring(0, 100)}...</p>
                  )}
                  <div className="mt-3">
                    <button
                      className="button is-small is-light"
                      onClick={() => setSelectedCollection(collection)}
                    >
                      View Details
                    </button>
                    {crystal && (
                      <Link
                        href={`/crystals/${crystal.id}`}
                        className="button is-small ml-2"
                      >
                        View Crystal Info
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Detail Modal */}
      {selectedCollection && (
        <div className="modal is-active">
          <div className="modal-background" onClick={() => setSelectedCollection(null)}></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">
                {selectedCollection.customName || selectedCollection.crystal?.name || 'Collection Item'}
              </p>
              <button
                className="delete"
                onClick={() => setSelectedCollection(null)}
              ></button>
            </header>
            <section className="modal-card-body">
              {selectedCollection.notes && (
                <div className="content">
                  <h4>Notes</h4>
                  <p>{selectedCollection.notes}</p>
                </div>
              )}
              {selectedCollection.tags.length > 0 && (
                <div className="tags">
                  {selectedCollection.tags.map((tag, i) => (
                    <span key={i} className="tag">{tag}</span>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      )}
    </div>
  )
}



