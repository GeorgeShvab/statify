export default {
  indicators: {
    country: {
      download: (indicatorId: string, countryId: string) =>
        `/api/download/${indicatorId}/${countryId}`,
    },
    download: (indicatorId: string) => `/api/download/${indicatorId}`,
  },
  admin: {
    indicator: {
      update: (id: string) => `/api/admin/indicator/${id}`,
    },
  },
}
