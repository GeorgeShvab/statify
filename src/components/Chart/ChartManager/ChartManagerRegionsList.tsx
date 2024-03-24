import { FC } from 'react'
import ChartManagerListItem from './ChartManagerListItem'
import useScroll from '@/hooks/useScroll'
import { ChartItem } from '@/types'

interface Props {
  regions: Pick<ChartItem, 'id' | 'name' | 'isSelected' | 'color'>[]
  onClick: (data: Pick<ChartItem, 'id' | 'name' | 'isSelected'>) => void
  setColor: (id: string, color: string) => void
}

const ChartManagerRegionsList: FC<Props> = ({ regions, onClick, setColor }) => {
  const [{ isAtStart }, handleScroll] = useScroll()

  return (
    <ul
      className={`overflow-auto pretty-scrollbar transition-all pb-2 ${
        !isAtStart ? 'shadow-[inset_-2px_5px_5px_-5px_rgba(0,_0,_0,_0.15)]' : ''
      }`}
      onScroll={handleScroll}
    >
      {regions.map((item) => (
        <ChartManagerListItem {...item} setColor={setColor} onClick={onClick} key={item.id} />
      ))}
    </ul>
  )
}

export default ChartManagerRegionsList
