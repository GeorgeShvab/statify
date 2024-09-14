import { getToken } from "next-auth/jwt"
import withAuth, { NextRequestWithAuth } from "next-auth/middleware"
import { NextFetchEvent, NextResponse } from "next/server"
import routes from "@/constants/routes"

const AUTH_SECRET = process.env.AUTH_SECRET
if (!AUTH_SECRET) throw new Error("AUTH_SECRET is not found")

export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] }

export default async function middleware(
  req: NextRequestWithAuth,
  event: NextFetchEvent
) {
  const token = await getToken({ req, secret: AUTH_SECRET })
  const isAuthenticated = !!token

  if (req.nextUrl.pathname.includes(routes.admin.signin)) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL(routes.admin.indicators, req.url))
    }

    return
  }

  const authMiddleware = withAuth({
    secret: AUTH_SECRET,
  })

  return authMiddleware(req, event)
}
