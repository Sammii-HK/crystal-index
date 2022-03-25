import { useSession } from "next-auth/react"
import type { NextPage } from 'next'
import React from "react";

export type RestrictedReactFC = React.FC & {
  requireAuth: boolean | false;
}

export default function useUserId() {
  const { data: session, status } = useSession();
  return { userId: session?.userId as string | undefined, status};
}