import IndicatorService from '@/services/IndicatorService'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  const query = req.nextUrl.searchParams.get('query')

  if (!query) {
    return new NextResponse(null, { status: 400 })
  }

  const data = await IndicatorService.autocomplete({ query })

  return NextResponse.json(data)
}
