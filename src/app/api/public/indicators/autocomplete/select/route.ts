import { NextResponse } from "next/server"
import { initialValueIndicatorOptions } from "@/app/(admin)/admin/dashboard/values/constants"
import IndicatorService from "@/services/indicator-service/IndicatorService"

export const GET = async () => {
  const indicators = await IndicatorService.getIndicatorsSelectAutocomplete()

  return NextResponse.json([initialValueIndicatorOptions, ...indicators])
}
