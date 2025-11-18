'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  name: string | null
  email: string | null
  plan: string
  credits: number
  subscriptionStatus: string | null
  createdAt: Date
  _count: {
    identifications: number
    collections: number
  }
}

interface UserManagementPanelProps {
  users: User[]
}

export default function UserManagementPanel({ users }: UserManagementPanelProps) {
  const router = useRouter()
  const [updating, setUpdating] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleUpdatePlan = useCallback(async (userId: string, newPlan: string) => {
    setUpdating(userId)
    setError(null)

    try {
      const response = await fetch(`/api/admin/users/${userId}/plan`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan: newPlan }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to update plan')
      }

      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update')
    } finally {
      setUpdating(null)
    }
  }, [router])

  const handleUpdateCredits = useCallback(async (userId: string, credits: number) => {
    setUpdating(userId)
    setError(null)

    try {
      const response = await fetch(`/api/admin/users/${userId}/credits`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credits }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to update credits')
      }

      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update')
    } finally {
      setUpdating(null)
    }
  }, [router])

  const planLabels: Record<string, string> = {
    FREE: 'Free',
    PRO: 'Pro',
    COLLECTOR: 'Collector',
    RETAIL: 'Retail',
  }

  return (
    <div className="user-management-panel">
      {error && (
        <div className="notification is-danger is-light mb-4">
          <button className="delete" onClick={() => setError(null)}></button>
          {error}
        </div>
      )}

      <div className="table-container">
        <table className="table is-fullwidth is-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Plan</th>
              <th>Credits</th>
              <th>Status</th>
              <th>Activity</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name || 'N/A'}</td>
                <td>{user.email || 'N/A'}</td>
                <td>
                  <div className="select is-small">
                    <select
                      value={user.plan}
                      onChange={(e) => handleUpdatePlan(user.id, e.target.value)}
                      disabled={updating === user.id}
                    >
                      <option value="FREE">Free</option>
                      <option value="PRO">Pro</option>
                      <option value="COLLECTOR">Collector</option>
                      <option value="RETAIL">Retail</option>
                    </select>
                  </div>
                </td>
                <td>
                  <div className="field has-addons">
                    <div className="control">
                      <input
                        className="input is-small"
                        type="number"
                        value={user.credits}
                        onChange={(e) => {
                          const value = parseInt(e.target.value) || 0
                          if (value !== user.credits) {
                            handleUpdateCredits(user.id, value)
                          }
                        }}
                        disabled={updating === user.id}
                        style={{ width: '80px' }}
                      />
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`tag ${
                    user.subscriptionStatus === 'active' ? 'is-success' : 'is-light'
                  }`}>
                    {user.subscriptionStatus || 'N/A'}
                  </span>
                </td>
                <td>
                  <span className="is-size-7">
                    {user._count.identifications} IDs, {user._count.collections} collections
                  </span>
                </td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  {updating === user.id && (
                    <span className="is-size-7 has-text-grey">Updating...</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="notification is-info is-light mt-4">
        <p className="is-size-7">
          <strong>Total Users:</strong> {users.length}
        </p>
      </div>
    </div>
  )
}

