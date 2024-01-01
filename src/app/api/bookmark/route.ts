import BookmarkService from '@/services/BookmarkService'
import CountryService from '@/services/CountryService'
import IndicatorService from '@/services/IndicatorService'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
  const { country, indicator } = await req.json()

  const client = cookies().get('client_id')?.value

  if (!indicator || !client) return new NextResponse(null, { status: 400 })

  if (country) {
    const countryDoc = await CountryService.get({ id: country })

    if (!countryDoc) return new NextResponse(null, { status: 400 })
  }

  const indicatorDoc = await IndicatorService.get({ id: indicator })

  if (!indicatorDoc) return new NextResponse(null, { status: 400 })

  const bookmarkDocument = await BookmarkService.getOne({ client, country, indicator })

  if (bookmarkDocument) {
    await BookmarkService.delete(bookmarkDocument.id)

    return NextResponse.json({})
  } else {
    const bookmark = await BookmarkService.create({ client, indicator, country: country })

    return NextResponse.json(bookmark)
  }
}

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams

  const countryId = searchParams.get('countryId') || undefined
  const indicatorId = searchParams.get('indicatorId')

  const client = cookies().get('client_id')?.value

  if (!client || !indicatorId) return new NextResponse(null, { status: 400 })

  const bookmark = await BookmarkService.getOne({ client, country: countryId, indicator: indicatorId })

  if (!bookmark) return new NextResponse(null, { status: 404 })

  return new NextResponse(null, { status: 200 })
}
