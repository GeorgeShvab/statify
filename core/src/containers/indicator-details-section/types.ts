import { Indicator, Country } from "@prisma/client"

export interface IndicatorDetailsSectionProps {
  indicator: Indicator
  country?: Country
}
