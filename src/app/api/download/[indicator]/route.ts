import CountryService from "@/services/CountryService"
import IndicatorService from "@/services/IndicatorService"
import { NextRequest, NextResponse } from "next/server"
import XLSX from "xlsx"

interface Params {
  indicator: string
}

export const GET = async (req: NextRequest, { params }: { params: Params }) => {
  const searchParams = req.nextUrl.searchParams
  const format = validateFormat(searchParams.get("format"))

  if (!format) return new NextResponse(null, { status: 400 })

  const indicatorPromise = IndicatorService.get({ id: params.indicator })

  const countryValuesPromise = CountryService.getCountriesValueByIndicator({
    indicator: params.indicator,
  })

  const [indicator, countryValues] = await Promise.all([
    indicatorPromise,
    countryValuesPromise,
  ])

  if (!indicator || !countryValues.length)
    return new NextResponse(null, { status: 404 })

  const fileName = indicator.label

  if (format === "xlsx") {
    const header = ["Region", "Year", "Value"]
    const data = countryValues.map((item) => [item.name, item.year, item.value])

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
    const header = "Region,Year,Value\n"
    const data = countryValues
      .map((item) => [item.name, item.year, item.value].join(","))
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
}

function validateFormat(format: string | null) {
  if (format === "csv" || format === "xlsx" || !format) return format || "csv"

  return null
}
