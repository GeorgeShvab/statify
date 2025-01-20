import SearchIcon from "@/ui/icons/SearchIcon"
import translate from "@/modules/i18n"
import "@/containers/admin-dashboard/components/admin-dashboard-not-found-view/styles.scss"

const AdminDashboardNotFoundView = () => {
  return (
    <div className="admin-dashboard__not-found">
      <div aria-hidden={true} className="admin-dashboard__not-found-icon">
        <SearchIcon />
      </div>
      <p className="admin-dashboard__not-found-title">
        {translate("pages.dashboard.not_found_fallback")}
      </p>
    </div>
  )
}

export default AdminDashboardNotFoundView
