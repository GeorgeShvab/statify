import { BookmarkParams } from "@/api/public/types"
import apiRoutes from "@/constants/apiRoutes"
import { CountryIndicator } from "@/types/indicator.types"
import axiosInstance from "@/modules/axios"

export const bookmarkDataset = (args: BookmarkParams) =>
  axiosInstance.post(apiRoutes.public.bookmark, args)

export const getBookmarkedDataset = (args: BookmarkParams) =>
  axiosInstance.get(apiRoutes.public.bookmark, { params: args })

export const getSearchAutocomplete = (query: string, signal: AbortSignal) =>
  axiosInstance.get<CountryIndicator[]>(
    apiRoutes.public.indicators.autocomplete.search,
    {
      params: { query },
      signal,
    }
  )
