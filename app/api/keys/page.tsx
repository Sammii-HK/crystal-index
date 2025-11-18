import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getSessionApp } from '../../../lib/session-app'
import { prisma } from '../../../lib/prisma'
import ApiKeyManager from '../../../components/Organisms/ApiKeyManager'

export const metadata: Metadata = {
  title: 'API Keys - Crystal Index',
  description: 'Manage your API keys for Crystal Index API access',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function ApiKeysPage() {
  const session = await getSessionApp()
  
  if (!session?.userId) {
    redirect('/api/auth/signin')
  }

  // Check if user has RETAIL plan
  const user = await prisma().user.findUnique({
    where: { id: session.userId },
    select: { plan: true },
  })

  if (user?.plan !== 'RETAIL') {
    redirect('/pricing')
  }

  return (
    <div className="container mt-5">
      <div className="box">
        <h1 className="title is-3">API Keys</h1>
        <p className="subtitle is-6">
          Manage API keys for programmatic access to Crystal Index
        </p>
        
        <ApiKeyManager />
      </div>
    </div>
  )
}

