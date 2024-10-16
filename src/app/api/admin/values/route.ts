import { NextRequest, NextResponse } from "next/server"
import {
  initialValueCountryOptions,
  initialValueIndicatorOptions,
  possibleValueSortDirectionQueryParam,
  possibleValueSortQueryParam,
} from "@/app/(admin)/admin/dashboard/values/constants"
import CountryService from "@/services/country-service/CountryService"
import IndicatorService from "@/services/indicator-service/IndicatorService"
import ValueService from "@/services/value-service/ValueService"
import validatePositiveNumber from "@/utils/validate-positive-number/validatePositiveNumber"
import validateQueryParam from "@/utils/validate-query-param/validateQueryParam"

export const POST = async (req: NextRequest) => {
  const body = await req.json()

  await ValueService.createOne(body)

  return NextResponse.json({})
}

export const DELETE = async (req: NextRequest) => {
  const ids = new URLSearchParams(req.nextUrl.searchParams)
    .get("ids")
    ?.split(",")
    .map((item) => Number(item))

  if (!ids) return new NextResponse(null, { status: 400 })

  await ValueService.deleteMany(ids)

  return new NextResponse(null, { status: 200 })
}

export const GET = async (req: NextRequest) => {
  const searchParams = new URLSearchParams(req.nextUrl.searchParams)

  const sortSearchParam = searchParams.get("sort")
  const indicatorSearchParam = searchParams.get("indicator")
  const countrySearchParam = searchParams.get("country")
  const sortDirectionSearchParam = searchParams.get("sortDirection")

  const take = validatePositiveNumber(searchParams.get("size"), 1000)
  const page = validatePositiveNumber(searchParams.get("page"), 0)

  const skip = page * take

  const sort = validateQueryParam(
    sortSearchParam,
    indicatorSearchParam === "all" || !indicatorSearchParam
      ? possibleValueSortQueryParam.filter(
          (item) => item !== "value" && item !== "year"
        )
      : possibleValueSortQueryParam
  )

  const indicatorSelectOptions = IndicatorService.getSelectAutocomplete()
  const countrySelectOptions = CountryService.getSelectAutocomplete()

  const [allIndicators, allCountries] = await Promise.all([
    indicatorSelectOptions,
    countrySelectOptions,
  ])

  const indicator = validateQueryParam(indicatorSearchParam, [
    initialValueIndicatorOptions.value,
    ...allIndicators.map(({ value }) => value),
  ])

  const country = validateQueryParam(countrySearchParam, [
    initialValueCountryOptions.value,
    ...allCountries.map(({ value }) => value),
  ])

  const sortDirection = validateQueryParam(
    sortDirectionSearchParam,
    possibleValueSortDirectionQueryParam
  )

  const { data, count } = await ValueService.getForAdmin({
    sort,
    take,
    skip,
    sortDirection,
    country: country === "all" ? undefined : country,
    indicator: indicator === "all" ? undefined : indicator,
  })

  const pages = Math.ceil(count / take)

  return NextResponse.json({ data, pages, page })
}
