import DashboardHeading from "@/components/dashboard-heading/DashboardHeading"
import Button from "@/ui/button/Button"
import PlusIcon from "@/ui/icons/PlusIcon"
import "@/containers/values-dashboard-header/styles.scss"

const ValuesDashboardHeader = () => {
  return (
    <div className="dashboard-header">
      <DashboardHeading
        title="Values Dashboard"
        subtitle="Manage values: view and edit information, add new values."
      />
      <Button color="dark" className="dashboard-header__create-button">
        <PlusIcon />
        <span>Create</span>
      </Button>
    </div>
  )
}

export default ValuesDashboardHeader
