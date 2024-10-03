import { Indicator } from "@prisma/client"

export interface BookmarkParams {
  indicator: string
  country?: string
}

export type IndicatorSelectAutocompleteResponse = {
  label: string
  value: string
}[]

export type CountrySelectAutocompleteResponse = {
  label: string
  value: string
}[]

export type IndicatorsSearchAutocompleteResponse = Indicator[]
