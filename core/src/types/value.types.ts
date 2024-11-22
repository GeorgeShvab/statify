import Prisma from "@prisma/client"

export type RowValue = Pick<Prisma.Value, "id" | "year" | "value">
