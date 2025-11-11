import { Metadata } from 'next'
import { getSessionApp } from '../../lib/session-app'
import { prisma } from '../../lib/prisma'
import { redirect } from 'next/navigation'
import CollectionGallery from '../../components/Organisms/CollectionGallery'

export const metadata: Metadata = {
  title: 'My Collection',
  description: 'View and manage your crystal collection.',
  robots: {
    index: false, // Private page
  },
}

export const revalidate = 0 // Always fetch fresh data for user collections

export default async function CollectionsPage() {
  const session = await getSessionApp()

  if (!session?.userId) {
    redirect('/api/auth/signin')
  }

  const collections = await prisma().userCrystal.findMany({
    where: { userId: session.userId },
    include: {
      crystal: {
        include: {
          crystalInfo: true,
          image: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="container mt-5">
      <h1 className="title is-2 mb-5">My Crystal Collection</h1>
      <CollectionGallery collections={collections} />
    </div>
  )
}



