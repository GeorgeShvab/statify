import {
  BookmarkIndicatorParams,
  BookmarkIndicatorAndCountryParams,
  GetBookmarkResult,
} from "@/api/public/types"
import apiRoutes from "@/constants/apiRoutes"
import { CountryIndicator } from "@/types/indicator.types"
import axiosInstance from "@/modules/axios"

export const createBookmark = ({ indicator }: BookmarkIndicatorParams) =>
  axiosInstance.post(apiRoutes.public.bookmark.indicator(indicator))

export const removeBookmark = ({ indicator }: BookmarkIndicatorParams) =>
  axiosInstance.delete(apiRoutes.public.bookmark.indicator(indicator))

export const getBookmark = ({ indicator }: BookmarkIndicatorParams) =>
  axiosInstance.get<GetBookmarkResult>(
    apiRoutes.public.bookmark.indicator(indicator)
  )

export const createBookmarkWithCountry = ({
  indicator,
  country,
}: BookmarkIndicatorAndCountryParams) =>
  axiosInstance.post(
    apiRoutes.public.bookmark.indicatorWithCountry(indicator, country)
  )

export const removeBookmarkWithCountry = ({
  indicator,
  country,
}: BookmarkIndicatorAndCountryParams) =>
  axiosInstance.delete(
    apiRoutes.public.bookmark.indicatorWithCountry(indicator, country)
  )

export const getBookmarkWithCountry = ({
  indicator,
  country,
}: BookmarkIndicatorAndCountryParams) =>
  axiosInstance.get<GetBookmarkResult>(
    apiRoutes.public.bookmark.indicatorWithCountry(indicator, country)
  )

export const getSearchAutocomplete = (query: string, signal: AbortSignal) =>
  axiosInstance.get<CountryIndicator[]>(
    apiRoutes.public.indicators.autocomplete.search,
    {
      params: { query },
      signal,
    }
  )
