import CountryService from '@/services/CountryService'
import IndicatorService from '@/services/IndicatorService'
import { NextRequest, NextResponse } from 'next/server'

interface Params {
  indicator: string
  country: string
}

export const GET = async (req: NextRequest, { params }: { params: Params }) => {
  const indicatorPromise = IndicatorService.get({ id: params.indicator })
  const countryPromise = CountryService.get({ id: params.country })

  const [indicator, country] = await Promise.all([indicatorPromise, countryPromise])

  if (!indicator || !country) return new NextResponse(null, { status: 404 })

  const data = await CountryService.getCountry(params)

  return NextResponse.json(data)
}
