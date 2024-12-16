import { BookmarkServiceInterface } from "@/services/bookmark-service/types"
import prisma from "@/prisma"

const perPage = Number(process.env.RESULTS_PER_PAGE)

const BookmarkService: BookmarkServiceInterface = {
  async createOne(data) {
    return prisma.bookmark.create({
      data,
    })
  },

  async deleteOne(id) {
    await prisma.bookmark.delete({ where: { id } })
  },

  async getOne(where) {
    return prisma.bookmark.findFirst({
      where,
    })
  },

  async getByUser({ client, page = 1, size = perPage }) {
    const offset = (page - 1) * perPage

    const dataPromise = prisma.bookmark
      .findMany({
        where: { client },
        select: {
          country: {
            select: {
              id: true,
              name: true,
            },
          },
          indicator: {
            select: { label: true, id: true, description: true, source: true },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: size,
        skip: offset,
      })
      .then((res) =>
        res.map(({ indicator, country }) => ({
          ...indicator,
          countryId: country?.id,
          countryName: country?.name,
        }))
      )

    const countPromise = prisma.bookmark.count({ where: { client } })

    const [data, count] = await Promise.all([dataPromise, countPromise])

    const pages = Math.ceil(count / size)

    return { data, pages, page }
  },
}

export default BookmarkService
