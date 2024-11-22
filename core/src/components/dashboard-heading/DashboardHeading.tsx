import { FC } from "react"
import "@/components/dashboard-heading/styles.scss"
import { DashboardHeadingProps } from "@/components/dashboard-heading/DashboardHeading.types"

const DashboardHeading: FC<DashboardHeadingProps> = ({ title, subtitle }) => {
  return (
    <div>
      <h1 className="dashboard-heading__title">{title}</h1>
      <p className="dashboard-heading__subtitle">{subtitle}</p>
    </div>
  )
}

export default DashboardHeading
