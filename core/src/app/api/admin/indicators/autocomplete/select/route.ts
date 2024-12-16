import { NextResponse } from "next/server"
import IndicatorService from "@/services/indicator-service/IndicatorService"

export const GET = async () => {
  const indicators = await IndicatorService.getSelectAutocomplete()

  return NextResponse.json([
    {
      value: "all",
      label: "All indicators",
    },
    ...indicators,
  ])
}
