import "@/app/(admin)/admin/dashboard/indicators/styles.scss"
import IndicatorsDashboardTools from "@/containers/indicators-dashboard-tools/IndicatorsDashboardTools"
import IndicatorsDashboardHeader from "@/containers/indicators-dashboard-header/IndicatorsDashboardHeader"
import IndicatorsDashboardTable from "@/containers/indicators-dashboard-table/IndicatorsDashboardTable"
export { default as metadata } from "@/app/(admin)/admin/dashboard/indicators/metadata"

const IndicatorsDashboardPage = () => {
  return (
    <main className="container">
      <div className="admin-dashboard">
        <IndicatorsDashboardHeader />
        <IndicatorsDashboardTools />
        <IndicatorsDashboardTable />
      </div>
    </main>
  )
}

export default IndicatorsDashboardPage
