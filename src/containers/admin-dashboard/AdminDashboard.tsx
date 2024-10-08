import { FC } from "react"
import { AdminDashboardProps } from "@/containers/admin-dashboard/types"
import "@/containers/admin-dashboard/styles.scss"

const AdminDashboard: FC<AdminDashboardProps> = (props) => {
  return <div className="admin-dashboard view-height" {...props} />
}

export default AdminDashboard
