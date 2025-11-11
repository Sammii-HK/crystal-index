import { getServerSession } from 'next-auth'
import { authOptions } from '../pages/api/auth/[...nextauth]'
import { UserSession } from './types/user'

/**
 * Get session in App Router (Server Components, Route Handlers)
 */
export async function getSessionApp(): Promise<UserSession | null> {
  const session = await getServerSession(authOptions)
  return session as UserSession | null
}



