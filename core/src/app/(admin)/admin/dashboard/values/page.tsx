import ValueService from "@/services/value-service/ValueService"
import AdminDashboard from "@/containers/admin-dashboard/AdminDashboard"
import ValuesDashboard from "@/containers/values-dashboard/ValuesDashboard"
import adminDashboardValuesPageSchema from "@/utils/validation-schemas/pages/admin-dashboard-values-page"
import pageValidationMiddleware from "@/middlewares/page-validation-middleware/pageValidationMiddleware"

export { default as metadata } from "@/app/(admin)/admin/dashboard/values/metadata"

const ValuesDashboardPage = pageValidationMiddleware(
  async ({ searchParams }) => {
    const { country, indicator } = searchParams

    const normalizedCountry = country === "all" ? undefined : country
    const normalizedIndicator = indicator === "all" ? undefined : indicator

    const { data } = await ValueService.getForAdmin({
      ...searchParams,
      country: normalizedCountry,
      indicator: normalizedIndicator,
    })

    return (
      <main className="container">
        <AdminDashboard>
          <ValuesDashboard {...searchParams} values={data} />
        </AdminDashboard>
      </main>
    )
  },
  adminDashboardValuesPageSchema
)

export const dynamic = "force-dynamic"

export default ValuesDashboardPage
