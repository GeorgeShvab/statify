import prisma from '../../prisma/prisma'
import { Indicator, Prisma } from '@prisma/client'

interface SearchParams {
  query: string
  page: number
}

const IndicatorService = {
  async get({ id }: { id: string }) {
    const data: (Indicator & { total: number | null })[] =
      await prisma.$queryRaw`SELECT i.*, (SELECT "value" FROM "Value" WHERE "indicatorId" = ${id} AND year = (SELECT MAX(year) FROM "Value" WHERE "countryId" = 'WEOWORLD' AND "indicatorId" = ${id}) AND "countryId" = 'WEOWORLD') as "total" FROM "Indicator" i WHERE "id" = ${id}`

    return data[0]
  },

  async getAll() {
    const data = await prisma.indicator.findMany({ where: { hidden: false } })

    return data
  },

  async search({ query, page }: SearchParams) {
    const dataPromise = prisma.$queryRaw`SELECT * FROM "Indicator" WHERE (LOWER("label") LIKE LOWER(${
      '%' + query + '%'
    }) OR LOWER(ARRAY_TO_STRING("searchTags", ' ')) LIKE LOWER(${
      '%' + query + '%'
    })) AND "hidden" = FALSE ORDER BY LENGTH("label") ASC OFFSET ${(page - 1) * 45} LIMIT 45` as Prisma.PrismaPromise<
      Indicator[]
    >

    const countPromise = prisma.$queryRaw`SELECT "id" FROM "Indicator" WHERE (LOWER("label") LIKE LOWER(${
      '%' + query + '%'
    }) OR LOWER(ARRAY_TO_STRING("searchTags", ' ')) LIKE LOWER(${
      '%' + query + '%'
    })) AND "hidden" = FALSE ORDER BY LENGTH("label") ASC` as Prisma.PrismaPromise<{ id: string }[]>

    const [data, count] = await Promise.all([dataPromise, countPromise])

    return { data, page, pages: Math.ceil(count.length / 45) }
  },

  async autocomplete({ query }: { query: string }) {
    const data = await prisma.$queryRaw`SELECT * FROM "Indicator" WHERE (LOWER("label") LIKE LOWER(${
      '%' + query + '%'
    }) OR LOWER(ARRAY_TO_STRING("searchTags", ' ')) LIKE LOWER(${
      '%' + query + '%'
    })) AND "hidden" = FALSE ORDER BY LENGTH("label") ASC LIMIT 5`

    return data
  },

  async getMany({ ids }: { ids: string[] }) {
    return await prisma.indicator.findMany({ where: { id: { in: ids } } })
  },

  async getRelatedIndicators({ id }: { id: string }) {
    return (await prisma.indicator.findUnique({ where: { id }, include: { relatedTo: true } }))?.relatedTo
  },
}

export default IndicatorService
