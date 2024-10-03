import { NextResponse } from "next/server"
import IndicatorService from "@/services/indicator-service/IndicatorService"

export const GET = async () => {
  const indicators = await IndicatorService.getAll({ id: true, label: true })

  return NextResponse.json(indicators)
}
