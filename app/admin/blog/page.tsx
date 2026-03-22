export const dynamic = 'force-dynamic'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getSessionApp } from '../../../lib/session-app'
import { prisma } from '../../../lib/prisma'
import BlogAdminPanel from '../../../components/Organisms/BlogAdminPanel'

export const metadata: Metadata = {
  title: 'Blog Admin - Crystal Index',
  description: 'Manage and generate blog posts',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function BlogAdminPage() {
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

  // Get all blog posts
  const blogPosts = await prisma().blogPost.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      // Note: authorId is optional, so we might not have author relation
    },
  })

  // Get all crystals for generation
  const crystals = await prisma().crystal.findMany({
    select: {
      id: true,
      name: true,
      chakra: true,
      colour: true,
    },
    orderBy: { name: 'asc' },
  })

  return (
    <div className="container mt-5">
      <div className="box">
        <h1 className="title is-3">Blog Admin</h1>
        <p className="subtitle is-6">Generate and manage AI-powered blog posts</p>
        
        <BlogAdminPanel 
          blogPosts={blogPosts}
          crystals={crystals}
        />
      </div>
    </div>
  )
}

