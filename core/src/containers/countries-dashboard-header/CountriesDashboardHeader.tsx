import { useRouter } from "next/navigation"
import Button from "@/ui/button/Button"
import IconButton from "@/ui/icon-button/IconButton"
import PlusIcon from "@/ui/icons/PlusIcon"
import RefreshIcon from "@/ui/icons/RefreshIcon"
import CreateCountryModal from "@/containers/modals/create-country-modal/CreateCountryModal"
import DashboardHeading from "@/components/dashboard-heading/DashboardHeading"
import { useModal } from "@/providers/modal-provider/ModalProvider"
import translate from "@/modules/i18n"

const CountriesDashboardHeader = () => {
  const router = useRouter()

  const { openModal } = useModal()

  const handleCreateCountryClick = () => {
    openModal(<CreateCountryModal />, { scrollable: true })
  }

  const handleRefresh = () => router.refresh()

  return (
    <div
      className="admin-dashboard-header"
      data-testid="admin-dashboard-header"
    >
      <DashboardHeading
        title={translate("pages.countries_dashboard.title")}
        subtitle={translate("pages.countries_dashboard.subtitle")}
      />
      <Button
        color="dark"
        className="admin-dashboard-header__create-button"
        data-testid="admin-dashboard-add-button"
        onClick={handleCreateCountryClick}
        startIcon={<PlusIcon />}
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

export default CountriesDashboardHeader
