export default {
  sort: [
    { value: "id", label: "pages.countries_dashboard.selects.sort.by_id" },
    { value: "name", label: "pages.countries_dashboard.selects.sort.by_name" },
    {
      value: "geoCode",
      label: "pages.countries_dashboard.selects.sort.by_geocode",
    },
    {
      value: "iso2Code",
      label: "pages.countries_dashboard.selects.sort.by_iso2code",
    },
    {
      value: "datapoints",
      label: "pages.countries_dashboard.selects.sort.by_datapoints",
    },
    {
      value: "updatedAt",
      label: "pages.countries_dashboard.selects.sort.by_date_of_update",
    },
  ],
  status: [
    {
      value: "all",
      label: "pages.countries_dashboard.selects.status.all",
    },
    {
      value: "visible",
      label: "pages.countries_dashboard.selects.status.visible",
    },
    {
      value: "hidden",
      label: "pages.countries_dashboard.selects.status.hidden",
    },
  ],
  type: [
    {
      value: "all",
      label: "pages.countries_dashboard.selects.type.all",
    },
    {
      value: "country",
      label: "pages.countries_dashboard.selects.type.country",
    },
    {
      value: "union",
      label: "pages.countries_dashboard.selects.type.union",
    },
    {
      value: "region",
      label: "pages.countries_dashboard.selects.type.region",
    },
    {
      value: "other",
      label: "pages.countries_dashboard.selects.type.other",
    },
  ],
} as const
