import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../lib/prisma"
import { checkCredentials } from "../../../lib/auth.js"

export default NextAuth({
  theme: {
    colorScheme: 'light',
    logo: '/icon.png'
  },
  session: {
    strategy: "jwt"
  },
  providers: [
    CredentialsProvider({
      credentials: {
        username: {
          label: "Email",
          type: "email"
        },
        password: {
          label: "Password",
          type: "password"
        }
      },
      async authorize(credentials) {
        return checkCredentials(credentials.email, credentials.password)
      }
    })
  ],
  pages: {
    signIn: '/account/signin'
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user
      return session
    },
    async jwt({ token, user }) {
      user && (token.user = user)

      return token
    }
  }
})