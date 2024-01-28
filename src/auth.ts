import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"

import { prisma } from "@/utils/connect"
import authConfig from "./auth.config"
import { getUserById } from "./data/user"



export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user }) {

      return true;
    },
  },
  adapter: PrismaAdapter(prisma),
  session:{ strategy: "jwt"},
  ...authConfig,
})