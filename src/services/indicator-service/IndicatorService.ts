import prisma from "@/prisma"
import { Indicator, Prisma } from "@prisma/client"
import { GetAdminIndicatorsParams } from "./types"

const perPage = Number(process.env.RESULTS_PER_PAGE)

if (!perPage || Number.isNaN(perPage))
  throw new Error("No RESULTS_PER_PAGE env")

interface SearchParams {
  query: string
  page: number
}

const IndicatorService = {
  async get({ id }: { id: string }) {
    const data = await prisma.indicator.findUnique({ where: { id } })

    return data
  },

  async getAll() {
    const data = await prisma.indicator.findMany({ where: { hidden: false } })

    return data
  },

  async search({ query, page }: SearchParams) {
    const indicatorQuery = query
      .split(" ")
      .map((item) => `%${item}%`.toLowerCase())

    const countryQuery = query
      .split(" ")
      .map((item) => `${item}%`.toLowerCase())

    const countrySearchTagsQuery = query.split(" ")

    // To query Indicator and join Country. If any of words macthes any country name and has more than 4 characters (to exluce possibility of query only for indicator include country)
    // also search among searchTags
    const dataPromise =
      prisma.$queryRaw`SELECT i.*, c."name" as "countryName", c."id" as "countryId" FROM "Indicator" i 
      LEFT JOIN "Country" c ON (CASE WHEN ${
        indicatorQuery.length
      } > 1 THEN (c."name" ILIKE ANY 
      (SELECT query FROM UNNEST(ARRAY[${countryQuery}]) AS t(query) WHERE LENGTH(query) > 4) OR 
      LOWER(c."searchTags"::text)::text[] && (ARRAY[${countrySearchTagsQuery}])) ELSE FALSE END)
      WHERE (REGEXP_REPLACE(i.label, '\\([^)]*\\)', '', 'g') ILIKE ANY (ARRAY[${indicatorQuery}]) OR 
      ARRAY_TO_STRING(i."searchTags", ' ') ILIKE ANY (ARRAY[${indicatorQuery}])) AND i."hidden" = FALSE AND (c."hidden" = FALSE OR c."id" IS NULL) 
       ORDER BY LENGTH("label") ASC OFFSET ${
         (page - 1) * perPage
       } LIMIT ${perPage}` as Prisma.PrismaPromise<
        (Indicator & { countryName?: string; countryId?: string })[]
      >

    // Almost the same as previous, just without limit and ordering
    const countPromise =
      prisma.$queryRaw`SELECT i.*, c."name" as "countryName", c."id" as "countryId" FROM "Indicator" i 
      LEFT JOIN "Country" c ON (CASE WHEN ${indicatorQuery.length} > 1 THEN (c."name" ILIKE ANY 
      (SELECT query FROM UNNEST(ARRAY[${countryQuery}]) AS t(query) WHERE LENGTH(query) > 4) OR 
      LOWER(c."searchTags"::text)::text[] && (ARRAY[${countrySearchTagsQuery}])) ELSE FALSE END)
      WHERE (REGEXP_REPLACE(i.label, '\\([^)]*\\)', '', 'g') ILIKE ANY (ARRAY[${indicatorQuery}]) OR 
      ARRAY_TO_STRING(i."searchTags", ' ') ILIKE ANY (ARRAY[${indicatorQuery}])) AND i."hidden" = FALSE AND (c."hidden" = FALSE OR c."id" IS NULL)` as Prisma.PrismaPromise<
        { id: string }[]
      >

    const [data, count] = await Promise.all([dataPromise, countPromise])

    return { data, page, pages: Math.ceil(count.length / perPage) }
  },

  // Check if hidden on indicator is false

  async autocomplete({ query }: { query: string }) {
    const indicatorQuery = query
      .split(" ")
      .map((item) => `%${item}%`.toLowerCase())

    const countryQuery = query
      .split(" ")
      .map((item) => `${item}%`.toLowerCase())

    const countrySearchTagsQuery = query.split(" ")

    const data =
      await prisma.$queryRaw`SELECT i.*, c."name" as "countryName", c."id" as "countryId" FROM "Indicator" i 
      LEFT JOIN "Country" c ON (CASE WHEN ${indicatorQuery.length} > 1 THEN (c."name" ILIKE ANY 
      (SELECT query FROM UNNEST(ARRAY[${countryQuery}]) AS t(query) WHERE LENGTH(query) > 4) OR 
      LOWER(c."searchTags"::text)::text[] && (ARRAY[${countrySearchTagsQuery}])) ELSE FALSE END)
      WHERE (REGEXP_REPLACE(i.label, '\\([^)]*\\)', '', 'g') ILIKE ANY (ARRAY[${indicatorQuery}]) OR 
      ARRAY_TO_STRING(i."searchTags", ' ') ILIKE ANY (ARRAY[${indicatorQuery}])) AND i."hidden" = FALSE AND (c."hidden" = FALSE OR c."id" IS NULL) 
      ORDER BY LENGTH(i."label") ASC LIMIT 5`

    return data as (Indicator & { countryName?: string; countryId?: string })[]
  },

  async getMany({ ids }: { ids: string[] }) {
    return await prisma.indicator.findMany({ where: { id: { in: ids } } })
  },

  async getRelatedIndicators({ id }: { id: string }) {
    return (
      await prisma.indicator.findUnique({
        where: { id },
        include: { relatedTo: true },
      })
    )?.relatedTo
  },

  async getAdminIndicators({
    sort,
    search,
    hidden,
    absolute,
    sortDirection,
  }: GetAdminIndicatorsParams) {
    const hiddenCondition = Prisma.sql([
      hidden !== undefined ? `"hidden" = ${hidden}` : "TRUE",
    ])
    const absoluteCondition = Prisma.sql([
      absolute !== undefined ? `"absolute" = ${absolute}` : "TRUE",
    ])
    const searchCondition = Prisma.sql([
      search
        ? `(LOWER("label") LIKE LOWER('%${search}%') OR LOWER("description") LIKE LOWER('%${search}%') OR LOWER("id") LIKE LOWER('%${search}%'))`
        : "TRUE",
    ])

    const sortByDatapoints =
      '(SELECT COUNT(id) FROM "Value" WHERE "indicatorId" = i.id)'

    const sortStatement = Prisma.sql([
      `ORDER BY ${
        sort === "datapoints" ? sortByDatapoints : `"${sort}"`
      } ${sortDirection}`,
    ])

    const indicators =
      await prisma.$queryRaw`SELECT i.*, (SELECT COUNT(id) FROM "Value" WHERE "indicatorId" = i.id)::int as datapoints FROM "Indicator" i WHERE ${searchCondition} AND ${absoluteCondition} AND ${hiddenCondition} ${sortStatement}`

    return indicators as (Indicator & { datapoints: number })[]
  },
}

export default IndicatorService
