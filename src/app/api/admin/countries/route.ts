import { NextRequest, NextResponse } from "next/server"
import CountryService from "@/services/country-service/CountryService"
import ValueService from "@/services/value-service/ValueService"

export const POST = async (req: NextRequest) => {
  const body = await req.json()

  await CountryService.createOne(body)

  return NextResponse.json({})
}

export const DELETE = async (req: NextRequest) => {
  const ids = new URLSearchParams(req.nextUrl.searchParams)
    .get("ids")
    ?.split(",")

  if (!ids) return new NextResponse(null, { status: 400 })

  await ValueService.deleteManyByCountry(ids)
  await CountryService.deleteMany(ids)

  return new NextResponse(null, { status: 200 })
}
