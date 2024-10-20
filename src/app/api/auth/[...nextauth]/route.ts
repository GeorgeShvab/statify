import { User } from "@prisma/client"
import NextAuth, { User as NextAuthUser } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import userService from "@/services/user-service/UserService"
import serialize from "@/utils/serialize/serialize"

const AUTH_SECRET = process.env.AUTH_SECRET

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials?: Record<"email" | "password", string>) {
        if (!credentials) throw new Error("Incorrect email or password")

        const { password, email } = credentials

        const user = await userService.validate(email, password)

        if (!user) throw new Error("Incorrect email or password")

        return serialize(user) as unknown as NextAuthUser
      },
    }),
  ],
  pages: { signIn: "/admin/signin", signOut: "/admin/signout" },
  secret: AUTH_SECRET,
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          username: token.username,
          createdAt: token.createdAt,
          updatedAt: token.updatedAt,
        },
      }
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as User

        return {
          ...token,
          id: u.id,
          username: u.username,
          createdAt: u.createdAt,
          updatedAt: u.updatedAt,
        }
      }
      return token
    },
  },
})

export { handler as GET, handler as POST }
