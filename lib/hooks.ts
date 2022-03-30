import { useSession } from "next-auth/react"
import React from "react";

export type RestrictedReactFC<P> = React.FC<P> & {
  requireAuth: boolean | false
}

export default function useUserId() {
  const { data: session, status } = useSession();
  return { userId: session?.userId as string | undefined, status};
}