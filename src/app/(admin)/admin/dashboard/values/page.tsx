import "@/app/(admin)/admin/dashboard/values/styles.scss"
import ValuesDashboardTools from "@/containers/values-dashboard-tools/ValuesDashboardTools"
import ValuesDashboardHeader from "@/containers/values-dashboard-header/ValuesDashboardHeader"
export { default as metadata } from "@/app/(admin)/admin/dashboard/values/metadata"

const ValuesDashboardPage = () => {
  return (
    <main className="container">
      <div className="admin-dashboard">
        <ValuesDashboardHeader />
        <ValuesDashboardTools />
      </div>
    </main>
  )
}

export default ValuesDashboardPage
