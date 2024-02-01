import { Indicator } from '@prisma/client'
import prisma from '../../prisma/prisma'

const perPage = Number(process.env.RESULTS_PER_PAGE)

if (!perPage || Number.isNaN(perPage)) throw new Error('No RESULTS_PER_PAGE env')

interface BookmarkAction {
  indicator: string
  country?: string
  client: string
}

const BookmarkService = {
  async create({ indicator, country, client }: BookmarkAction) {
    return await prisma.bookmark.create({ data: { client: client, countryId: country, indicatorId: indicator } })
  },

  async get({ client, page }: { client: string; page: number }) {
    const dataPromise = prisma.$queryRaw`SELECT i.*, c.id AS "countryId", c.name AS "countryName" FROM "Bookmark" b 
      LEFT JOIN "Country" c ON b."countryId" = c."id" JOIN "Indicator" i ON b."indicatorId" = i."id" 
    WHERE b."client" = ${client} ORDER BY b."createdAt" DESC OFFSET ${
      (page - 1) * perPage
    } LIMIT ${perPage}` as Promise<(Indicator & { countryId?: string; countryName?: string })[]>

    const countPromise = prisma.bookmark.count({ where: { client } })

    const [data, count] = await Promise.all([dataPromise, countPromise])

    return { data, pages: Math.ceil(count / perPage), page }
  },

  async getOne({ client, country, indicator }: BookmarkAction) {
    return await prisma.bookmark.findFirst({ where: { client, countryId: country, indicatorId: indicator } })
  },

  async delete(id: number) {
    await prisma.bookmark.delete({ where: { id } })
  },
}

export default BookmarkService
