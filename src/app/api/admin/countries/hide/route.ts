import { NextRequest, NextResponse } from "next/server"
import CountryService from "@/services/country-service/CountryService"

export const PATCH = async (req: NextRequest) => {
  const body = await req.json()

  await CountryService.hideMany(body.ids)

  return NextResponse.json({})
}
