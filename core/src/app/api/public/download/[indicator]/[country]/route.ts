import { NextResponse } from "next/server"
import XLSX from "xlsx"
import CountryService from "@/services/country-service/CountryService"
import IndicatorService from "@/services/indicator-service/IndicatorService"
import { CountryValidationSchema } from "@/utils/validation-schemas/api/country"
import validationMiddleware from "@/middlewares/validation-middleware/validationMiddleware"

export const GET = validationMiddleware(async ({ params, searchParams }) => {
  const indicatorPromise = IndicatorService.getById(params.indicator)

  const countryPromise = CountryService.getCountryTableValues(
    params.indicator,
    params.country
  )

  const [indicator, country] = await Promise.all([
    indicatorPromise,
    countryPromise,
  ])

  if (!indicator || !country.values.length)
    return new NextResponse(null, { status: 404 })

  const fileName = `${indicator.label}. ${country.name}`

  if (searchParams.format === "xlsx") {
    const header = ["Year", "Value"]
    const data = country.values.map((item) => [item.year, item.value])

    const workSheet = XLSX.utils.aoa_to_sheet([header, ...data])

    const book = XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(book, workSheet, fileName, true)

    const headers = new Headers()

    headers.set(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )
    headers.set(
      "Content-Disposition",
      `attachment; filename=${fileName + ".xlsx"}`
    )

    const file = XLSX.write(book, { type: "buffer", bookType: "xlsx" })

    return new NextResponse(file, { status: 200, statusText: "OK", headers })
  } else {
    const header = "Year,Value\n"
    const data = country.values
      .map((item) => [item.year, item.value].join(","))
      .join("\n")

    const headers = new Headers()

    headers.set("Content-Type", "text/csv")
    headers.set(
      "Content-Disposition",
      `attachment; filename=${fileName + ".csv"}`
    )

    const file = `${header}${data}`

    return new NextResponse(file, { status: 200, statusText: "OK", headers })
  }
}, CountryValidationSchema.download)
