import prisma from '../../prisma/prisma'

interface GetParams {
  indicator: string
  country?: string
  years?: number[] | number[][]
}

const ValueService = {
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
          orderBy: { year: 'asc' },
        })
      } else {
        data = await prisma.value.findMany({
          where: {
            indicatorId: indicator,

            year: { in: years as number[] },
            ...(country ? { countryId: country } : {}),
          },
          orderBy: { year: 'asc' },
        })
      }
    } else {
      data = await prisma.value.findMany({
        where: { indicatorId: indicator, ...(country ? { countryId: country } : {}) },
        orderBy: { year: 'asc' },
      })
    }

    return data
  },
}

export default ValueService
