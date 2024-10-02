import { useRouter } from "next/navigation"
import Button from "@/ui/button/Button"
import IconButton from "@/ui/icon-button/IconButton"
import PlusIcon from "@/ui/icons/PlusIcon"
import RefreshIcon from "@/ui/icons/RefreshIcon"
import DashboardHeading from "@/components/dashboard-heading/DashboardHeading"
import "@/containers/values-dashboard-header/styles.scss"

const ValuesDashboardHeader = () => {
  const router = useRouter()

  const handleRefresh = () => router.refresh()

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
      <IconButton onClick={handleRefresh}>
        <RefreshIcon />
      </IconButton>
    </div>
  )
}

export default ValuesDashboardHeader
