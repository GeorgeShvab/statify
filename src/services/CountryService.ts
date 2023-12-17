import { Country, Value } from '@/types'
import prisma from '../../prisma/prisma'

const CountryService = {
  async get({ id }: { id: string }) {
    return await prisma.country.findUnique({ where: { id } })
  },

  async getCountries({ indicator }: { indicator: string }): Promise<(Country & { values: Value[] })[]> {
    return await prisma.$queryRaw`SELECT c.id, c.name, 
    ARRAY(SELECT JSON_BUILD_OBJECT('value', v.value, 'year', v.year)
     FROM "Value" v WHERE "indicatorId" = ${indicator} AND "countryId" = c."id" AND "year" <= ${new Date().getFullYear()} ORDER BY "year" ASC) 
     as values FROM "Country" c WHERE (SELECT COUNT("id") FROM "Value" WHERE "indicatorId" = ${indicator} AND "countryId" = c."id" AND "year" <= ${new Date().getFullYear()}) > 0 ORDER BY "name" ASC`
  },

  async getCountriesValueByIndicator({
    indicator,
  }: {
    indicator: string
  }): Promise<(Country & { value: number; year: number })[]> {
    return await prisma.$queryRaw`SELECT c.id, c.name, (SELECT "value" FROM "Value" WHERE "indicatorId" = ${indicator} AND "countryId" = c."id" AND "year" <= ${new Date().getFullYear()} ORDER BY "year" DESC LIMIT 1) as value,
    (SELECT "year" FROM "Value" WHERE "indicatorId" = ${indicator} AND "countryId" = c."id" AND "year" <= ${new Date().getFullYear()} ORDER BY "year" DESC LIMIT 1) as year
     FROM "Country" c WHERE (SELECT COUNT("id") FROM "Value" WHERE "indicatorId" = ${indicator} AND "hidden" IS FALSE AND "countryId" = c."id" AND "year" <= ${new Date().getFullYear()}) > 0 ORDER BY "name" ASC`
  },

  async getCountry({
    indicator,
    country,
  }: {
    indicator: string
    country: string
  }): Promise<Country & { values: Value[] }> {
    const data: (Country & { values: Value[] })[] = await prisma.$queryRaw`SELECT c.*, 
    ARRAY(SELECT JSON_BUILD_OBJECT('id', v.id, 'country', v."countryId", 'value', v.value, 'year', v.year)
     FROM "Value" v WHERE "indicatorId" = ${indicator} AND "countryId" = ${country} AND "year" <= ${new Date().getFullYear()} ORDER BY "year" ASC) 
     as values FROM "Country" c WHERE (SELECT COUNT("id") FROM "Value" WHERE "indicatorId" = ${indicator} AND "countryId" = ${country} AND "year" <= ${new Date().getFullYear()}) > 0 AND id = ${country} ORDER BY "name" ASC`

    return data[0]
  },
}

export default CountryService
