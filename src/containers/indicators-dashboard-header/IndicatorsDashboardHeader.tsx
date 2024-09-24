"use client"

import { useRouter } from "next/navigation"
import Button from "@/ui/button/Button"
import IconButton from "@/ui/icon-button/IconButton"
import PlusIcon from "@/ui/icons/PlusIcon"
import RefreshIcon from "@/ui/icons/RefreshIcon"
import CreateIndicatorModal from "@/containers/modals/create-indicator-modal/CreateIndicatorModal"
import DashboardHeading from "@/components/dashboard-heading/DashboardHeading"
import { useModal } from "@/providers/modal-provider/ModalProvider"
import "@/containers/indicators-dashboard-header/styles.scss"

const IndicatorsDashboardHeader = () => {
  const router = useRouter()

  const { openModal } = useModal()

  const handleCreateIndicatorClick = () => {
    openModal(<CreateIndicatorModal />, { scrollable: true })
  }

  const handleRefresh = () => router.refresh()

  return (
    <div className="dashboard-header">
      <DashboardHeading
        title="Indicators Dashboard"
        subtitle="Manage indicators here: view and edit information, add new datapoints."
      />
      <Button
        color="dark"
        className="dashboard-header__create-button"
        onClick={handleCreateIndicatorClick}
      >
        <PlusIcon />
        <span>Create</span>
      </Button>
      <IconButton onClick={handleRefresh}>
        <RefreshIcon />
      </IconButton>
    </div>
  )
}

export default IndicatorsDashboardHeader
