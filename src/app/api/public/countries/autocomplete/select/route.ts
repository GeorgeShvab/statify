import { NextResponse } from "next/server"
import { initialValueCountryOptions } from "@/app/(admin)/admin/dashboard/values/constants"
import CountryService from "@/services/country-service/CountryService"

export const GET = async () => {
  const countries = await CountryService.getCountriesSelectAutocomplete()

  return NextResponse.json([initialValueCountryOptions, ...countries])
}
