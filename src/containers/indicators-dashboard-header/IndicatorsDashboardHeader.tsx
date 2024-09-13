import DashboardHeading from "@/components/dashboard-heading/DashboardHeading"
import Button from "@/ui/button/Button"
import PlusIcon from "@/ui/icons/PlusIcon"
import "@/containers/indicators-dashboard-header/styles.scss"

const IndicatorsDashboardHeader = () => {
  return (
    <div className="dashboard-header">
      <DashboardHeading
        title="Indicators Dashboard"
        subtitle="Manage indicators here: view and edit information, add new datapoints."
      />
      <Button color="dark" className="dashboard-header__create-button">
        <PlusIcon />
        <span>Create</span>
      </Button>
    </div>
  )
}

export default IndicatorsDashboardHeader
