import "@/app/(admin)/admin/dashboard/countries/styles.scss"
import CountriesDashboardTools from "@/containers/countries-dashboard-tools/CountriesDashboardTools"
import CountriesDashboardHeader from "@/containers/countries-dashboard-header/CountriesDashboardHeader"
export { default as metadata } from "@/app/(admin)/admin/dashboard/countries/metadata"

const CountriesDashboardPage = () => {
  return (
    <main className="container">
      <div className="admin-dashboard">
        <CountriesDashboardHeader />
        <CountriesDashboardTools />
      </div>
    </main>
  )
}

export default CountriesDashboardPage
