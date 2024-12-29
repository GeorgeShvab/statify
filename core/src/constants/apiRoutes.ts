export default {
  admin: {
    indicators: {
      update: (id: string) => `/admin/indicators/${id}`,
      hide: "/admin/indicators/hide",
      expose: "/admin/indicators/expose",
      create: "/admin/indicators",
      delete: "/admin/indicators",
      autocomplete: {
        select: "/admin/indicators/autocomplete/select",
      },
    },
    countries: {
      update: (id: string) => `/admin/countries/${id}`,
      hide: "/admin/countries/hide",
      expose: "/admin/countries/expose",
      create: "/admin/countries",
      delete: "/admin/countries",
      autocomplete: {
        select: "/admin/countries/autocomplete/select",
      },
    },
    values: {
      update: (id: number) => `/admin/values/${id}`,
      create: "/admin/values",
      delete: "/admin/values",
      get: "/admin/values",
    },
  },
  public: {
    download: {
      indicator: (indicatorId: string) => `/api/public/download/${indicatorId}`,
      country: (indicatorId: string, countryId: string) =>
        `/api/public/download/${indicatorId}/${countryId}`,
    },
    bookmark: {
      indicator: (id: string) => `/public/bookmark/${id}`,
      indicatorWithCountry: (indicatorId: string, countryId: string) =>
        `/public/bookmark/${indicatorId}/${countryId}`,
    },
    indicators: {
      autocomplete: {
        search: "/public/indicators/autocomplete/search",
      },
    },
  },
}
