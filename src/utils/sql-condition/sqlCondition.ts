import { Prisma } from "@prisma/client"

const sqlCondition = (condition: unknown, sql: string) => {
  if (condition) {
    return Prisma.sql([sql])
  }

  return Prisma.sql(["TRUE"])
}

export default sqlCondition
