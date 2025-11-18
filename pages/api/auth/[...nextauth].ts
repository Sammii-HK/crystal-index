import { NextApiHandler } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
// Optional: Keep GitHub/Google as additional providers
// import GithubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter"

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER!,
      // Optional: Add additional providers alongside Auth0
      // GithubProvider({
      //   clientId: process.env.GITHUB_ID,
      //   clientSecret: process.env.GITHUB_SECRET,
      // }),
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
const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, authOptions);
export default authHandler;

