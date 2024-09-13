export default {
  home: "/",
  search: "/search",
  bookmarks: "/bookmarks",
  indicator: (indicatorId: string) => `/indicator/${indicatorId}`,
  country: (indicatorId: string, countryId: string) =>
    `/indicator/${indicatorId}/${countryId}`,
  admin: {
    signin: "/admin/signin",
    indicators: "/admin/dashboard/indicators",
    countries: "/admin/dashboard/countries",
    values: "/admin/dashboard/values",
  },
}
