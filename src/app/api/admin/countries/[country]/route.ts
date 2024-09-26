import { NextRequest, NextResponse } from "next/server"
import CountryService from "@/services/country-service/CountryService"

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { country: string } }
) => {
  const body = await req.json()

  await CountryService.updateOne(params.country, body)

  return NextResponse.json(body)
}
