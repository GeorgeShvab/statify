import AbsolutePosition from '@/components/AbsolutePosition'
import Portal from '@/components/Portal'
import { ChartItem } from '@/types'
import MinusIcon from '@/ui/Icons/MinusIcon'
import PlusIcon from '@/ui/Icons/PlusIcon'
import { FC, memo, useRef, useState } from 'react'
import ColorPickerPopover from './ColorPickerPopover'
import DetectOutsideClick from '@/components/DetectOutsideClick'

interface Props extends Pick<ChartItem, 'id' | 'name' | 'isSelected' | 'color'> {
  onClick: (data: Pick<ChartItem, 'id' | 'name' | 'isSelected' | 'color'>) => void
  setColor: (id: string, color: string) => void
}

const ChartManagerListItem: FC<Props> = ({ onClick, setColor, ...props }) => {
  const pickColorButton = useRef<HTMLButtonElement>(null)

  const [isColorPickerOpen, setIsColorPickerOpen] = useState<boolean>(false)

  const handleClick = () => {
    onClick(props)
  }

  return (
    <>
      <li
        className={`px-6 pr-3 gap-0.5 text-sm flex items-center justify-between transition-colors ${
          props.isSelected ? 'bg-neutral-100' : 'md:hover:bg-neutral-50'
        }`}
      >
        <span className="text-neutral-700">{props.name}</span>
        <button
          className="text-neutral-500 h-10 w-10 flex justify-center items-center bg-red ml-auto"
          aria-label="Select color"
          onClick={() => setIsColorPickerOpen((prev) => !prev)}
          ref={pickColorButton}
        >
          <div className="rounded border h-5 w-5" style={{ backgroundColor: props.color || undefined }}></div>
        </button>
        <button
          className="text-neutral-500 h-10 w-10 flex justify-center items-center hover:text-neutral-700 transition-colors"
          aria-label={props.isSelected ? 'Unselect' : 'Select'}
          onClick={handleClick}
        >
          {props.isSelected ? <MinusIcon className="w-5 h-5" /> : <PlusIcon className="w-5 h-5" />}
        </button>
      </li>
      {isColorPickerOpen && (
        <Portal>
          <AbsolutePosition position={{ default: 'top-center', 769: 'top-left' }} anchor={pickColorButton}>
            <DetectOutsideClick exclude={pickColorButton} onOutsideClick={() => setIsColorPickerOpen(false)}>
              <ColorPickerPopover defaultColor={props.color} setColor={(color) => setColor(props.id, color)} />
            </DetectOutsideClick>
          </AbsolutePosition>
        </Portal>
      )}
    </>
  )
}

export default memo(
  ChartManagerListItem,
  (prevProps, nextProps) => prevProps.isSelected === nextProps.isSelected && prevProps.color === nextProps.color
)
