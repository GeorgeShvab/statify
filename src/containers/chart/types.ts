import { CountryWithValues } from "@/types/country.types"

export interface ChartItem extends CountryWithValues {
  isSelected: boolean
  color?: string
}
