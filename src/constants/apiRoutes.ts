export default {
  indicators: {
    country: {
      download: (indicatorId: string, countryId: string) =>
        `/api/download/${indicatorId}/${countryId}`,
    },
    download: (indicatorId: string) => `/api/download/${indicatorId}`,
  },
  admin: {
    indicators: {
      update: (id: string) => `/api/admin/indicators/${id}`,
      hide: "/api/admin/indicators/hide",
      expose: "/api/admin/indicators/expose",
      create: "/api/admin/indicators",
    },
  },
}
