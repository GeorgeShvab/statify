import { AxiosRequestConfig } from "axios"
import {
  BookmarkParams,
  IndicatorsSearchAutocompleteResponse,
} from "@/api/public/types"
import apiRoutes from "@/constants/apiRoutes"
import axiosInstance from "@/modules/axios"

export const bookmarkDataset = (args: BookmarkParams) =>
  axiosInstance.post(apiRoutes.public.bookmark, args)

export const getBookmarkedDataset = (args: BookmarkParams) =>
  axiosInstance.get(apiRoutes.public.bookmark, { params: args })

export const getSearchAutocomplete = (
  query: string,
  config: AxiosRequestConfig
) =>
  axiosInstance.get<IndicatorsSearchAutocompleteResponse>(
    apiRoutes.public.indicators.autocomplete.search,
    {
      params: { query },
      ...config,
    }
  )
