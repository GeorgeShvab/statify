import { CountryServiceInterface } from "@/services/country-service/types"
import { Option } from "@/ui/select/Select.types"
import sqlCondition from "@/utils/sql-condition/sqlCondition"
import sql from "@/utils/sql/sql"
import {
  Country,
  CountryRowValue,
  CountryWithDatapoints,
  CountryWithValues,
} from "@/types/country.types"
import translate from "@/modules/i18n"
import prisma from "@/prisma"

const year = new Date().getFullYear()

const lang = process.env.NEXT_PUBLIC_LANG

const CountryService: CountryServiceInterface = {
  async createOne(data) {
    return prisma.country.create({ data })
  },

  async updateOne({ id, ...data }) {
    await prisma.country.update({ where: { id }, data })
  },

  async hideMany(ids) {
    await prisma.country.updateMany({
      where: { id: { in: ids } },
      data: { hidden: true },
    })
  },

  async exposeMany(ids) {
    await prisma.country.updateMany({
      where: { id: { in: ids } },
      data: { hidden: false },
    })
  },

  async deleteMany(ids) {
    await prisma.countryTranslation.deleteMany({
      where: { countryId: { in: ids } },
    })
    await prisma.country.deleteMany({ where: { id: { in: ids } } })
  },

  async getById(id) {
    return prisma.$queryRaw<Country[]>`
    SELECT * FROM "Country" c 
    JOIN "CountryTranslation" t 
    ON c.id = t."countryId" 
    AND t."language"::text = ${lang}
    WHERE c."id" = ${id}
    `.then((res) => res[0])
  },

  async getSelectAutocomplete() {
    return prisma.$queryRaw<Option[]>`
    SELECT 
      c."id" AS "value", 
      t."name" AS "label"
    FROM "Country" c 
    INNER JOIN "CountryTranslation" t 
      ON c."id" = t."countryId"
      AND t."language"::text = ${lang}
    ORDER BY 
      LENGTH(t."name") ASC
    `.then((res) =>
      res.concat({
        value: "all",
        label: translate("pages.values_dashboard.selects.country.all"),
      })
    )
  },

  async getManyWithValuesByIndicator(id) {
    const data = prisma.$queryRaw<CountryWithValues[]>`
    SELECT c.id, t.name, 
    ARRAY(
      SELECT JSON_BUILD_OBJECT('id', v.id, 'value', v.value, 'year', v.year)
      FROM "Value" v 
      WHERE "indicatorId" = ${id} 
      AND "countryId" = c."id" 
      AND "year" <= ${year} 
      ORDER BY "year" ASC) 
    AS values,
      (SELECT JSON_BUILD_OBJECT('value', v.value, 'year', v.year)  
      FROM "Value" v 
      WHERE v.id = 
        (SELECT id 
        FROM "Value" 
        WHERE "indicatorId" = ${id} 
        AND "countryId" = c."id" 
        AND "year" <= ${year}
        ORDER BY ABS(value) DESC
        LIMIT 1) 
      ) 
    AS "maxValue" 
    FROM "Country" c
    LEFT JOIN "CountryTranslation" t
    ON c."id" = t."countryId" 
    WHERE c."hidden" IS FALSE 
    AND 
      (SELECT COUNT("id") 
      FROM "Value" 
      WHERE "indicatorId" = ${id} 
      AND "countryId" = c."id" 
      AND "year" <= ${year}) 
    > 0 
    AND t."language"::text = ${lang}
    ORDER BY t."name" ASC`

    return data
  },

  async getIndicatorTableValues(indicator) {
    const data = prisma.$queryRaw<CountryRowValue[]>`
    SELECT c.id, t.name, 
      (SELECT "value" 
      FROM "Value" 
      WHERE "indicatorId" = ${indicator} 
      AND "countryId" = c."id" 
      AND "year" <= ${year} 
      ORDER BY "year" 
      DESC LIMIT 1) 
    AS value,
      (SELECT "year" 
      FROM "Value" 
      WHERE "indicatorId" = ${indicator} 
      AND "countryId" = c."id" 
      AND "year" <= ${year} 
      ORDER BY "year" 
      DESC LIMIT 1) 
    AS year
    FROM "Country" c 
    LEFT JOIN "CountryTranslation" t
    ON c."id" = t."countryId" 
    WHERE c."hidden" IS FALSE 
    AND 
      (SELECT COUNT("id") 
      FROM "Value" 
      WHERE "indicatorId" = ${indicator} 
      AND "countryId" = c."id" 
      AND "year" <= ${year})
    > 0 
    AND t."language"::text = ${lang}
    ORDER BY t."name" ASC`

    return data
  },

  async getCountryTableValues(indicator, country) {
    const data = await prisma.$queryRaw<CountryWithValues[]>`
    SELECT c."id", c."geoCode", c."iso2Code", t."name", 
      ARRAY(
      SELECT JSON_BUILD_OBJECT('id', v.id, 'value', v.value, 'year', v.year)
      FROM "Value" v 
      WHERE "indicatorId" = ${indicator} 
      AND "countryId" = ${country} 
      AND "year" <= ${year} 
      ORDER BY "year" ASC) 
    AS values,
      (SELECT JSON_BUILD_OBJECT('value', v.value, 'year', v.year)  
      FROM "Value" v 
      WHERE "indicatorId" = ${indicator} 
      AND "countryId" = c."id" 
      AND "year" <= ${year} 
      AND v.value = 
        (SELECT 
        ABS(MAX(ABS(value))) 
        FROM "Value" 
        WHERE "indicatorId" = ${indicator} 
        AND "countryId" = c."id" 
        AND "year" <= ${year}) 
      ORDER BY "value" 
      DESC LIMIT 1) 
    AS "maxValue"
    FROM "Country" c 
    LEFT JOIN "CountryTranslation" t 
    ON c."id" = t."countryId" 
    WHERE 
      (SELECT COUNT("id") 
      FROM "Value" 
      WHERE "indicatorId" = ${indicator} 
      AND "countryId" = ${country} 
      AND "year" <= ${year}) 
    > 0 
    AND id = ${country} 
    AND t."language"::text = ${lang}
    ORDER BY t."name" ASC`

    return data[0]
  },

  async getForAdmin({ search, hidden, sort, sortDirection, type }) {
    const searchCondition = sqlCondition(
      search,
      `("iso2Code" 
      ILIKE '%${search}' 
      OR "geoCode") 
      ILIKE '%${search}' 
      OR "id") 
      ILIKE '%${search}' 
      OR 
        (
          SELECT STRING_AGG("name", ' ') 
          FROM "CountryTranslation" 
          WHERE "countryId" = c."id"
        ) 
      ILIKE '%${search}%')`
    )

    const typeCondition = sqlCondition(type, `"type" = '${type}'`)

    const hiddenCondition = sqlCondition(
      hidden !== undefined,
      `"hidden" = ${hidden}`
    )

    const sortByDatapoints = `(SELECT COUNT(id) 
      FROM "Value" 
      WHERE "countryId" = c.id)`

    const sortStatement = sql(
      `ORDER BY ${
        sort === "datapoints" ? sortByDatapoints : `"${sort}"`
      } ${sortDirection}`
    )

    const data = prisma.$queryRaw<CountryWithDatapoints[]>`
      SELECT *, 
        (SELECT COUNT(id) 
        FROM "Value" 
        WHERE "countryId" = c.id)::int
      AS datapoints 
      FROM "Country" c 
      LEFT JOIN "CountryTranslation" t 
      ON
      c."id" = t."countryId" 
      AND t."language"::text = ${lang}
      WHERE ${searchCondition}
      AND ${typeCondition} 
      AND ${hiddenCondition} 
      ${sortStatement}`

    return data
  },
}

export default CountryService
