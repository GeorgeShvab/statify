import { IndicatorServiceInterface } from "@/services/indicator-service/types"
import { Option } from "@/ui/select/Select.types"
import sqlCondition from "@/utils/sql-condition/sqlCondition"
import sql from "@/utils/sql/sql"
import { SQLCount } from "@/types/general.types"
import {
  CountryIndicator,
  Indicator,
  IndicatorWithDatapoints,
} from "@/types/indicator.types"
import translate from "@/modules/i18n"
import prisma from "@/prisma"

const lang = process.env.NEXT_PUBLIC_LANG

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
    await prisma.indicatorTranslation.deleteMany({
      where: { indicatorId: { in: ids } },
    })

    await prisma.indicator.deleteMany({ where: { id: { in: ids } } })
  },

  async getById(id) {
    const res = await prisma.$queryRaw<Indicator[]>`
    SELECT * 
    FROM "Indicator" i 
    LEFT JOIN "IndicatorTranslation" t 
    ON i.id = t."indicatorId" 
    AND t."language"::text = ${lang}
    WHERE i."id" = ${id} 
    `

    // I need to add missing values in translation like source, unit and so on

    return res[0]
  },

  async getAll() {
    const data = prisma.indicator
      .findMany({
        where: { hidden: false },
        orderBy: { id: "asc" },
        include: { IndicatorTranslation: { where: { language: lang } } },
      })
      .then((res) =>
        res.map(({ IndicatorTranslation, ...item }) => ({
          ...item,
          ...IndicatorTranslation[0],
        }))
      )

    return data
  },

  async getSelectAutocomplete() {
    return prisma.$queryRaw<Option[]>`
    SELECT 
      i."id" AS "value", 
      t."label"
    FROM "Indicator" i 
    INNER JOIN "IndicatorTranslation" t 
      ON i."id" = t."indicatorId"
      AND t."language"::text = ${lang}
    ORDER BY 
      LENGTH(t."label") ASC
    `.then((res) =>
      res.concat({
        value: "all",
        label: translate("pages.values_dashboard.selects.indicator.all"),
      })
    )
  },

  async getRelatedById(id) {
    const data = (await prisma.indicator
      .findUnique({
        where: { id },
        include: {
          relatedTo: {
            include: {
              IndicatorTranslation: {
                where: { language: lang, indicatorId: id },
              },
            },
          },
        },
      })
      .then((res) =>
        res?.relatedTo.map(({ IndicatorTranslation, ...item }) => ({
          ...item,
          ...IndicatorTranslation,
        }))
      )) as Indicator[]

    return data || []
  },

  async search({ query, page }) {
    const indicatorQuery = query
      .split(" ")
      .map((item) => `%${item}%`.toLowerCase())

    const offset = (page - 1) * perPage

    // join every country with every indicator than check whether indicator name has

    const dataPromise = prisma.$queryRaw<CountryIndicator[]>`
    SELECT 
      i."id",
      i."searchTags",
      i."hidden",
      t."label",
      t."description",
      t."source"
    FROM "Indicator" i
    INNER JOIN "IndicatorTranslation" t 
      ON i."id" = t."indicatorId" 
      AND t."language"::text = ${lang}
    WHERE
      (
        REGEXP_REPLACE
          (
            (
              SELECT STRING_AGG("label", ' ') 
              FROM "IndicatorTranslation" 
              WHERE "indicatorId" = i."id"
            ), 
          '\\([^)]*\\)', '', 'g'
          ) 
        ILIKE ANY
        (ARRAY[${indicatorQuery}])
      )
    AND "hidden" = FALSE
    ORDER BY
      LENGTH(t."label") ASC
    OFFSET
      ${offset}
    LIMIT
      ${perPage}
    `

    const countPromise = prisma.$queryRaw<SQLCount>`
    SELECT 
      COUNT("id")::int
    FROM "Indicator" 
    WHERE
      (
        REGEXP_REPLACE
          (
            (
              SELECT STRING_AGG("label", ' ') 
              FROM "IndicatorTranslation" 
              WHERE "indicatorId" = "id"
            ), 
          '\\([^)]*\\)', '', 'g'
          ) 
        ILIKE ANY
        (ARRAY[${indicatorQuery}])
      )
    AND "hidden" = FALSE
    `

    const [data, [{ count }]] = await Promise.all([dataPromise, countPromise])

    const pages = Math.ceil(count / perPage)

    return { data, page, pages }
  },

  // Check if hidden on indicator is false

  async getSearchAutocomplete(query) {
    const indicatorQuery = query
      .split(" ")
      .map((item) => `%${item}%`.toLowerCase())

    const data = await prisma.$queryRaw<CountryIndicator[]>`
       SELECT 
      i."id",
      i."searchTags",
      i."hidden",
      t."label",
      t."description",
      t."source"
    FROM "Indicator" i
    INNER JOIN "IndicatorTranslation" t 
      ON i."id" = t."indicatorId" 
      AND t."language"::text = ${lang}
    WHERE
      (
        REGEXP_REPLACE
          (
            (
              SELECT STRING_AGG("label", ' ') 
              FROM "IndicatorTranslation" 
              WHERE "indicatorId" = i."id"
            ), 
          '\\([^)]*\\)', '', 'g'
          ) 
        ILIKE ANY
        (ARRAY[${indicatorQuery}])
      )
    AND "hidden" = FALSE
    ORDER BY
      LENGTH(t."label") ASC
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
        (
          SELECT STRING_AGG("label", ' ') 
          FROM "IndicatorTranslation" 
          WHERE "indicatorId" = i."id"
        ) ILIKE 
        '%${search}%' 
        OR 
        (
          SELECT STRING_AGG("description", ' ') 
          FROM "IndicatorTranslation" 
          WHERE "indicatorId" = i."id"
        ) ILIKE 
        '%${search}%' 
        OR 
        "id" ILIKE 
        '%${search}%'
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
      t.*,
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
    LEFT JOIN "IndicatorTranslation" t 
    ON
    i."id" = t."indicatorId" 
    AND t."language"::text = ${lang}
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
