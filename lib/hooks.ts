import { useSession } from "next-auth/react"

import React from "react";

export type RestrictedReactFC<P> = React.FC<P> & {
  requireAuth: boolean | false
}

export default function useUser() {
  const { data: session, status } = useSession();
  return session && {
    userId: session.userId as string,
    role: session.role as 'unicorn' | 'admin' | 'user',
    username: (session.username as string | undefined) || session?.user?.name!,
    email: session.user!.email!,
    status
    // status: as 'authenticated' | 'unauthenticated'
  };
}