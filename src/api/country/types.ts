import { Country } from "@prisma/client"

export interface HideCountriesParams {
  ids: string[]
}

export interface ExposeCountriesParams {
  ids: string[]
}

export interface UpdateCountryParams extends Partial<Country> {
  id: string
}