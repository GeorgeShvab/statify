import { NextResponse } from "next/server"
import CountryService from "@/services/country-service/CountryService"
import ValueService from "@/services/value-service/ValueService"
import { CommonValidations } from "@/utils/validation-schemas/common"
import { CountryValidationSchema } from "@/utils/validation-schemas/country"
import validationMiddleware from "@/middlewares/validation-middleware/validationMiddleware"

export const POST = validationMiddleware(async ({ body }) => {
  await CountryService.createOne(body)

  return NextResponse.json({})
}, CountryValidationSchema.post)

export const DELETE = validationMiddleware(async ({ searchParams }) => {
  await ValueService.deleteManyByCountry(searchParams.ids)
  await CountryService.deleteMany(searchParams.ids)

  return new NextResponse(null, { status: 200 })
}, CommonValidations.searchParamsStringIdentificators)
