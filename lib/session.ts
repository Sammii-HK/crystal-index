import { IncomingMessage } from "http";
import { GetServerSidePropsContext } from "next";
import { Session, getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { UserSession } from "./types/user";

export async function getUserFromAPISession(req: IncomingMessage) {
  const session = await getSession({req});

  return session as UserSession | null;
}

export async function getUserFromServerSidePropsContext(context: GetServerSidePropsContext) {
  const session = await getServerSession(
    context,
    authOptions
  );

  return session as UserSession | null;
}
