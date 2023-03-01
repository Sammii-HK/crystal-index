import { IncomingMessage } from "http";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

export async function getUserFromAPISession(req: IncomingMessage) {
  const session = await getSession({req});

  return session as (Session & {
    userId: string,
    role: 'unicorn' | 'admin' | 'user',
    username: string,
    email: string
  }) | null;
}