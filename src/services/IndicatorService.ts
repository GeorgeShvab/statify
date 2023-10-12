import { Indicator } from '@/types'
import prisma from '../../prisma/prisma'

interface SearchParams {
  query: string
  page: number
}

const IndicatorService = {
  async get({ id }: { id: string }) {
    const data: (Indicator & { total: number | null })[] =
      await prisma.$queryRaw`SELECT i.*, (SELECT "value" FROM "Value" WHERE "indicatorId" = ${id} AND year = ${
        new Date().getFullYear() - 1
      } AND "countryId" = 'WEOWORLD') as "total" FROM "Indicator" i WHERE "id" = ${id}`

    return data[0]
  },

  async getAll() {
    const data = await prisma.indicator.findMany({ where: {} })

    return data
  },

  async search({ query, page }: SearchParams) {
    const dataPromise = prisma.indicator.findMany({
      where: {
        hidden: false,
        OR: [
          { label: { contains: query.trim(), mode: 'insensitive' } },
          //{ description: { contains: query.trim(), mode: 'insensitive' } },
        ],
      },
      take: 45,
      skip: (page - 1) * 45,
      orderBy: { label: 'asc' },
    })

    const countPromise = prisma.indicator.count({
      where: {
        hidden: false,
        OR: [
          { label: { contains: query.trim(), mode: 'insensitive' } },
          //{ description: { contains: query.trim(), mode: 'insensitive' } },
        ],
      },
      orderBy: { label: 'asc' },
    })

    const [data, count] = await Promise.all([dataPromise, countPromise])

    return { data, page, pages: Math.ceil(count / 45) }
  },

  async autocomplete({ query }: { query: string }) {
    return await prisma.indicator.findMany({
      where: {
        hidden: false,
        OR: [
          { label: { contains: query.trim(), mode: 'insensitive' } },
          //{ description: { contains: query.trim(), mode: 'insensitive' } },
        ],
      },
      take: 5,
      orderBy: { label: 'asc' },
    })
  },

  async getMany({ ids }: { ids: string[] }) {
    return await prisma.indicator.findMany({ where: { id: { in: ids } } })
  },
}

export default IndicatorService
