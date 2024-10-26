import { FC } from "react"
import { InfoViewProps } from "@/containers/info-view/types"
import "@/containers/info-view/styles.scss"

const InfoView: FC<InfoViewProps> = ({ icon, text }) => {
  return (
    <div className="info-view">
      <div className="info-view__icon-container" aria-hidden={true}>
        {icon}
      </div>
      <p className="info-view__title">{text}</p>
    </div>
  )
}

export default InfoView
