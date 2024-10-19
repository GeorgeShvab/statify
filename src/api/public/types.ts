import { Indicator } from "@prisma/client"

export interface BookmarkParams {
  indicator: string
  country?: string
}

export type IndicatorsSearchAutocompleteResponse = Indicator[]
