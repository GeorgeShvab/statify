import prisma from '../../prisma/prisma'

const CountryService = {
  async get({ id }: { id: string }) {
    return await prisma.country.findUnique({ where: { id } })
  },

  async getCountries({ indicator }: { indicator: string }) {
    return await prisma.country.findMany({
      include: {
        values: {
          orderBy: { year: 'asc' },
          where: { indicatorId: indicator, year: { lte: new Date().getFullYear() } },
        },
      },
      orderBy: { name: 'asc' },
    })
  },
}

export default CountryService
