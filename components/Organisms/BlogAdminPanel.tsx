'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  published: boolean
  publishedAt: Date | null
  createdAt: Date
  tags: string[]
}

interface Crystal {
  id: number
  name: string
  chakra: string[]
  colour: string[]
}

interface BlogAdminPanelProps {
  blogPosts: BlogPost[]
  crystals: Crystal[]
}

export default function BlogAdminPanel({ blogPosts, crystals }: BlogAdminPanelProps) {
  const router = useRouter()
  const [selectedCrystal, setSelectedCrystal] = useState<number | null>(null)
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleGenerate = useCallback(async () => {
    if (!selectedCrystal) {
      setError('Please select a crystal')
      return
    }

    setGenerating(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch('/api/blog/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          crystalId: selectedCrystal,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to generate blog post')
      }

      const data = await response.json()
      setSuccess(`Blog post "${data.blogPost.title}" generated successfully!`)
      setSelectedCrystal(null)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setGenerating(false)
    }
  }, [selectedCrystal, router])

  const handlePublish = useCallback(async (postId: string, published: boolean) => {
    try {
      const response = await fetch(`/api/blog/${postId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          published,
          publishedAt: published ? new Date().toISOString() : null,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update blog post')
      }

      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update')
    }
  }, [router])

  return (
    <div className="blog-admin-panel">
      {/* Generate New Blog Post */}
      <div className="box mb-5">
        <h2 className="title is-4">Generate New Blog Post</h2>
        
        <div className="field">
          <label className="label">Select Crystal</label>
          <div className="control">
            <div className="select is-fullwidth">
              <select
                value={selectedCrystal || ''}
                onChange={(e) => setSelectedCrystal(e.target.value ? parseInt(e.target.value) : null)}
                disabled={generating}
              >
                <option value="">Choose a crystal...</option>
                {crystals.map((crystal) => (
                  <option key={crystal.id} value={crystal.id}>
                    {crystal.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="field">
          <div className="control">
            <button
              className="button is-primary"
              onClick={handleGenerate}
              disabled={!selectedCrystal || generating}
            >
              {generating ? 'Generating...' : 'Generate Blog Post'}
            </button>
          </div>
        </div>

        {error && (
          <div className="notification is-danger is-light mt-4">
            <button className="delete" onClick={() => setError(null)}></button>
            {error}
          </div>
        )}

        {success && (
          <div className="notification is-success is-light mt-4">
            <button className="delete" onClick={() => setSuccess(null)}></button>
            {success}
          </div>
        )}
      </div>

      {/* Blog Posts List */}
      <div className="box">
        <h2 className="title is-4">Blog Posts ({blogPosts.length})</h2>
        
        {blogPosts.length === 0 ? (
          <p className="has-text-grey">No blog posts yet. Generate one above!</p>
        ) : (
          <div className="table-container">
            <table className="table is-fullwidth is-striped">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Published</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogPosts.map((post) => (
                  <tr key={post.id}>
                    <td>
                      <Link href={`/blog/${post.slug}`} className="has-text-link">
                        {post.title}
                      </Link>
                    </td>
                    <td>
                      <span className={`tag ${post.published ? 'is-success' : 'is-warning'}`}>
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td>
                      {new Date(post.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      {post.publishedAt 
                        ? new Date(post.publishedAt).toLocaleDateString()
                        : '-'}
                    </td>
                    <td>
                      <div className="buttons">
                        <Link
                          href={`/admin/blog/${post.id}/edit`}
                          className="button is-small is-light"
                        >
                          Edit
                        </Link>
                        <button
                          className={`button is-small ${post.published ? 'is-warning' : 'is-success'}`}
                          onClick={() => handlePublish(post.id, !post.published)}
                        >
                          {post.published ? 'Unpublish' : 'Publish'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

