import { useRouter } from "next/navigation"
import Button from "@/ui/button/Button"
import IconButton from "@/ui/icon-button/IconButton"
import PlusIcon from "@/ui/icons/PlusIcon"
import RefreshIcon from "@/ui/icons/RefreshIcon"
import CreateValueModal from "@/containers/modals/create-value-modal/CreateValueModal"
import DashboardHeading from "@/components/dashboard-heading/DashboardHeading"
import { useModal } from "@/providers/modal-provider/ModalProvider"
import translate from "@/modules/i18n"

const ValuesDashboardHeader = () => {
  const router = useRouter()

  const { openModal } = useModal()

  const handleCreateValueClick = () => {
    openModal(<CreateValueModal />)
  }

  const handleRefresh = () => router.refresh()

  return (
    <div
      className="admin-dashboard-header"
      data-testid="admin-dashboard-header"
    >
      <DashboardHeading
        title={translate("pages.values_dashboard.title")}
        subtitle={translate("pages.values_dashboard.subtitle")}
      />
      <Button
        color="dark"
        className="admin-dashboard-header__create-button"
        data-testid="admin-dashboard-add-button"
        startIcon={<PlusIcon />}
        onClick={handleCreateValueClick}
      >
        {translate("common.create")}
      </Button>
      <IconButton
        onClick={handleRefresh}
        data-testid="admin-dashboard-refresh-button"
      >
        <RefreshIcon />
      </IconButton>
    </div>
  )
}

export default ValuesDashboardHeader
