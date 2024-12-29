import { FC } from "react"
import { IndicatorsListViewProps } from "@/containers/indicators-list-view/types"
import IndicatorsList from "@/containers/indicators-list/IndicatorsList"
import Pagination from "@/components/pagination/Pagination"
import cn from "@/utils/cn/cn"
import "@/containers/indicators-list-view//styles.scss"

const IndicatorsListView: FC<IndicatorsListViewProps> = ({
  data,
  page,
  text,
  pages,
  fallback,
  showPagination = true,
  entirePageHeight = true,
}) => {
  const content = data?.length ? <IndicatorsList data={data} /> : fallback

  const shouldShowPagination = showPagination && !!data?.length && page && pages

  return (
    <div
      className={cn(
        "indicators-list-view",
        entirePageHeight && "indicators-list-view--entire-height"
      )}
      data-testid="indicators-list-view"
    >
      <div className="indicators-list-view__content">
        <div className="container">
          <h2
            className="indicators-list-view__title"
            data-testid="indicators-list-title"
          >
            {text}
          </h2>
          {content}
        </div>
      </div>
      {shouldShowPagination && (
        <div className="container">
          <Pagination pages={pages} page={page} />
        </div>
      )}
    </div>
  )
}

export default IndicatorsListView
