import CountryService from "@/services/country-service/CountryService"
import AdminDashboard from "@/containers/admin-dashboard/AdminDashboard"
import CountriesDashboard from "@/containers/countries-dashboard/CountriesDashboard"
import adminDashboardCountriesPageSchema from "@/utils/validation-schemas/pages/admin-dashboard-countries-page"
import pageValidationMiddleware from "@/middlewares/page-validation-middleware/pageValidationMiddleware"

export { default as metadata } from "@/app/(admin)/admin/dashboard/countries/metadata"

const CountriesDashboardPage = pageValidationMiddleware(
  async ({ searchParams }) => {
    const { status, type } = searchParams

    const normalizedStatus = status === "all" ? undefined : status === "hidden"
    const normalizedType = type === "all" ? undefined : type

    const countries = await CountryService.getForAdmin({
      ...searchParams,
      hidden: normalizedStatus,
      type: normalizedType,
    })

    return (
      <main className="container">
        <AdminDashboard>
          <CountriesDashboard {...searchParams} countries={countries} />
        </AdminDashboard>
      </main>
    )
  },
  adminDashboardCountriesPageSchema
)

export const dynamic = "force-dynamic"

export default CountriesDashboardPage
