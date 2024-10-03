import axios, { AxiosRequestConfig } from "axios"
import {
  BookmarkParams,
  CountrySelectAutocompleteResponse,
  IndicatorSelectAutocompleteResponse,
  IndicatorsSearchAutocompleteResponse,
} from "@/api/public/types"
import apiRoutes from "@/constants/apiRoutes"

export const bookmarkDataset = (args: BookmarkParams) =>
  axios.post(apiRoutes.public.bookmark, args)

export const getBookmarkedDataset = (args: BookmarkParams) =>
  axios.get(apiRoutes.public.bookmark, { params: args })

export const getSearchAutocomplete = (
  query: string,
  config: AxiosRequestConfig
) =>
  axios.get<IndicatorsSearchAutocompleteResponse>(
    apiRoutes.public.indicators.autocomplete.search,
    {
      params: { query },
      ...config,
    }
  )

export const getIndicatorSelectAutocomplete = () =>
  axios.get<IndicatorSelectAutocompleteResponse>(
    apiRoutes.public.indicators.autocomplete.select
  )

export const getCountrySelectAutocomplete = () =>
  axios.get<CountrySelectAutocompleteResponse>(
    apiRoutes.public.countries.autocomplete.select
  )
