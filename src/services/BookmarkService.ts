import prisma from '../../prisma/prisma'

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
    const dataPromise = prisma.bookmark.findMany({
      where: { client },
      orderBy: { createdAt: 'desc' },
      select: { indicator: true, country: true },
      take: 45,
      skip: (page - 1) * 45,
    })

    const countPromise = prisma.bookmark.count({ where: { client } })

    const [data, count] = await Promise.all([dataPromise, countPromise])

    return { data, pages: Math.ceil(count / 45), page }
  },

  async getOne({ client, country, indicator }: BookmarkAction) {
    return await prisma.bookmark.findFirst({ where: { client, countryId: country, indicatorId: indicator } })
  },

  async delete(id: number) {
    await prisma.bookmark.delete({ where: { id } })
  },
}

export default BookmarkService
