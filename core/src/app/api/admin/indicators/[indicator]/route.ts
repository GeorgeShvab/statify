import { NextResponse } from "next/server"
import IndicatorService from "@/services/indicator-service/IndicatorService"
import { IndicatorValidationSchema } from "@/utils/validation-schemas/indicator"
import validationMiddleware from "@/middlewares/validation-middleware/validationMiddleware"

export const PATCH = validationMiddleware(async ({ body, params }) => {
  await IndicatorService.updateOne({ id: params.indicator, ...body })

  return NextResponse.json(body)
}, IndicatorValidationSchema.patch)
