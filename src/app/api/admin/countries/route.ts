import { NextRequest, NextResponse } from "next/server"
import CountryService from "@/services/country-service/CountryService"

export const POST = async (req: NextRequest) => {
  const body = await req.json()

  await CountryService.create(body)

  return NextResponse.json({})
}
