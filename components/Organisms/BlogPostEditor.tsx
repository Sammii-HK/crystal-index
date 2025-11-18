'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'

interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  seoTitle: string | null
  seoDescription: string | null
  tags: string[]
  published: boolean
}

interface BlogPostEditorProps {
  blogPost: BlogPost
}

export default function BlogPostEditor({ blogPost }: BlogPostEditorProps) {
  const router = useRouter()
  const [title, setTitle] = useState(blogPost.title)
  const [content, setContent] = useState(blogPost.content)
  const [excerpt, setExcerpt] = useState(blogPost.excerpt || '')
  const [seoTitle, setSeoTitle] = useState(blogPost.seoTitle || '')
  const [seoDescription, setSeoDescription] = useState(blogPost.seoDescription || '')
  const [tags, setTags] = useState(blogPost.tags.join(', '))
  const [published, setPublished] = useState(blogPost.published)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSave = useCallback(async () => {
    setSaving(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch(`/api/blog/${blogPost.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          excerpt,
          seoTitle,
          seoDescription,
          tags: tags.split(',').map(t => t.trim()).filter(Boolean),
          published,
          publishedAt: published ? new Date().toISOString() : null,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to save blog post')
      }

      setSuccess('Blog post saved successfully!')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setSaving(false)
    }
  }, [title, content, excerpt, seoTitle, seoDescription, tags, published, blogPost.id, router])

  return (
    <div className="blog-post-editor">
      <div className="field">
        <label className="label">Title</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Content</label>
        <div className="control">
          <textarea
            className="textarea"
            rows={20}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Blog post content..."
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Excerpt</label>
        <div className="control">
          <textarea
            className="textarea"
            rows={3}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Short excerpt for preview..."
          />
        </div>
      </div>

      <div className="columns">
        <div className="column">
          <div className="field">
            <label className="label">SEO Title</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <label className="label">Tags (comma-separated)</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="crystal, healing, chakra"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="field">
        <label className="label">SEO Description</label>
        <div className="control">
          <textarea
            className="textarea"
            rows={2}
            value={seoDescription}
            onChange={(e) => setSeoDescription(e.target.value)}
            placeholder="Meta description for search engines..."
          />
        </div>
      </div>

      <div className="field">
        <label className="checkbox">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
          {' '}Published
        </label>
      </div>

      <div className="field is-grouped mt-5">
        <div className="control">
          <button
            className="button is-primary"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
        <div className="control">
          <a
            href={`/blog/${blogPost.slug}`}
            className="button is-light"
            target="_blank"
            rel="noopener noreferrer"
          >
            Preview
          </a>
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
  )
}

