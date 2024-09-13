import DashboardHeading from "@/components/dashboard-heading/DashboardHeading"
import Button from "@/ui/button/Button"
import PlusIcon from "@/ui/icons/PlusIcon"
import "@/containers/countries-dashboard-header/styles.scss"

const CountriesDashboardHeader = () => {
  return (
    <div className="dashboard-header">
      <DashboardHeading
        title="Countries Dashboard"
        subtitle="Manage countries: view and edit information, add new countries."
      />
      <Button color="dark" className="dashboard-header__create-button">
        <PlusIcon />
        <span>Create</span>
      </Button>
    </div>
  )
}

export default CountriesDashboardHeader
