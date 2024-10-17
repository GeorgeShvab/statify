import { Indicator } from "@prisma/client"

export interface IndicatorWithDatapoints extends Indicator {
  datapoints: number
}

export interface CountryIndicator extends Indicator {
  countryName?: string
  countryId: string
}
