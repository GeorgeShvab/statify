import IndicatorService from "@/services/indicator-service/IndicatorService"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
  const body = await req.json()

  await IndicatorService.create(body)

  return NextResponse.json({})
}
