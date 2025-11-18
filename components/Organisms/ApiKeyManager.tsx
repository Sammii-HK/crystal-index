'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

interface ApiKey {
  id: string
  name: string | null
  lastUsedAt: Date | null
  createdAt: Date
}

export default function ApiKeyManager() {
  const router = useRouter()
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([])
  const [loading, setLoading] = useState(true)
  const [newKeyName, setNewKeyName] = useState('')
  const [creating, setCreating] = useState(false)
  const [newKey, setNewKey] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const loadKeys = useCallback(async () => {
    try {
      const response = await fetch('/api/keys')
      if (!response.ok) {
        throw new Error('Failed to load API keys')
      }
      const data = await response.json()
      setApiKeys(data.apiKeys)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load API keys')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadKeys()
  }, [loadKeys])

  const handleCreate = useCallback(async () => {
    setCreating(true)
    setError(null)
    setNewKey(null)

    try {
      const response = await fetch('/api/keys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newKeyName || undefined }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to create API key')
      }

      const data = await response.json()
      setNewKey(data.key)
      setNewKeyName('')
      loadKeys()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create API key')
    } finally {
      setCreating(false)
    }
  }, [newKeyName, loadKeys])

  const handleDelete = useCallback(async (id: string) => {
    if (!confirm('Are you sure you want to delete this API key? This action cannot be undone.')) {
      return
    }

    try {
      const response = await fetch(`/api/keys/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete API key')
      }

      loadKeys()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete API key')
    }
  }, [loadKeys])

  if (loading) {
    return <p>Loading API keys...</p>
  }

  return (
    <div className="api-key-manager">
      {/* New Key Creation */}
      <div className="box mb-5">
        <h2 className="title is-4">Create New API Key</h2>
        
        {newKey && (
          <div className="notification is-success is-light mb-4">
            <button className="delete" onClick={() => setNewKey(null)}></button>
            <p className="is-size-6"><strong>API Key Created!</strong></p>
            <p className="is-size-7 mt-2">
              <strong>Save this key securely. It will not be shown again.</strong>
            </p>
            <pre className="has-background-grey-dark has-text-white p-3 mt-3">
              <code>{newKey}</code>
            </pre>
            <button
              className="button is-small mt-3"
              onClick={() => {
                navigator.clipboard.writeText(newKey)
                alert('Copied to clipboard!')
              }}
            >
              Copy to Clipboard
            </button>
          </div>
        )}

        <div className="field has-addons">
          <div className="control is-expanded">
            <input
              className="input"
              type="text"
              placeholder="Key name (optional)"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              disabled={creating}
            />
          </div>
          <div className="control">
            <button
              className="button is-primary"
              onClick={handleCreate}
              disabled={creating}
            >
              {creating ? 'Creating...' : 'Create API Key'}
            </button>
          </div>
        </div>

        {error && (
          <div className="notification is-danger is-light mt-4">
            <button className="delete" onClick={() => setError(null)}></button>
            {error}
          </div>
        )}
      </div>

      {/* Existing Keys */}
      <div className="box">
        <h2 className="title is-4">Your API Keys</h2>
        
        {apiKeys.length === 0 ? (
          <p className="has-text-grey">No API keys yet. Create one above!</p>
        ) : (
          <div className="table-container">
            <table className="table is-fullwidth is-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Created</th>
                  <th>Last Used</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {apiKeys.map((key) => (
                  <tr key={key.id}>
                    <td>{key.name || 'Unnamed'}</td>
                    <td>{new Date(key.createdAt).toLocaleDateString()}</td>
                    <td>
                      {key.lastUsedAt
                        ? new Date(key.lastUsedAt).toLocaleDateString()
                        : 'Never'}
                    </td>
                    <td>
                      <button
                        className="button is-small is-danger is-light"
                        onClick={() => handleDelete(key.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="notification is-info is-light mt-4">
          <p className="is-size-7">
            <strong>Security Tips:</strong>
          </p>
          <ul className="is-size-7 mt-2">
            <li>Never share your API keys publicly</li>
            <li>Rotate keys regularly</li>
            <li>Delete unused keys</li>
            <li>Use environment variables to store keys in your applications</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

