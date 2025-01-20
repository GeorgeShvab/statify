import {
  getCountrySelectAutocomplete,
  getIndicatorSelectAutocomplete,
} from "@/api/admin"

export default {
  sort: (full: boolean = false) =>
    (
      [
        {
          value: "id",
          label: "pages.values_dashboard.selects.sort.by_id",
        },
        {
          value: "value",
          label: "pages.values_dashboard.selects.sort.by_value",
        },
        {
          value: "year",
          label: "pages.values_dashboard.selects.sort.by_year",
        },
        {
          value: "updatedAt",
          label: "pages.values_dashboard.selects.sort.by_date_of_update",
        },
        {
          value: "indicatorId",
          label: "pages.values_dashboard.selects.sort.by_indicator_id",
        },
        {
          value: "countryId",
          label: "pages.values_dashboard.selects.sort.by_country_id",
        },
      ] as const
    ).filter(({ value }) => full || (value !== "value" && value !== "year")),
  indicator: getIndicatorSelectAutocomplete,
  country: getCountrySelectAutocomplete,
} as const
