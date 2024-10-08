import { Prisma, Value } from "@prisma/client"
import {
  CreateValueParams,
  GetAdminValuesParams,
} from "@/services/value-service/types"
import prisma from "@/prisma"

interface GetParams {
  indicator: string
  country?: string
  years?: number[] | number[][]
}

const ValueService = {
  async deleteByCountry(countryIds: string[]) {
    await prisma.value.deleteMany({ where: { countryId: { in: countryIds } } })
  },

  async deleteByIndicator(indicatorIds: string[]) {
    await prisma.value.deleteMany({
      where: { indicator: { id: { in: indicatorIds } } },
    })
  },

  async deleteMany(ids: number[]) {
    await prisma.value.deleteMany({ where: { id: { in: ids } } })
  },

  async create(data: CreateValueParams) {
    return prisma.value.create({ data })
  },

  async updateOne({ id, ...data }: Partial<Value> & Pick<Value, "id">) {
    await prisma.value.update({ where: { id }, data })
  },

  async getAdminValues({
    sort,
    sortDirection,
    country,
    indicator,
  }: GetAdminValuesParams) {
    const sortStatement = Prisma.sql([`ORDER BY "${sort}" ${sortDirection}`])

    const countryCondition = Prisma.sql([
      country ? `"countryId" = '${country}'` : "TRUE",
    ])

    const indicatorCondition = Prisma.sql([
      indicator ? `"indicatorId" = '${indicator}'` : "TRUE",
    ])

    const data =
      await prisma.$queryRaw`SELECT * FROM "Value" WHERE ${indicatorCondition} AND ${countryCondition} ${sortStatement} LIMIT 2000`

    return data as Value[]
  },

  async get({ indicator, country, years }: GetParams) {
    let data

    if (years) {
      if (Array.isArray(years[0])) {
        data = await prisma.value.findMany({
          where: {
            indicatorId: indicator,
            AND: years.map((item) => ({
              year: {
                lte: (item as [number, number])[1],
                get: (item as [number, number])[0],
              },
            })),
            ...(country ? { countryId: country } : {}),
          },
          orderBy: { year: "asc" },
        })
      } else {
        data = await prisma.value.findMany({
          where: {
            indicatorId: indicator,

            year: { in: years as number[] },
            ...(country ? { countryId: country } : {}),
          },
          orderBy: { year: "asc" },
        })
      }
    } else {
      data = await prisma.value.findMany({
        where: {
          indicatorId: indicator,
          ...(country ? { countryId: country } : {}),
          year: { lte: new Date().getFullYear() },
        },
        orderBy: { year: "asc" },
      })
    }

    return data
  },
}

export default ValueService
