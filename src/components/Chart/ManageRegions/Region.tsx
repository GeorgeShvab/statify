import { ChartItem } from '@/types'
import MinusIcon from '@/ui/Icons/MinusIcon'
import PlusIcon from '@/ui/Icons/PlusIcon'
import { FC, memo } from 'react'

interface Props {
  isSelected: boolean
  onClick: (data: { isSelected: boolean; id: string; name: string }) => void
  id: string
  name: string
}

const Region: FC<Props> = ({ onClick, ...props }) => {
  const handleClick = () => {
    onClick(props)
  }

  return (
    <li
      className={`px-6 pr-3 text-sm flex items-center justify-between transition-colors ${
        props.isSelected ? 'bg-neutral-100' : 'md:hover:bg-neutral-50'
      }`}
      onClick={handleClick}
      role="button"
    >
      <span className="text-neutral-700">{props.name}</span>
      <button
        className="text-neutral-500 h-10 w-10 flex justify-center items-center"
        aria-label={props.isSelected ? 'Unselect' : 'Select'}
      >
        {props.isSelected ? <MinusIcon className="w-5 h-5" /> : <PlusIcon className="w-5 h-5" />}
      </button>
    </li>
  )
}

export default memo(Region)
