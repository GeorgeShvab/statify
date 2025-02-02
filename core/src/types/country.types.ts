import prisma from "@prisma/client"
import { RowValue } from "@/types/value.types"

export type Country = prisma.Country & Pick<prisma.CountryTranslation, "name">

export interface CountryWithDatapoints extends Country {
  datapoints: number
}

export interface CountryWithValues extends Country {
  values: RowValue[]
  maxValue: RowValue
}

export type CountryRowValue = RowValue & Pick<Country, "id" | "name">
