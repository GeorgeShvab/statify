import countries from "@/constants/options/countries.json"
import indicators from "@/constants/options/indicators.json"

export const valueSortOptions = [
  {
    value: "id",
    label: "ID",
  },
  {
    value: "value",
    label: "Value",
  },
  {
    value: "year",
    label: "Year",
  },
  {
    value: "updatedAt",
    label: "Date of updation",
  },
  {
    value: "indicatorId",
    label: "Indicator ID",
  },
  {
    value: "countryId",
    label: "Country ID",
  },
] as const

export const possibleValueSortQueryParam = valueSortOptions.map(
  (item) => item.value
)

export const valueIndicatorOptions = [
  {
    value: "all",
    label: "All indicators",
  },
  ...indicators,
] as const

export const possibleValueIndicatorQueryParam = valueIndicatorOptions.map(
  (item) => item.value
)

export const valueCountryOptions = [
  {
    value: "all",
    label: "All countries",
  },
  ...countries,
] as const

export const possibleValueCountryQueryParam = valueCountryOptions.map(
  (item) => item.value
)

export const valueSearchQueryKey = "search"
export const valueSortQueryKey = "sort"
export const valueCountryQueryKey = "country"
export const valueIndicatorQueryKey = "indicator"

export const possibleValueSortDirectionQueryParam = ["asc", "desc"] as const
