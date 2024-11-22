interface RateLimiterClient {
  count: number
  windowStart: number
}

const clients = new Map<string, RateLimiterClient>()

const config = {
  windowSize: 60000,
  maxRequests: 60,
}

const initializeClient = (ip: string) => {
  const client = { windowStart: Date.now(), count: 0 }

  clients.set(ip, client)

  return client
}

const rateLimiter = (ip: string) => {
  let client = clients.get(ip)

  if (!client) client = initializeClient(ip)

  const now = Date.now()

  const isNewWindow = now - client.windowStart > config.windowSize

  if (isNewWindow) client = initializeClient(ip)

  const currentRequestCount = client.count

  if (currentRequestCount > config.maxRequests) return true

  clients.set(ip, {
    windowStart: client.windowStart,
    count: currentRequestCount + 1,
  })

  return false
}

export default rateLimiter
