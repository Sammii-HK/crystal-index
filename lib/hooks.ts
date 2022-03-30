import { useSession } from "next-auth/react"

import React from "react";

export type RestrictedReactFC<P> = React.FC<P> & {
  requireAuth: boolean | false
}

export default function useUser() {
  const { data: session, status } = useSession();  
  return {
    userId: session?.userId as string | undefined,
    role: session?.role as string | undefined,
    userName: session?.user?.name,
    status
  };
}