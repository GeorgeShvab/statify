import { NextRequest, NextResponse } from "next/server"
import ValueService from "@/services/value-service/ValueService"

export const POST = async (req: NextRequest) => {
  const body = await req.json()

  await ValueService.create(body)

  return NextResponse.json({})
}

export const DELETE = async (req: NextRequest) => {
  const ids = new URLSearchParams(req.nextUrl.searchParams)
    .get("ids")
    ?.split(",")
    .map((item) => Number(item))

  if (!ids) return new NextResponse(null, { status: 400 })

  await ValueService.deleteMany(ids)

  return new NextResponse(null, { status: 200 })
}
