import { NextRequest, NextResponse } from "next/server"
import IndicatorService from "@/services/indicator-service/IndicatorService"

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { indicator: string } }
) => {
  const body = await req.json()

  await new Promise((resolve, reject) => {
    setTimeout(() => reject(), 2000)
  })

  throw new Error()

  //await IndicatorService.updateOne(params.indicator, body)

  return NextResponse.json({})
}
