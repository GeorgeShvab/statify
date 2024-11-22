import { NextResponse } from "next/server"
import IndicatorService from "@/services/indicator-service/IndicatorService"
import { CommonValidations } from "@/utils/validation-schemas/common"
import validationMiddleware from "@/middlewares/validation-middleware/validationMiddleware"

export const PATCH = validationMiddleware(async ({ searchParams }) => {
  await IndicatorService.exposeMany(searchParams.ids)

  return new NextResponse(null, { status: 200 })
}, CommonValidations.searchParamsStringIdentificators)
