import { FC } from "react"
import { IndicatorsListProps } from "@/containers/indicators-list/types"
import IndicatorCard from "@/components/indicator-card/IndicatorCard"
import "@/containers/indicators-list/styles.scss"

const IndicatorsList: FC<IndicatorsListProps> = ({ data }) => {
  return (
    <div className="indicators-list">
      {data.map((item) => (
        <IndicatorCard key={(item.countryId || "") + item.id} {...item} />
      ))}
    </div>
  )
}

export default IndicatorsList
