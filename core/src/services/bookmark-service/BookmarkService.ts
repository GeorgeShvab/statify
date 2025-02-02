import { BookmarkServiceInterface } from "@/services/bookmark-service/types"
import { CountryIndicator } from "@/types/indicator.types"
import prisma from "@/prisma"

const lang = process.env.NEXT_PUBLIC_LANG

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

    const dataPromise = prisma.$queryRaw<CountryIndicator[]>`
    SELECT b."indicatorId" as "id", b."countryId",
     i."label", i."description", i."source", 
     c."name" as "countryName"
    FROM "Bookmark" b 
    LEFT JOIN "IndicatorTranslation" i 
      ON b."indicatorId" = i."indicatorId" 
      AND i."language"::text = ${lang}
    LEFT JOIN "CountryTranslation" c 
      ON b."countryId" = c."countryId"
      AND c."language"::text = ${lang}
    WHERE b."client" = ${client} 
    ORDER BY b."createdAt" DESC
    OFFSET ${offset} 
    LIMIT ${size}
    `

    const countPromise = prisma.bookmark.count({ where: { client } })

    const [data, count] = await Promise.all([dataPromise, countPromise])

    const pages = Math.ceil(count / size)

    return { data, pages, page }
  },
}

export default BookmarkService
