import { NextApiHandler } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter"

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const options: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.COOKIE_SECRET,
  callbacks: {
    async session({ session, token, user }) {
      session.userId = user.id;
      session.role = user.role;
      return session
    }
  }
};

// we will define `options` up next
const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

