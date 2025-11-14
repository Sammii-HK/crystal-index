'use client'

import { useState, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import posthog from '../../lib/posthog'

interface IdentificationResult {
  id: string
  topMatches: Array<{ crystal: string; confidence: number }>
  confidence: number
  imageUrl: string
  processedImageUrl?: string | null
  watermarked: boolean
  remaining: number
}

export default function IdentifyCrystal() {
  const { data: session } = useSession()
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [removeBackground, setRemoveBackground] = useState(true)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<IdentificationResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setResult(null)
      setError(null)
      
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }, [])

  const handleSubmit = useCallback(async () => {
    if (!file || !session) {
      setError('Please sign in and select an image')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('image', file)
      formData.append('removeBackground', removeBackground.toString())

      const response = await fetch('/api/identify', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to identify crystal')
      }

      const data = await response.json()
      setResult(data)

      // Track in PostHog
      if (posthog) {
        posthog.capture('crystal_identification_completed', {
          confidence: data.confidence,
          crystal: data.topMatches[0]?.crystal,
        })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      if (posthog) {
        posthog.capture('crystal_identification_error', {
          error: err instanceof Error ? err.message : 'Unknown error',
        })
      }
    } finally {
      setLoading(false)
    }
  }, [file, session, removeBackground])

  if (!session) {
    return (
      <div className="box has-text-centered">
        <h2 className="title is-4">Sign in to identify crystals</h2>
        <p className="mb-4">Create an account to start identifying your crystals with AI.</p>
        <Link href="/api/auth/signin" className="button is-primary is-large">
          Sign In
        </Link>
      </div>
    )
  }

  return (
    <div className="identify-crystal">
      {/* Upload Section */}
      <div className="box">
        <h2 className="title is-4 mb-4">Upload Crystal Photo</h2>
        
        <div className="field">
          <div className="file is-boxed is-centered">
            <label className="file-label">
              <input
                className="file-input"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={loading}
              />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload"></i>
                </span>
                <span className="file-label">Choose an image...</span>
              </span>
            </label>
          </div>
        </div>

        {preview && (
          <div className="mt-4">
            <figure className="image is-square" style={{ maxWidth: '400px', margin: '0 auto' }}>
              <Image
                src={preview}
                alt="Preview"
                width={400}
                height={400}
                className="has-rounded-corners"
                style={{ objectFit: 'cover' }}
              />
            </figure>
          </div>
        )}

        <div className="field mt-4">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={removeBackground}
              onChange={(e) => setRemoveBackground(e.target.checked)}
              disabled={loading}
            />
            {' '}Remove background for better accuracy
          </label>
        </div>

        <button
          className="button is-primary is-large is-fullwidth mt-4"
          onClick={handleSubmit}
          disabled={!file || loading}
        >
          {loading ? 'Identifying...' : 'Identify Crystal'}
        </button>
      </div>

      {/* Results Section */}
      {result && (
        <div className="box mt-5">
          <h2 className="title is-4 mb-4">Identification Results</h2>
          
          {result.watermarked && (
            <div className="notification is-info is-light">
              <p className="is-size-7">
                💎 Upgrade to Pro to remove watermark and get unlimited identifications
              </p>
            </div>
          )}

          <div className="content">
            <h3 className="title is-5">
              Top Match: {result.topMatches[0]?.crystal}
            </h3>
            <p className="subtitle is-6">
              Confidence: {(result.confidence * 100).toFixed(1)}%
            </p>

            <div className="mt-4">
              <h4 className="title is-6">Top 5 Matches:</h4>
              <ul>
                {result.topMatches.map((match, index) => (
                  <li key={index}>
                    <strong>{match.crystal}</strong> - {(match.confidence * 100).toFixed(1)}%
                  </li>
                ))}
              </ul>
            </div>

            {result.processedImageUrl && (
              <div className="mt-4">
                <h4 className="title is-6">Processed Image:</h4>
                <figure className="image is-square" style={{ maxWidth: '300px' }}>
                  <Image
                    src={result.processedImageUrl}
                    alt="Processed crystal"
                    width={300}
                    height={300}
                    className="has-rounded-corners"
                    style={{ objectFit: 'cover' }}
                  />
                </figure>
              </div>
            )}

            {result.remaining !== Infinity && (
              <p className="mt-4 has-text-grey">
                Remaining identifications this month: {result.remaining}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="notification is-danger mt-4">
          <button className="delete" onClick={() => setError(null)}></button>
          {error}
        </div>
      )}
    </div>
  )
}



