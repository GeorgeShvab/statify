import CountryService from '@/services/CountryService'
import { NextRequest, NextResponse } from 'next/server'

interface Params {
  indicator: string
  country: string
}

export const GET = async (req: NextRequest, { params }: { params: Params }) => {
  const data = await CountryService.getCountry(params)

  if (!data) return new NextResponse(null, { status: 404 })

  return NextResponse.json(data)
}
