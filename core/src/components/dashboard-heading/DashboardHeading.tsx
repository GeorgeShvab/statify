import { FC } from "react"
import { DashboardHeadingProps } from "@/components/dashboard-heading/DashboardHeading.types"
import "@/components/dashboard-heading/styles.scss"

const DashboardHeading: FC<DashboardHeadingProps> = ({ title, subtitle }) => {
  return (
    <div>
      <h1
        className="dashboard-heading__title"
        data-testid="admin-dashboard-title"
      >
        {title}
      </h1>
      <p
        className="dashboard-heading__subtitle"
        data-testid="admin-dashboard-subtitle"
      >
        {subtitle}
      </p>
    </div>
  )
}

export default DashboardHeading
