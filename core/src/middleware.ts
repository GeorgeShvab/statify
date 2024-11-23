import { getToken } from "next-auth/jwt"
import withAuth, { NextRequestWithAuth } from "next-auth/middleware"
import { NextFetchEvent, NextResponse } from "next/server"
import routes from "@/constants/routes"
import rateLimiter from "@/rate-limiter"

const AUTH_SECRET = process.env.AUTH_SECRET

const ADMIN_PATH = "admin"

export default async function middleware(
  req: NextRequestWithAuth,
  event: NextFetchEvent
) {
  const isStaticPath =
    req.url.includes("_next/static") || req.url.includes("manifest.webmanifest")

  if (!isStaticPath) {
    const shouldBeBlocked = rateLimiter(req.ip!)

    if (shouldBeBlocked) return new NextResponse(null, { status: 429 })
  }

  const token = await getToken({ req, secret: AUTH_SECRET })
  const isAuthenticated = !!token

  if (
    req.nextUrl.pathname.includes(ADMIN_PATH) &&
    !req.nextUrl.pathname.includes(routes.admin.signin)
  ) {
    const authMiddleware = withAuth({
      secret: AUTH_SECRET,
    })

    return authMiddleware(req, event)
  }

  if (isAuthenticated && req.nextUrl.pathname.includes(routes.admin.signin)) {
    return NextResponse.redirect(
      new URL(routes.admin.indicators, req.nextUrl.origin)
    )
  }

  return
}
