export default {
  admin: {
    indicators: {
      update: (id: string) => `/api/admin/indicators/${id}`,
      hide: "/api/admin/indicators/hide",
      expose: "/api/admin/indicators/expose",
      create: "/api/admin/indicators",
      delete: "/api/admin/indicators",
      autocomplete: {
        select: "/api/admin/indicators/autocomplete/select",
      },
    },
    countries: {
      update: (id: string) => `/api/admin/countries/${id}`,
      hide: "/api/admin/countries/hide",
      expose: "/api/admin/countries/expose",
      create: "/api/admin/countries",
      delete: "/api/admin/countries",
      autocomplete: {
        select: "/api/admin/countries/autocomplete/select",
      },
    },
    values: {
      update: (id: number) => `/api/admin/values/${id}`,
      create: "/api/admin/values",
      delete: "/api/admin/values",
      get: "/api/admin/values",
    },
  },
  public: {
    download: {
      indicator: (indicatorId: string) => `/api/public/download/${indicatorId}`,
      country: (indicatorId: string, countryId: string) =>
        `/api/public/download/${indicatorId}/${countryId}`,
    },
    bookmark: "/api/public/bookmark",
    indicators: {
      autocomplete: {
        search: "/api/public/indicators/autocomplete/search",
      },
    },
  },
}
