import { NextResponse } from "next/server"
import CountryService from "@/services/country-service/CountryService"

export const GET = async () => {
  const countries = await CountryService.getAll({ id: true, name: true })

  return NextResponse.json(countries)
}
