import { FC } from 'react'
import ChartManagerListItem from '@/containers/ChartManagementModal/ChartManager/ChartManagerListItem'
import useScroll from '@/hooks/useScroll'
import { ChartItem } from '@/types'
import useChartState from '@/containers/Chart/hooks/useChartState/useChartState'
import { useChart } from '@/containers/Chart/ChartProvider/ChartProvider'

interface Props {
  regions: Pick<ChartItem, 'id' | 'name' | 'isSelected' | 'color'>[]
  //onClick: (data: Pick<ChartItem, 'id' | 'name' | 'isSelected'>) => void
  //setColor: (id: string, color: string) => void
}

const ChartManagerRegionsList: FC<Props> = ({ regions }) => {
  const [{ isAtStart }, handleScroll] = useScroll()
  const { selectRegion, unselectRegion, setColor } = useChart()

  const content = regions.map((item) => {
    const onClick = () => {
      if (item.isSelected) {
        unselectRegion(item.id)
      } else {
        selectRegion(item.id)
      }
    }

    return (
      <ChartManagerListItem
        {...item}
        setColor={setColor}
        onClick={onClick}
        key={item.id}
      />
    )
  })

  return (
    <ul
      className={`overflow-auto pretty-scrollbar transition-all pb-2 ${
        !isAtStart ? 'shadow-[inset_-2px_5px_5px_-5px_rgba(0,_0,_0,_0.15)]' : ''
      }`}
      onScroll={handleScroll}
    >
      {content}
    </ul>
  )
}

export default ChartManagerRegionsList
