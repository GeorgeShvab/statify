import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import generateId from './utils/generateId'

export function middleware(request: NextRequest) {
  const clientId = request.cookies.get('client_id')?.value

  if (!clientId) {
    const response = NextResponse.next()

    const id = generateId()

    response.cookies.set({
      name: 'client_id',
      value: id,
      httpOnly: true,
      expires: 1000 * 60 * 60 * 24 * 730,
    })

    return response
  }
}
