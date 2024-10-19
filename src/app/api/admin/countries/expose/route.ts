import { NextResponse } from "next/server"
import CountryService from "@/services/country-service/CountryService"
import { CommonValidations } from "@/utils/validation-schemas/common"
import validationMiddleware from "@/middlewares/validation-middleware/validationMiddleware"

export const PATCH = validationMiddleware(async ({ searchParams }) => {
  await CountryService.exposeMany(searchParams.ids)

  return new NextResponse(null, { status: 200 })
}, CommonValidations.searchParamsStringIdentificators)
