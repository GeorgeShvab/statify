import CountryService from "@/services/CountryService"
import IndicatorService from "@/services/indicator-service/IndicatorService"
import { NextRequest, NextResponse } from "next/server"

interface Params {
  indicator: string
}

export const GET = async (req: NextRequest, { params }: { params: Params }) => {
  const data = await CountryService.getCountries({
    indicator: params.indicator,
  })

  if (!data.length) return new NextResponse(null, { status: 404 })

  return NextResponse.json(data)
}
