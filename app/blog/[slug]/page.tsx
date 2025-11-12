import { Metadata } from 'next'
import { prisma } from '../../../lib/prisma'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { ArticleSchema, BreadcrumbSchema } from '../../../components/common/StructuredData'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await prisma().blogPost.findUnique({
    where: { slug: params.slug },
  })

  if (!post || !post.published) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt || undefined,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt || undefined,
      images: post.featuredImage ? [post.featuredImage] : undefined,
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
      tags: post.tags,
    },
  }
}

export const revalidate = 3600 // Revalidate every hour

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await prisma().blogPost.findUnique({
    where: { slug: params.slug },
  })

  if (!post || !post.published) {
    notFound()
  }

  return (
    <article className="container mt-5">
      <ArticleSchema
        title={post.title}
        description={post.seoDescription || post.excerpt || undefined}
        image={post.featuredImage || undefined}
        publishedAt={post.publishedAt || undefined}
        updatedAt={post.updatedAt}
        tags={post.tags}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
          { name: post.title, url: `/blog/${post.slug}` },
        ]}
      />
      <div className="columns is-centered">
        <div className="column is-8">
          {post.featuredImage && (
            <figure className="image is-16by9 mb-5">
              <Image
                src={post.featuredImage}
                alt={post.title}
                width={1200}
                height={675}
                priority
                style={{ objectFit: 'cover' }}
                className="has-rounded-corners"
              />
            </figure>
          )}

          <h1 className="title is-1">{post.title}</h1>

          {post.publishedAt && (
            <p className="subtitle is-6 has-text-grey mb-4">
              Published {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          )}

          {post.tags.length > 0 && (
            <div className="tags mb-5">
              {post.tags.map((tag, i) => (
                <span key={i} className="tag is-primary">{tag}</span>
              ))}
            </div>
          )}

          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
    </article>
  )
}

