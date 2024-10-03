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

export const getValueSortOptions = (includeSpecialOptions: boolean) => {
  if (includeSpecialOptions) return valueSortOptions

  return valueSortOptions.filter(
    (item) => item.value !== "value" && item.value !== "year"
  )
}

export const possibleValueSortQueryParam = valueSortOptions.map(
  (item) => item.value
)

export const initialValueIndicatorOptions = {
  value: "all",
  label: "All indicators",
}

export const initialValueCountryOptions = {
  value: "all",
  label: "All countries",
}

export const valueSearchQueryKey = "search"
export const valueSortQueryKey = "sort"
export const valueCountryQueryKey = "country"
export const valueIndicatorQueryKey = "indicator"

export const possibleValueSortDirectionQueryParam = ["asc", "desc"] as const
