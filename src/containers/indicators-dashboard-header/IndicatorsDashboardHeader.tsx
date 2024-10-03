"use client"

import { useRouter } from "next/navigation"
import Button from "@/ui/button/Button"
import IconButton from "@/ui/icon-button/IconButton"
import PlusIcon from "@/ui/icons/PlusIcon"
import RefreshIcon from "@/ui/icons/RefreshIcon"
import CreateIndicatorModal from "@/containers/modals/create-indicator-modal/CreateIndicatorModal"
import DashboardHeading from "@/components/dashboard-heading/DashboardHeading"
import { useModal } from "@/providers/modal-provider/ModalProvider"

const IndicatorsDashboardHeader = () => {
  const router = useRouter()

  const { openModal } = useModal()

  const handleCreateIndicatorClick = () => {
    openModal(<CreateIndicatorModal />, { scrollable: true })
  }

  const handleRefresh = () => router.refresh()

  return (
    <div className="admin-dashboard-header">
      <DashboardHeading
        title="Indicators Dashboard"
        subtitle="Manage indicators here: view and edit information, add new datapoints."
      />
      <Button
        color="dark"
        className="admin-dashboard-header__create-button"
        onClick={handleCreateIndicatorClick}
        startIcon={<PlusIcon />}
      >
        Create
      </Button>
      <IconButton onClick={handleRefresh}>
        <RefreshIcon />
      </IconButton>
    </div>
  )
}

export default IndicatorsDashboardHeader
