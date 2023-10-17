import { FC, useCallback } from 'react'
import Region from './Region'
import useScroll from '@/hooks/useScroll'

interface Props {
  regions: { id: string; name: string; isSelected: boolean }[]
  onClick: (data: { isSelected: boolean; id: string; name: string }) => void
}

const ManageRegionsList: FC<Props> = ({ regions, onClick }) => {
  const [isScrolled, handleScroll] = useScroll()

  const onItemClick = useCallback(onClick, [regions])

  return (
    <ul
      className={`overflow-auto pb-2 pretty-scrollbar transition-all ${
        isScrolled ? 'shadow-[inset_-2px_5px_5px_-5px_rgba(0,_0,_0,_0.15)]' : ''
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
