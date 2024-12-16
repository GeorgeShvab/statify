import { Indicator } from "@prisma/client"
import { IndicatorServiceInterface } from "@/services/indicator-service/types"
import sqlCondition from "@/utils/sql-condition/sqlCondition"
import sql from "@/utils/sql/sql"
import {
  CountryIndicator,
  IndicatorWithDatapoints,
} from "@/types/indicator.types"
import prisma from "@/prisma"

const perPage = Number(process.env.RESULTS_PER_PAGE)

const IndicatorService: IndicatorServiceInterface = {
  async createOne(data) {
    return prisma.indicator.create({ data })
  },

  async updateOne({ id, ...data }) {
    await prisma.indicator.update({ where: { id }, data })
  },

  async hideMany(ids) {
    await prisma.indicator.updateMany({
      where: { id: { in: ids } },
      data: { hidden: true },
    })
  },

  async exposeMany(ids) {
    await prisma.indicator.updateMany({
      where: { id: { in: ids } },
      data: { hidden: false },
    })
  },

  async deleteMany(ids) {
    await prisma.indicator.deleteMany({ where: { id: { in: ids } } })
  },

  async getById(id) {
    return prisma.indicator.findUnique({ where: { id } })
  },

  async getManyByIds(ids) {
    return prisma.indicator.findMany({ where: { id: { in: ids } } })
  },

  async getAll() {
    const data = prisma.indicator.findMany({
      where: { hidden: false },
      orderBy: { id: "asc" },
    })

    return data
  },

  async getSelectAutocomplete() {
    const data = prisma.indicator
      .findMany({
        select: {
          id: true,
          label: true,
        },
        orderBy: {
          label: "asc",
        },
      })
      .then((countries) =>
        countries
          .map((country) => ({
            value: country.id,
            label: country.label,
          }))
          .concat({
            value: "all",
            label: "All indicators",
          })
      )

    return data
  },

  async getRelatedById(id) {
    const data = await prisma.indicator.findUnique({
      where: { id },
      include: { relatedTo: true },
    })

    return data?.relatedTo || []
  },

  async search({ query, page }) {
    const indicatorQuery = query
      .split(" ")
      .map((item) => `%${item}%`.toLowerCase())

    const countryQuery = query
      .split(" ")
      .map((item) => `${item}%`.toLowerCase())

    const countrySearchTagsQuery = query.split(" ")

    const numberOfWords = indicatorQuery.length

    const offset = (page - 1) * perPage

    // To query Indicator and join Country. If any of words macthes any country name and has more than 4 characters (to exluce possibility of query only for indicator include country)
    // also search among searchTags
    const dataPromise = prisma.$queryRaw<CountryIndicator[]>`
    SELECT 
      i.*, 
      c."name" AS "countryName", 
      c."id" AS "countryId" 
    FROM 
      "Indicator" i 
    LEFT JOIN 
      "Country" c 
    ON 
      (
        CASE 
          WHEN ${numberOfWords} > 1 
          THEN 
            (
              c."name" ILIKE ANY 
              (
                SELECT query 
                FROM 
                  UNNEST(ARRAY[${countryQuery}]) AS t(query) 
                WHERE 
                  LENGTH(query) > 4
              ) 
              OR 
              LOWER(c."searchTags"::text)::text[] && 
              (ARRAY[${countrySearchTagsQuery}])
            ) 
          ELSE 
            FALSE 
        END
      )
    WHERE 
      (
        REGEXP_REPLACE(i.label, '\\([^)]*\\)', '', 'g') ILIKE ANY 
        (ARRAY[${indicatorQuery}]) 
        OR 
        ARRAY_TO_STRING(i."searchTags", ' ') ILIKE ANY 
        (ARRAY[${indicatorQuery}])
      ) 
      AND i."hidden" = FALSE 
      AND 
      (
        c."hidden" = FALSE 
        OR 
        c."id" IS NULL
      ) 
    ORDER BY 
      LENGTH("label") ASC 
    OFFSET 
      ${offset} 
    LIMIT 
      ${perPage}
  `

    // Almost the same as previous, just without limit and ordering
    const countPromise = prisma.$queryRaw<Pick<Indicator, "id">[]>`
    SELECT 
      i.*, 
      c."name" AS "countryName", 
      c."id" AS "countryId" 
    FROM 
      "Indicator" i 
    LEFT JOIN 
      "Country" c 
    ON 
      (
        CASE 
          WHEN ${numberOfWords} > 1 
          THEN 
            (
              c."name" ILIKE ANY 
              (
                SELECT query 
                FROM 
                  UNNEST(ARRAY[${countryQuery}]) AS t(query) 
                WHERE 
                  LENGTH(query) > 4
              ) 
              OR 
              LOWER(c."searchTags"::text)::text[] && 
              (ARRAY[${countrySearchTagsQuery}])
            ) 
          ELSE 
            FALSE 
        END
      )
    WHERE 
      (
        REGEXP_REPLACE(i.label, '\\([^)]*\\)', '', 'g') ILIKE ANY 
        (ARRAY[${indicatorQuery}]) 
        OR 
        ARRAY_TO_STRING(i."searchTags", ' ') ILIKE ANY 
        (ARRAY[${indicatorQuery}])
      ) 
      AND i."hidden" = FALSE 
      AND 
      (
        c."hidden" = FALSE 
        OR 
        c."id" IS NULL
      )
      `

    const [data, count] = await Promise.all([dataPromise, countPromise])

    const pages = Math.ceil(count.length / perPage)

    return { data, page, pages }
  },

  // Check if hidden on indicator is false

  async getSearchAutocomplete(query) {
    const indicatorQuery = query
      .split(" ")
      .map((item) => `%${item}%`.toLowerCase())

    const countryQuery = query
      .split(" ")
      .map((item) => `${item}%`.toLowerCase())

    const countrySearchTagsQuery = query.split(" ")

    const data = await prisma.$queryRaw<CountryIndicator[]>`
    SELECT 
      i.*, 
      c."name" AS "countryName", 
      c."id" AS "countryId" 
    FROM 
      "Indicator" i 
    LEFT JOIN 
      "Country" c 
    ON 
      (
        CASE 
          WHEN ${indicatorQuery.length} > 1 
          THEN 
            (
              c."name" ILIKE ANY 
              (
                SELECT query 
                FROM 
                  UNNEST(ARRAY[${countryQuery}]) AS t(query) 
                WHERE 
                  LENGTH(query) > 4
              ) 
              OR 
              LOWER(c."searchTags"::text)::text[] && 
              (ARRAY[${countrySearchTagsQuery}])
            ) 
          ELSE 
            FALSE 
        END
      )
    WHERE 
      (
        REGEXP_REPLACE(i.label, '\\([^)]*\\)', '', 'g') ILIKE ANY 
        (ARRAY[${indicatorQuery}]) 
        OR 
        ARRAY_TO_STRING(i."searchTags", ' ') ILIKE ANY 
        (ARRAY[${indicatorQuery}])
      ) 
      AND i."hidden" = FALSE 
      AND 
      (
        c."hidden" = FALSE 
        OR 
        c."id" IS NULL
      )
    ORDER BY 
      LENGTH(i."label") ASC 
    LIMIT 
      5
      `

    return data
  },

  async getForAdmin({ sort, search, hidden, absolute, sortDirection }) {
    const hiddenCondition = sqlCondition(
      hidden !== undefined,
      `"hidden" = ${hidden}`
    )

    const absoluteCondition = sqlCondition(
      absolute !== undefined,
      `"absolute" = ${absolute}`
    )

    const searchCondition = sqlCondition(
      search,
      `(
        LOWER("label") LIKE 
        LOWER('%${search}%') 
        OR 
        LOWER("description") LIKE 
        LOWER('%${search}%') 
        OR 
        LOWER("id") LIKE 
        LOWER('%${search}%')
      )`
    )

    const sortByDatapoints = `
      (
        SELECT 
        COUNT(id) 
        FROM "Value" 
        WHERE "indicatorId" = i.id
      )`

    const sortStatement = sql(
      sort === "datapoints" ? sortByDatapoints : `"${sort}"`
    )

    const sortOrder = sql(sortDirection)

    const indicators = await prisma.$queryRaw<IndicatorWithDatapoints[]>`
    SELECT 
      i.*, 
      (
        SELECT 
          COUNT(id) 
        FROM 
          "Value" 
        WHERE 
          "indicatorId" = i.id
      )::int AS datapoints 
    FROM 
      "Indicator" i 
    WHERE 
      ${searchCondition} 
      AND ${absoluteCondition} 
      AND ${hiddenCondition} 
      ORDER BY 
      ${sortStatement} 
      ${sortOrder}`

    return indicators
  },
}

export default IndicatorService
