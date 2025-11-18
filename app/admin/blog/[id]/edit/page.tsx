import { Metadata } from 'next'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { getSessionApp } from '../../../../../lib/session-app'
import { prisma } from '../../../../../lib/prisma'
import BlogPostEditor from '../../../../../components/Organisms/BlogPostEditor'

export const metadata: Metadata = {
  title: 'Edit Blog Post - Crystal Index',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function EditBlogPostPage({
  params,
}: {
  params: { id: string }
}) {
  const session = await getSessionApp()
  
  if (!session?.userId) {
    redirect('/api/auth/signin')
  }

  // Check if user is admin
  const user = await prisma().user.findUnique({
    where: { id: session.userId },
    select: { role: true },
  })

  if (user?.role !== 'admin') {
    redirect('/')
  }

  // Get blog post
  const blogPost = await prisma().blogPost.findUnique({
    where: { id: params.id },
  })

  if (!blogPost) {
    notFound()
  }

  return (
    <div className="container mt-5">
      <div className="box">
        <div className="mb-4">
          <Link href="/admin/blog" className="button is-light">
            ← Back to Blog Admin
          </Link>
        </div>
        <h1 className="title is-3">Edit Blog Post</h1>
        
        <BlogPostEditor blogPost={blogPost} />
      </div>
    </div>
  )
}

