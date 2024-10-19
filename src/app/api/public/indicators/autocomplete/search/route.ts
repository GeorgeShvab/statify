import { NextResponse } from "next/server"
import IndicatorService from "@/services/indicator-service/IndicatorService"
import { CommonValidations } from "@/utils/validation-schemas/common"
import validationMiddleware from "@/middlewares/validation-middleware/validationMiddleware"

export const GET = validationMiddleware(async ({ searchParams }) => {
  const data = await IndicatorService.getSearchAutocomplete(searchParams.query)

  return NextResponse.json(data)
}, CommonValidations.searchSchema)
