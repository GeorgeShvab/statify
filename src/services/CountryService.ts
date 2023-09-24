import { Country, Value } from '@/types'
import prisma from '../../prisma/prisma'

const CountryService = {
  async get({ id }: { id: string }) {
    return await prisma.country.findUnique({ where: { id } })
  },

  async getCountries({ indicator }: { indicator: string }): Promise<(Country & { values: Value[] })[]> {
    return await prisma.$queryRaw`SELECT c.*, 
    ARRAY(SELECT JSON_BUILD_OBJECT('id', v.id, 'country', v."countryId", 'value', v.value, 'year', v.year)
     FROM "Value" v WHERE "indicatorId" = ${indicator} AND "countryId" = c."id" AND "year" <= ${new Date().getFullYear()} ORDER BY "year" ASC) 
     as values FROM "Country" c WHERE (SELECT COUNT("id") FROM "Value" WHERE "indicatorId" = ${indicator} AND "countryId" = c."id" AND "year" <= ${new Date().getFullYear()}) > 0 ORDER BY "name" ASC`
  },
}

export default CountryService
