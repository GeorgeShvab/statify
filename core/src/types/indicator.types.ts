import prisma from "@prisma/client"

export type Indicator = prisma.Indicator &
  Pick<
    prisma.IndicatorTranslation,
    "label" | "description" | "dataset" | "source" | "unit"
  >

export interface IndicatorWithDatapoints extends Indicator {
  datapoints: number
}

export interface CountryIndicator extends Indicator {
  countryName?: string
  countryId: string
}
