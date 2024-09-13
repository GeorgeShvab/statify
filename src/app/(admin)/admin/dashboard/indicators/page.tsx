import "@/app/(admin)/admin/dashboard/indicators/styles.scss"
import IndicatorsDashboardTools from "@/containers/indicators-dashboard-tools/IndicatorsDashboardTools"
import IndicatorsDashboardHeader from "@/containers/indicators-dashboard-header/IndicatorsDashboardHeader"

const AdminPage = () => {
  return (
    <main className="container">
      <div className="admin-dashboard">
        <IndicatorsDashboardHeader />
        <IndicatorsDashboardTools />
      </div>
    </main>
  )
}

export default AdminPage
