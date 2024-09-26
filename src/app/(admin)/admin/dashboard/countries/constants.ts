export const countrySortOptions = [
  { value: "id", label: "ID" },
  { value: "name", label: "Name" },
  { value: "geoCode", label: "GeoCode" },
  { value: "iso2Code", label: "Iso2Code" },
  { value: "datapoints", label: "Datapoints" },
  { value: "updatedAt", label: "Date of updation" },
] as const

export const possibleCountrySortQueryParams = countrySortOptions.map(
  (item) => item.value
)

export const countryStatusOptions = [
  {
    value: "all",
    label: "All statuses",
  },
  {
    value: "visible",
    label: "Visible",
  },
  {
    value: "hidden",
    label: "Hidden",
  },
] as const

export const possibleCountryStatusQueryParams = countryStatusOptions.map(
  (item) => item.value
)

export const countryTypeOptions = [
  {
    value: "all",
    label: "All types",
  },
  {
    value: "country",
    label: "Country",
  },
  {
    value: "union",
    label: "Union",
  },
  {
    value: "region",
    label: "Geographic Region",
  },
  {
    value: "other",
    label: "Other",
  },
] as const

export const possibleCountryTypeQueryParams = countryTypeOptions.map(
  (item) => item.value
)

export const possibleCountrySortDirectionQueryParams = ["asc", "desc"] as const

export const countrySearchQueryKey = "search"
export const countrySortQueryKey = "sort"
export const countrySortDirectionQueryKey = "sortDirection"
export const countryStatusQueryKey = "status"
export const countryTypeQueryKey = "type"
