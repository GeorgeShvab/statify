import { NextResponse } from "next/server"
import CountryService from "@/services/country-service/CountryService"
import { CountryValidationSchema } from "@/utils/validation-schemas/country"
import validationMiddleware from "@/middlewares/validation-middleware/validationMiddleware"

export const PATCH = validationMiddleware(async ({ body, params }) => {
  await CountryService.updateOne({ id: params.country, ...body })

  return NextResponse.json(body)
}, CountryValidationSchema.patch)
