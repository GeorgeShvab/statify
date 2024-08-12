import { ChartItem } from '@/types'
import { FC, useMemo } from 'react'
import ChartManagerRegionsList from '@/components/Chart/ChartManager/ChartManagerRegionsList'

interface Props {
  regions: Pick<ChartItem, 'id' | 'name' | 'isSelected' | 'color'>[]
  query: string
  onClick: (data: Pick<ChartItem, 'id' | 'name' | 'isSelected'>) => void
  setColor: (id: string, color: string) => void
}

const ChartManagerSelectedSection: FC<Props> = ({
  regions,
  onClick,
  setColor,
  query
}) => {
  const data = useMemo(() => {
    return query
      ? regions.filter(
          (item) =>
            new RegExp(`(^|\\s)${query}`, 'gi').test(item.name.trim()) &&
            item.isSelected
        )
      : regions.filter((item) => item.isSelected)
  }, [query, regions])

  return (
    <ChartManagerRegionsList
      regions={data}
      onClick={onClick}
      setColor={setColor}
    />
  )
}

export default ChartManagerSelectedSection
