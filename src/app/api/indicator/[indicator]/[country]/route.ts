import { NextRequest, NextResponse } from "next/server"
import CountryService from "@/services/country-service/CountryService"

interface Params {
  indicator: string
  country: string
}

export const GET = async (req: NextRequest, { params }: { params: Params }) => {
  const data = await CountryService.getCountry(params)

  if (!data) return new NextResponse(null, { status: 404 })

  return NextResponse.json(data)
}
