import { CountryServiceInterface } from "@/services/country-service/types"
import { Option } from "@/ui/select/Select.types"
import sqlCondition from "@/utils/sql-condition/sqlCondition"
import sql from "@/utils/sql/sql"
import {
  CountryRowValue,
  CountryWithDatapoints,
  CountryWithValues,
} from "@/types/types"
import prisma from "@/prisma"

const year = new Date().getFullYear()

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
    await prisma.country.deleteMany({ where: { id: { in: ids } } })
  },

  async getById(id) {
    return prisma.country.findUnique({ where: { id } })
  },

  async getSelectAutocomplete(): Promise<Option[]> {
    const data = prisma.country
      .findMany({
        where: {
          hidden: false,
        },
        select: {
          id: true,
          name: true,
        },
        orderBy: {
          name: "asc",
        },
      })
      .then((countries) =>
        countries.map((country) => ({
          value: country.id,
          label: country.name,
        }))
      )

    return data
  },

  async getManyWithValuesByIndicator(id) {
    const data = prisma.$queryRaw<CountryWithValues[]>`
    SELECT c.id, c.name, 
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
      WHERE "indicatorId" = ${id} 
      AND "countryId" = c."id" 
      AND "year" <= ${year} 
      AND v.value = 
        (SELECT ABS(MAX(ABS(value))) 
        FROM "Value" 
        WHERE "indicatorId" = ${id} 
        AND "countryId" = c."id" 
        AND "year" <= ${year}) 
      ORDER BY "value" DESC LIMIT 1) 
    AS "maxValue"
    FROM "Country" c 
    WHERE c."hidden" IS FALSE 
    AND 
      (SELECT COUNT("id") 
      FROM "Value" 
      WHERE "indicatorId" = ${id} 
      AND "countryId" = c."id" 
      AND "year" <= ${year}) 
    > 0 
    ORDER BY "name" ASC`

    return data
  },

  async getIndicatorTableValues(indicator) {
    const data = prisma.$queryRaw<CountryRowValue[]>`
    SELECT c.id, c.name, 
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
    WHERE c."hidden" IS FALSE 
    AND 
      (SELECT COUNT("id") 
      FROM "Value" 
      WHERE "indicatorId" = ${indicator} 
      AND "countryId" = c."id" 
      AND "year" <= ${year})
    > 0 
    ORDER BY "name" ASC`

    return data
  },

  async getCountryTableValues(indicator, country) {
    const data = await prisma.$queryRaw<CountryWithValues[]>`
    SELECT c.*, 
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
    WHERE 
      (SELECT COUNT("id") 
      FROM "Value" 
      WHERE "indicatorId" = ${indicator} 
      AND "countryId" = ${country} 
      AND "year" <= ${year}) 
    > 0 
    AND id = ${country} 
    ORDER BY "name" ASC`

    return data[0]
  },

  async getForAdmin({ search, hidden, sort, sortDirection, type }) {
    const searchCondition = sqlCondition(
      search,
      `(LOWER("iso2Code") 
      LIKE LOWER('%${search}') 
      OR LOWER("geoCode") 
      LIKE LOWER('%${search}') 
      OR LOWER("id") 
      LIKE LOWER('%${search}') 
      OR LOWER("name") 
      LIKE LOWER('%${search}%'))`
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
      WHERE ${searchCondition}
      AND ${typeCondition} 
      AND ${hiddenCondition} 
      ${sortStatement}`

    return data
  },
}

export default CountryService
