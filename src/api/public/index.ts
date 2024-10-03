import axios, { AxiosRequestConfig } from "axios"
import apiRoutes from "@/constants/apiRoutes"
import { BookmarkParams } from "./types"

export const bookmarkDataset = (args: BookmarkParams) =>
  axios.post(apiRoutes.public.bookmark, args)

export const getBookmarkedDataset = (args: BookmarkParams) =>
  axios.get(apiRoutes.public.bookmark, { params: args })

export const getSearchAutocomplete = (
  query: string,
  config: AxiosRequestConfig
) =>
  axios.get(apiRoutes.public.indicators.autocomplete.search, {
    params: { query },
    ...config,
  })

export const getIndicatorSelectAutocomplete = () =>
  axios.get(apiRoutes.public.indicators.autocomplete.select)

export const getCountrySelectAutocomplete = () =>
  axios.get(apiRoutes.public.countries.autocomplete.select)
