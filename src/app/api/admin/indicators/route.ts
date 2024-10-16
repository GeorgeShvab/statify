import { NextRequest, NextResponse } from "next/server"
import IndicatorService from "@/services/indicator-service/IndicatorService"
import ValueService from "@/services/value-service/ValueService"

export const POST = async (req: NextRequest) => {
  const body = await req.json()

  await IndicatorService.createOne(body)

  return NextResponse.json({})
}

export const DELETE = async (req: NextRequest) => {
  const ids = new URLSearchParams(req.nextUrl.searchParams)
    .get("ids")
    ?.split(",")

  if (!ids) return new NextResponse(null, { status: 400 })

  await ValueService.deleteManyByIndicator(ids)
  await IndicatorService.deleteMany(ids)

  return new NextResponse(null, { status: 200 })
}
