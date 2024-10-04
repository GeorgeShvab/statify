import { AreaType, Country, Indicator, Value } from "@prisma/client"

export interface HideCountriesParams {
  ids: string[]
}

export interface ExposeCountriesParams {
  ids: string[]
}

export interface UpdateCountryParams extends Partial<Country> {
  id: string
}

export interface CreateCountryParams extends Partial<Country> {
  id: string
  name: string
  type: AreaType
  hidden: boolean
}

export interface UpdateIndicatorParams extends Partial<Indicator> {
  id: string
}

export interface CreateIndicatorParams extends Partial<Indicator> {
  id: string
  label: string
  hidden: boolean
  absolute: boolean
  showChart: boolean
  precision: number
  ranking: number
}

export interface HideIndicatorsParams {
  ids: string[]
}

export interface ExposeIndicatorsParams {
  ids: string[]
}

export type CreateValueParams = Pick<
  Value,
  "value" | "year" | "countryId" | "indicatorId"
>

export interface UpdateValueParams extends Partial<Value> {
  id: number
}
