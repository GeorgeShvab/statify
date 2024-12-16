import IndicatorService from "@/services/indicator-service/IndicatorService"
import AdminDashboard from "@/containers/admin-dashboard/AdminDashboard"
import IndicatorsDashboard from "@/containers/indicators-dashboard/IndicatorsDashboard"
import adminDashboardIndicatorsPageSchema from "@/utils/validation-schemas/pages/admin-dashboard-indicators-page"
import pageValidationMiddleware from "@/middlewares/page-validation-middleware/pageValidationMiddleware"

export { default as metadata } from "@/app/(admin)/admin/dashboard/indicators/metadata"

const IndicatorsDashboardPage = pageValidationMiddleware(
  async ({ searchParams }) => {
    const { status } = searchParams

    const normalizedStatus = status === "all" ? undefined : status === "hidden"

    const indicators = await IndicatorService.getForAdmin({
      ...searchParams,
      hidden: normalizedStatus,
    })

    return (
      <main className="container">
        <AdminDashboard>
          <IndicatorsDashboard {...searchParams} indicators={indicators} />
        </AdminDashboard>
      </main>
    )
  },
  adminDashboardIndicatorsPageSchema
)

export const dynamic = "force-dynamic"

export default IndicatorsDashboardPage
