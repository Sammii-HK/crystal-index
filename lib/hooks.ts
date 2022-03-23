import { useSession } from "next-auth/react"

export default function useUserId() {
  const { data: session, status } = useSession();
  return { userId: session?.userId as string | undefined, status};
}