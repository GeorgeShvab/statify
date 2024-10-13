import { ValueServiceInterface } from "@/services/value-service/types"
import prisma from "@/prisma"

const ValueService: ValueServiceInterface = {
  async createOne(data) {
    return prisma.value.create({ data })
  },

  async updateOne({ id, ...data }) {
    await prisma.value.update({ where: { id }, data })
  },

  async deleteMany(ids) {
    await prisma.value.deleteMany({ where: { id: { in: ids } } })
  },

  async deleteManyByCountry(ids) {
    await prisma.value.deleteMany({ where: { countryId: { in: ids } } })
  },

  async deleteManyByIndicator(ids) {
    await prisma.value.deleteMany({
      where: { indicator: { id: { in: ids } } },
    })
  },

  async getForAdmin({
    sort,
    sortDirection,
    country,
    indicator,
    take = 1000,
    skip = 0,
  }) {
    const where = {
      ...(country ? { countryId: country } : {}),
      ...(indicator ? { indicatorId: indicator } : {}),
    }

    const orderBy = {
      [sort]: sortDirection,
    }

    const countPromise = prisma.value.count({ where })

    const dataPromise = prisma.value.findMany({
      where,
      orderBy,
      take,
      skip,
    })

    const [data, count] = await Promise.all([dataPromise, countPromise])

    console.log(where)

    return { data, count }
  },

  async getByIndicatorAndCountry(where) {
    const data = prisma.value.findMany({
      where,
      orderBy: { year: "asc" },
    })

    return data
  },
}

export default ValueService
