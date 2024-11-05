import { FC } from "react"
import { StatusPageProps } from "@/containers/status-page/types"
import "./styles.scss"

const StatusPage: FC<StatusPageProps> = ({
  linkText,
  title,
  icon,
  linkHref,
}) => {
  return (
    <main className="status-page">
      <div className="container">
        <div className="status-page__container">
          <div className="status-page__wrapper">
            <div className="status-page__icon">{icon}</div>
            <h1 className="status-page__title">{title}</h1>
            <div className="status-page__link">
              <a href={linkHref}>{linkText}</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default StatusPage
