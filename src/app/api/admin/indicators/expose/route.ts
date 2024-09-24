import { NextRequest, NextResponse } from "next/server"
import IndicatorService from "@/services/indicator-service/IndicatorService"

export const PATCH = async (req: NextRequest) => {
  const body = await req.json()

  await IndicatorService.exposeMany(body.ids)

  return NextResponse.json({})
}
