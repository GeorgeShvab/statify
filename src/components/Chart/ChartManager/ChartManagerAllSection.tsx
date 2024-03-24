import { ChartItem } from '@/types'
import { FC, useMemo } from 'react'
import ChartManagerRegionsList from './ChartManagerRegionsList'

interface Props {
  regions: Pick<ChartItem, 'id' | 'name' | 'isSelected' | 'color'>[]
  query: string
  onClick: (data: Pick<ChartItem, 'id' | 'name' | 'isSelected'>) => void
  setColor: (id: string, color: string) => void
}

const ChartManagerAllSection: FC<Props> = ({ regions, onClick, setColor, query }) => {
  const data = useMemo(() => {
    return query ? regions.filter((item) => new RegExp(`(^|\\s)${query}`, 'gi').test(item.name.trim())) : regions
  }, [query, regions])

  return <ChartManagerRegionsList regions={data} onClick={onClick} setColor={setColor} />
}

export default ChartManagerAllSection
