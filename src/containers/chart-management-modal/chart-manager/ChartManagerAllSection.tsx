import { FC, useMemo } from "react"
import ChartManagerRegionsList from "@/containers/chart-management-modal/chart-manager/ChartManagerRegionsList"
import { ChartItem } from "@/containers/chart/types"

interface Props {
  regions: Pick<ChartItem, "id" | "name" | "isSelected" | "color">[]
  query: string
  //onClick: (data: Pick<ChartItem, 'id' | 'name' | 'isSelected'>) => void
  //setColor: (id: string, color: string) => void
}

const ChartManagerAllSection: FC<Props> = ({ regions, query }) => {
  const data = useMemo(() => {
    return query
      ? regions.filter((item) =>
          new RegExp(`(^|\\s)${query}`, "gi").test(item.name.trim())
        )
      : regions
  }, [query, regions])

  return <ChartManagerRegionsList regions={data} />
}

export default ChartManagerAllSection
