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
          label: "Date of update",
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
    ).filter(({ value }) => full || (value !== "value" && value !== "year")),
  indicator: getIndicatorSelectAutocomplete,
  country: getCountrySelectAutocomplete,
} as const
