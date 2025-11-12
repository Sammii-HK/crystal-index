import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container mt-5">
      <div className="box has-text-centered">
        <h2 className="title is-4">Blog Post Not Found</h2>
        <p className="mb-4">The blog post you're looking for doesn't exist or hasn't been published yet.</p>
        <Link href="/blog" className="button is-primary">
          Back to Blog
        </Link>
      </div>
    </div>
  )
}

