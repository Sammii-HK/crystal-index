import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getSessionApp } from '../../../lib/session-app'
import { prisma } from '../../../lib/prisma'
import UserManagementPanel from '../../../components/Organisms/UserManagementPanel'

export const metadata: Metadata = {
  title: 'User Management - Crystal Index',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function UserManagementPage() {
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

  // Get all users
  const users = await prisma().user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      plan: true,
      credits: true,
      subscriptionStatus: true,
      createdAt: true,
      _count: {
        select: {
          identifications: true,
          collections: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="container mt-5">
      <div className="box">
        <h1 className="title is-3">User Management</h1>
        <p className="subtitle is-6">Manage users, plans, and credits</p>
        
        <UserManagementPanel users={users} />
      </div>
    </div>
  )
}

