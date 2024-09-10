import userService from "@/services/UserService"
import serialize from "@/utils/serialize/serialize"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const AUTH_SECRET = process.env.AUTH_SECRET
if (!AUTH_SECRET) throw new Error("AUTH_SECRET is not found")

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

        return serialize(user) as any
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
        const u = user as unknown as any
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
