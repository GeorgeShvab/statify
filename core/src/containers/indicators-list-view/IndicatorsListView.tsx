import { FC } from "react"
import { IndicatorsListViewProps } from "@/containers/indicators-list-view/types"
import IndicatorsList from "@/containers/indicators-list/IndicatorsList"
import Pagination from "@/components/pagination/Pagination"
import "@/containers/indicators-list-view//styles.scss"

const IndicatorsListView: FC<IndicatorsListViewProps> = ({
  data,
  page,
  text,
  pages,
  fallback,
}) => {
  const content = data?.length ? <IndicatorsList data={data} /> : fallback

  return (
    <div className="indicators-list-view">
      <div className="indicators-list-view__content">
        <div className="container">
          <h2 className="indicators-list-view__title">{text}</h2>
          {content}
        </div>
      </div>
      {Boolean(data?.length) && page && pages && (
        <div className="container">
          <Pagination pages={pages} page={page} />
        </div>
      )}
    </div>
  )
}

export default IndicatorsListView
