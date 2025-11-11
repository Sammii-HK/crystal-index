'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Identification error:', error)
  }, [error])

  return (
    <div className="container mt-5">
      <div className="columns is-centered">
        <div className="column is-8">
          <div className="notification is-danger">
            <h2 className="title is-4">Something went wrong!</h2>
            <p>{error.message || 'An error occurred while identifying your crystal.'}</p>
            <button className="button is-light mt-3" onClick={reset}>
              Try again
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}



