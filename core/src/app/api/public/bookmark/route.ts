import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import BookmarkService from "@/services/bookmark-service/BookmarkService"
import CountryService from "@/services/country-service/CountryService"
import IndicatorService from "@/services/indicator-service/IndicatorService"
import generateId from "@/utils/generate-id/generateId"
import { BookmarkValidationSchema } from "@/utils/validation-schemas/api/bookmark"
import validationMiddleware from "@/middlewares/validation-middleware/validationMiddleware"

export const POST = validationMiddleware(async ({ body }) => {
  const { indicator, country } = body

  const client = cookies().get("client_id")?.value

  if (!indicator || !client) return new NextResponse(null, { status: 400 })

  if (country) {
    const countryDoc = await CountryService.getById(country)

    if (!countryDoc) return new NextResponse(null, { status: 400 })
  }

  const indicatorDoc = await IndicatorService.getById(indicator)

  if (!indicatorDoc) return new NextResponse(null, { status: 400 })

  const bookmarkDocument = await BookmarkService.getOne({
    client,
    countryId: country,
    indicatorId: indicator,
  })

  if (bookmarkDocument) {
    await BookmarkService.deleteOne(bookmarkDocument.id)

    return new NextResponse(null, { status: 200 })
  } else {
    const bookmark = await BookmarkService.createOne({
      client,
      countryId: country,
      indicatorId: indicator,
    })

    return NextResponse.json(bookmark)
  }
}, BookmarkValidationSchema.post)

export const GET = validationMiddleware(async ({ searchParams }) => {
  const { indicator, country } = searchParams

  let client = cookies().get("client_id")?.value

  if (!client) {
    const id = generateId()

    client = id

    cookies().set("client_id", id, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
    })
  }

  if (!client) return new NextResponse(null, { status: 400 })

  const bookmark = await BookmarkService.getOne({
    client,
    countryId: country,
    indicatorId: indicator,
  })

  if (!bookmark) return new NextResponse(null, { status: 404 })

  return new NextResponse(null, { status: 200 })
}, BookmarkValidationSchema.get)
