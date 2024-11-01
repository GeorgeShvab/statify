import { FC } from "react"
import { IndicatorsListViewLoaderProps } from "@/containers/indicators-list-view/types"
import IndicatorCardLoader from "@/components/indicator-card/Loader"
import "@/containers/indicators-list-view/styles.scss"

const IndicatorsListViewLoader: FC<IndicatorsListViewLoaderProps> = ({
  text,
}) => {
  return (
    <div className="indicators-list-view">
      <div className="indicators-list-view__content">
        <div className="container">
          <h2 className="indicators-list-view__title">{text}</h2>
          <div className="indicators-list">
            {new Array(9).fill(null).map((item, index) => (
              <IndicatorCardLoader key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndicatorsListViewLoader
