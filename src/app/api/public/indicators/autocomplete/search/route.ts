import { NextRequest, NextResponse } from "next/server"
import IndicatorService from "@/services/indicator-service/IndicatorService"

export const GET = async (req: NextRequest) => {
  const query = req.nextUrl.searchParams.get("query")

  if (!query) {
    return new NextResponse(null, { status: 400 })
  }

  const data = await IndicatorService.getSearchAutocomplete(query)

  return NextResponse.json(data)
}
