import { getToken } from "next-auth/jwt"
import withAuth, { NextRequestWithAuth } from "next-auth/middleware"
import { NextFetchEvent, NextResponse } from "next/server"
import routes from "@/constants/routes"
import rateLimiter from "@/rate-limiter"

const AUTH_SECRET = process.env.AUTH_SECRET

const ADMIN_PATH = "/admin/"

export default async function middleware(
  req: NextRequestWithAuth,
  event: NextFetchEvent
) {
  const shouldBeBlocked = rateLimiter(req.ip!)

  if (shouldBeBlocked) return new NextResponse(null, { status: 429 })

  if (req.nextUrl.pathname.includes(ADMIN_PATH)) {
    const token = await getToken({ req, secret: AUTH_SECRET })
    const isAuthenticated = !!token

    if (req.nextUrl.pathname.includes(routes.admin.signin)) {
      if (isAuthenticated) {
        return NextResponse.redirect(new URL(routes.admin.indicators, req.url))
      }

      return
    }
  }

  const authMiddleware = withAuth({
    secret: AUTH_SECRET,
  })

  return authMiddleware(req, event)
}
