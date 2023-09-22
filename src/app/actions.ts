'use server'

import { randomUUID } from 'crypto'
import { cookies } from 'next/headers'

export async function getClientId() {
  'use server'

  const cookieStore = cookies()
  let id = cookieStore.get('client_id')?.value

  if (!id) {
    const clientId = randomUUID()

    cookies().set('client_id', clientId)

    id = clientId
  }

  console.log('Action')

  return id
}

export default getClientId