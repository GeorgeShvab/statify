import { Value, Country, ChartCountry } from '@/types'
import throttle from '@/utils/throttle'
import { FC, useState, UIEvent, useCallback, memo, useMemo } from 'react'
import Region from './Region'

interface Props {
  regions: { id: string; name: string; isSelected: boolean }[]
  onClick: (data: string) => void
}

const ManageRegionsList: FC<Props> = ({ regions, onClick }) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false)

  const handleScroll = useCallback(
    throttle((e: UIEvent<HTMLDivElement>) => {
      const scrollTop = (e.target as HTMLDivElement).scrollTop

      if (scrollTop > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }, 75),
    []
  )

  const onItemClick = useCallback(onClick, [regions])

  return (
    <ul
      className={`overflow-auto pb-2 pretty-scrollbar transition-all ${
        isScrolled ? 'shadow-[inset_-5px_5px_5px_-5px_rgba(0,_0,_0,_0.15)]' : ''
      }`}
      onScroll={handleScroll}
    >
      {regions.map((item) => (
        <Region {...item} onClick={onItemClick} key={item.id} />
      ))}
    </ul>
  )
}

export default ManageRegionsList
