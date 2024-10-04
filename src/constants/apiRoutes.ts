export default {
  admin: {
    indicators: {
      update: (id: string) => `/api/admin/indicators/${id}`,
      hide: "/api/admin/indicators/hide",
      expose: "/api/admin/indicators/expose",
      create: "/api/admin/indicators",
    },
    countries: {
      update: (id: string) => `/api/admin/countries/${id}`,
      hide: "/api/admin/countries/hide",
      expose: "/api/admin/countries/expose",
      create: "/api/admin/countries",
    },
    values: {
      update: (id: number) => `/api/admin/values/${id}`,
      create: "/api/admin/values",
    },
  },
  public: {
    download: {
      indicator: (indicatorId: string) => `/api/public/download/${indicatorId}`,
      country: (indicatorId: string, countryId: string) =>
        `/api/public/download/${indicatorId}/${countryId}`,
    },
    bookmark: "/api/public/bookmark",
    countries: {
      autocomplete: {
        select: "/api/public/countries/autocomplete/select",
      },
    },
    indicators: {
      autocomplete: {
        select: "/api/public/indicators/autocomplete/select",
        search: "/api/public/indicators/autocomplete/search",
      },
    },
  },
}
