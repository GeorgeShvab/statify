import CountryService from '@/services/CountryService'
import IndicatorService from '@/services/IndicatorService'
import { NextRequest, NextResponse } from 'next/server'

interface Params {
  indicator: string
}

export const GET = async (req: NextRequest, { params }: { params: Params }) => {
  const indicator = await IndicatorService.get({ id: params.indicator })

  if (!indicator) return new NextResponse(null, { status: 404 })

  const data = await CountryService.getCountries({ indicator: params.indicator })

  return NextResponse.json(data)
}
