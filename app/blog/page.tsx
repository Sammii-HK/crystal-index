export const dynamic = 'force-dynamic'
import { Metadata } from 'next'
import { prisma } from '../../lib/prisma'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Crystal Blog - Crystal Index',
  description: 'Discover in-depth guides, meanings, and insights about crystals. Learn about healing properties, chakras, and how to use crystals in your spiritual practice.',
  openGraph: {
    title: 'Crystal Blog - Crystal Index',
    description: 'Discover in-depth guides about crystals, their meanings, and healing properties.',
  },
}

export const revalidate = 3600 // Revalidate every hour

export default async function BlogPage() {
  const blogPosts = await prisma().blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
    take: 20,
  })

  return (
    <div className="container mt-5">
      <div className="has-text-centered mb-6">
        <h1 className="title is-2">Crystal Blog</h1>
        <p className="subtitle is-5">
          Discover the world of crystals through our comprehensive guides
        </p>
      </div>

      {blogPosts.length === 0 ? (
        <div className="box has-text-centered">
          <p>No blog posts yet. Check back soon!</p>
        </div>
      ) : (
        <div className="columns is-multiline">
          {blogPosts.map((post) => (
            <div key={post.id} className="column is-4">
              <Link href={`/blog/${post.slug}`}>
                <div className="card">
                  {post.featuredImage && (
                    <div className="card-image">
                      <figure className="image is-16by9">
                        <Image
                          src={post.featuredImage}
                          alt={post.title}
                          width={400}
                          height={225}
                          style={{ objectFit: 'cover' }}
                        />
                      </figure>
                    </div>
                  )}
                  <div className="card-content">
                    <h3 className="title is-5">{post.title}</h3>
                    {post.excerpt && (
                      <p className="is-size-7 has-text-grey mb-3">
                        {post.excerpt}
                      </p>
                    )}
                    {post.tags.length > 0 && (
                      <div className="tags">
                        {post.tags.slice(0, 3).map((tag, i) => (
                          <span key={i} className="tag is-light">{tag}</span>
                        ))}
                      </div>
                    )}
                    {post.publishedAt && (
                      <p className="is-size-7 has-text-grey mt-3">
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

