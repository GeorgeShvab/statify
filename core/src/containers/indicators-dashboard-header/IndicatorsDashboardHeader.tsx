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
    <div
      className="admin-dashboard-header"
      data-testid="admin-dashboard-header"
    >
      <DashboardHeading
        title="Indicators Dashboard"
        subtitle="Manage indicators: define descriptions, unit, and other essential details."
      />
      <Button
        color="dark"
        className="admin-dashboard-header__create-button"
        onClick={handleCreateIndicatorClick}
        startIcon={<PlusIcon />}
        data-testid="admin-dashboard-add-button"
      >
        Create
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

export default IndicatorsDashboardHeader
