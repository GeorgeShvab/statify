import { useRouter } from "next/navigation"
import Button from "@/ui/button/Button"
import IconButton from "@/ui/icon-button/IconButton"
import PlusIcon from "@/ui/icons/PlusIcon"
import RefreshIcon from "@/ui/icons/RefreshIcon"
import CreateValueModal from "@/containers/modals/create-value-modal/CreateValueModal"
import DashboardHeading from "@/components/dashboard-heading/DashboardHeading"
import { useModal } from "@/providers/modal-provider/ModalProvider"

const ValuesDashboardHeader = () => {
  const router = useRouter()

  const { openModal } = useModal()

  const handleCreateValueClick = () => {
    openModal(<CreateValueModal />)
  }

  const handleRefresh = () => router.refresh()

  return (
    <div className="admin-dashboard-header">
      <DashboardHeading
        title="Values Dashboard"
        subtitle="Manage values: view and edit information, add new values."
      />
      <Button
        color="dark"
        className="admin-dashboard-header__create-button"
        startIcon={<PlusIcon />}
        onClick={handleCreateValueClick}
      >
        Create
      </Button>
      <IconButton onClick={handleRefresh}>
        <RefreshIcon />
      </IconButton>
    </div>
  )
}

export default ValuesDashboardHeader
