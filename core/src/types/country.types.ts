import { Country } from "@prisma/client"
import { RowValue } from "@/types/value.types"

export interface CountryWithDatapoints extends Country {
  datapoints: number
}

export interface CountryWithValues extends Country {
  values: RowValue[]
  maxValue: RowValue
}

export type CountryRowValue = RowValue & Pick<Country, "id" | "name">
