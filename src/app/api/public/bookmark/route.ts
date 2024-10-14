import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import BookmarkService from "@/services/bookmark-service/BookmarkService"
import CountryService from "@/services/country-service/CountryService"
import IndicatorService from "@/services/indicator-service/IndicatorService"
import generateId from "@/utils/generate-id/generateId"

export const POST = async (req: NextRequest) => {
  const { country: countryId, indicator: indicatorId } = await req.json()

  const client = cookies().get("client_id")?.value

  if (!indicatorId || !client) return new NextResponse(null, { status: 400 })

  if (countryId) {
    const countryDoc = await CountryService.getById(countryId)

    if (!countryDoc) return new NextResponse(null, { status: 400 })
  }

  const indicatorDoc = await IndicatorService.get({ id: indicatorId })

  if (!indicatorDoc) return new NextResponse(null, { status: 400 })

  const bookmarkDocument = await BookmarkService.getOne({
    client,
    countryId,
    indicatorId,
  })

  if (bookmarkDocument) {
    await BookmarkService.deleteOne(bookmarkDocument.id)

    return new NextResponse(null, { status: 200 })
  } else {
    const bookmark = await BookmarkService.createOne({
      client,
      indicatorId,
      countryId,
    })

    return NextResponse.json(bookmark)
  }
}

export const GET = async (req: NextRequest) => {
  let client = cookies().get("client_id")?.value

  if (!client) {
    const id = generateId()

    client = id

    cookies().set("client_id", id, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
    })
  }

  const searchParams = req.nextUrl.searchParams

  const countryId = searchParams.get("country") || null
  const indicatorId = searchParams.get("indicator")

  if (!client || !indicatorId) return new NextResponse(null, { status: 400 })

  const bookmark = await BookmarkService.getOne({
    client,
    countryId,
    indicatorId,
  })

  if (!bookmark) return new NextResponse(null, { status: 404 })

  return new NextResponse(null, { status: 200 })
}
