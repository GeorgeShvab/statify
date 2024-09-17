import countries from "@/constants/options/countries.json"
import indicators from "@/constants/options/indicators.json"

export const valueSortOptions = [
  { value: "id", label: "ID" },
  { value: "country", label: "Country" },
  { value: "indicator", label: "Indicator" },
  { value: "value", label: "Value" },
  { value: "year", label: "Year" },
  { value: "createdAt", label: "Date of creation" },
  { value: "updatedAt", label: "Date of updation" },
]

export const valueIndicatorOptions = [
  {
    value: "all",
    label: "All indicators",
  },
  ...indicators,
  // There was an option to fetch all of the indicators and countries,
  // but there are not so much items realy
]

export const valueCountryOptions = [
  {
    value: "all",
    label: "All countries",
  },
  ...countries,
]

export const searchQueryKey = "search"
export const sortQueryKey = "sort"
export const countryQueryKey = "country"
export const indicatorQueryKey = "indicator"
