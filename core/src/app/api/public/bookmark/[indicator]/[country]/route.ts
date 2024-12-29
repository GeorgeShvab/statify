import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import BookmarkService from "@/services/bookmark-service/BookmarkService"
import generateId from "@/utils/generate-id/generateId"
import { BookmarkValidationSchema } from "@/utils/validation-schemas/api/bookmark"
import validationMiddleware from "@/middlewares/validation-middleware/validationMiddleware"

const GET = validationMiddleware(async ({ params }) => {
  const client = cookies().get("client_id")?.value

  if (!client) return NextResponse.json({ isBookmarked: false })

  const bookmarkDocument = await BookmarkService.getOne({
    client,
    indicatorId: params.indicator,
    countryId: params.country,
  })

  if (bookmarkDocument) return NextResponse.json({ isBookmarked: true })

  return NextResponse.json({ isBookmarked: false })
}, BookmarkValidationSchema.getBookmarkWithCountry)

const POST = validationMiddleware(async ({ params }) => {
  let client = cookies().get("client_id")?.value

  if (!client) {
    client = generateId()

    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)

    cookies().set("client_id", client, {
      httpOnly: true,
      expires,
    })
  }

  const bookmarkDocument = await BookmarkService.getOne({
    client,
    indicatorId: params.indicator,
    countryId: params.country,
  })

  if (bookmarkDocument) return new NextResponse(null, { status: 400 })

  await BookmarkService.createOne({
    client,
    indicatorId: params.indicator,
    countryId: params.country,
  })

  return NextResponse.json(null, { status: 201 })
}, BookmarkValidationSchema.postBookmarkWithCountry)

const DELETE = validationMiddleware(async ({ params }) => {
  const client = cookies().get("client_id")?.value

  if (!client) return new NextResponse(null, { status: 400 })

  const bookmarkDocument = await BookmarkService.getOne({
    client,
    indicatorId: params.indicator,
    countryId: params.country,
  })

  if (!bookmarkDocument) return new NextResponse(null, { status: 400 })

  await BookmarkService.deleteOne(bookmarkDocument.id)

  return NextResponse.json(null, { status: 200 })
}, BookmarkValidationSchema.postBookmarkWithCountry)

export { DELETE, GET, POST }
