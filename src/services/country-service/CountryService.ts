import { Prisma } from "@prisma/client"
import prisma from "@/prisma"
import { CountryRowValue, CountryWithValues } from "@/types/types"
import { GetAdminCountriesParams } from "./types"

const CountryService = {
  async get({ id }: { id: string }) {
    return await prisma.country.findUnique({ where: { id } })
  },

  async getCountries({
    indicator,
  }: {
    indicator: string
  }): Promise<CountryWithValues[]> {
    return await prisma.$queryRaw`SELECT c.id, c.name, 
    ARRAY(SELECT JSON_BUILD_OBJECT('id', v.id, 'value', v.value, 'year', v.year)
     FROM "Value" v WHERE "indicatorId" = ${indicator} AND "countryId" = c."id" AND "year" <= ${new Date().getFullYear()} ORDER BY "year" ASC) as values,
     (SELECT JSON_BUILD_OBJECT('value', v.value, 'year', v.year)  
     FROM "Value" v WHERE "indicatorId" = ${indicator} AND "countryId" = c."id" 
     AND "year" <= ${new Date().getFullYear()} AND v.value = 
     (SELECT ABS(MAX(ABS(value))) FROM "Value" WHERE "indicatorId" = ${indicator} AND "countryId" = c."id" 
     AND "year" <= ${new Date().getFullYear()}) ORDER BY "value" DESC LIMIT 1) as "maxValue"
    FROM "Country" c WHERE c."hidden" IS FALSE AND (SELECT COUNT("id") FROM "Value" WHERE "indicatorId" = ${indicator} AND "countryId" = c."id" AND "year" <= ${new Date().getFullYear()}) > 0 ORDER BY "name" ASC`
  },

  async getCountriesValueByIndicator({
    indicator,
  }: {
    indicator: string
  }): Promise<CountryRowValue[]> {
    return await prisma.$queryRaw`SELECT c.id, c.name, (SELECT "value" FROM "Value" WHERE "indicatorId" = ${indicator} AND "countryId" = c."id" AND "year" <= ${new Date().getFullYear()} ORDER BY "year" DESC LIMIT 1) as value,
    (SELECT "year" FROM "Value" WHERE "indicatorId" = ${indicator} AND "countryId" = c."id" AND "year" <= ${new Date().getFullYear()} ORDER BY "year" DESC LIMIT 1) as year
     FROM "Country" c WHERE c."hidden" IS FALSE AND (SELECT COUNT("id") FROM "Value" WHERE "indicatorId" = ${indicator} AND "countryId" = c."id" AND "year" <= ${new Date().getFullYear()}) > 0 ORDER BY "name" ASC`
  },

  async getCountry({
    indicator,
    country,
  }: {
    indicator: string
    country: string
  }) {
    const data: CountryWithValues[] = await prisma.$queryRaw`SELECT c.*, 
    ARRAY(SELECT JSON_BUILD_OBJECT('id', v.id, 'value', v.value, 'year', v.year)
     FROM "Value" v WHERE "indicatorId" = ${indicator} AND "countryId" = ${country} 
     AND "year" <= ${new Date().getFullYear()} ORDER BY "year" ASC) as values,
     (SELECT JSON_BUILD_OBJECT('value', v.value, 'year', v.year)  
     FROM "Value" v WHERE "indicatorId" = ${indicator} AND "countryId" = c."id" 
     AND "year" <= ${new Date().getFullYear()} AND v.value = 
     (SELECT ABS(MAX(ABS(value))) FROM "Value" WHERE "indicatorId" = ${indicator} AND "countryId" = c."id" 
     AND "year" <= ${new Date().getFullYear()}) ORDER BY "value" DESC LIMIT 1) as "maxValue"
     FROM "Country" c WHERE (SELECT COUNT("id") FROM "Value" WHERE "indicatorId" = ${indicator} AND "countryId" = ${country} AND "year" <= ${new Date().getFullYear()}) > 0 AND id = ${country} ORDER BY "name" ASC`

    return data[0]
  },

  async getAdminCountries({
    search,
    hidden,
    sort,
    sortDirection,
    type,
  }: GetAdminCountriesParams) {
    const searchCondition = Prisma.sql([
      search
        ? `(LOWER("iso2Code") LIKE LOWER('%${search}') OR LOWER("geoCode") LIKE LOWER('%${search}') OR LOWER("id") LIKE LOWER('%${search}') OR LOWER("name") LIKE LOWER('%${search}%'))`
        : "TRUE",
    ])

    // TODO: Refactor all the services later
    const typeCondition = Prisma.sql([
      type === "country"
        ? '"country" = TRUE'
        : type === "region"
          ? '"geographicRegion" = TRUE'
          : type === "state"
            ? '"independentState" = TRUE'
            : type === "union"
              ? '"union" = TRUE'
              : "TRUE",
    ])

    const hiddenCondition = Prisma.sql([
      hidden !== undefined ? `"hidden" = ${hidden}` : "TRUE",
    ])

    const sortByDatapoints =
      '(SELECT COUNT(id) FROM "Value" WHERE "countryId" = c.id)'

    const sortStatement = Prisma.sql([
      `ORDER BY ${
        sort === "datapoints" ? sortByDatapoints : `"${sort}"`
      } ${sortDirection}`,
    ])

    const data =
      await prisma.$queryRaw`SELECT *, (SELECT COUNT(id) FROM "Value" WHERE "countryId" = c.id)::int as datapoints FROM "Country" c WHERE ${searchCondition} AND ${typeCondition} AND ${hiddenCondition} ${sortStatement}`

    return data
  },
}

export default CountryService