import { NextResponse } from "next/server"
import IndicatorService from "@/services/indicator-service/IndicatorService"
import ValueService from "@/services/value-service/ValueService"
import { CommonValidations } from "@/utils/validation-schemas/common"
import { IndicatorValidationSchema } from "@/utils/validation-schemas/indicator"
import validationMiddleware from "@/middlewares/validation-middleware/validationMiddleware"

export const POST = validationMiddleware(async ({ body }) => {
  await IndicatorService.createOne(body)

  return NextResponse.json({})
}, IndicatorValidationSchema.post)

export const DELETE = validationMiddleware(async ({ searchParams }) => {
  await ValueService.deleteManyByIndicator(searchParams.ids)
  await IndicatorService.deleteMany(searchParams.ids)

  return new NextResponse(null, { status: 200 })
}, CommonValidations.searchParamsStringIdentificators)
