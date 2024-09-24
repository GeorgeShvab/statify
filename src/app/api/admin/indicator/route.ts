import { NextRequest, NextResponse } from "next/server"
import IndicatorService from "@/services/indicator-service/IndicatorService"

export const POST = async (req: NextRequest) => {
  const body = await req.json()

  await IndicatorService.create(body)

  return NextResponse.json({})
}
