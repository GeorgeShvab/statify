import { Country } from "@/types/country.types"
import { Indicator } from "@/types/indicator.types"

export interface IndicatorDetailsSectionProps {
  indicator: Indicator
  country?: Country
}
