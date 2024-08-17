import { FC, useState } from 'react'
import '@/containers/ChartManagementModal/ChartManager/style.css'
import IconButton from '@/ui/IconButton/IconButton'
import SquaresIcon from '@/ui/Icons/Squares'
import BrushIcon from '@/ui/Icons/Brush'
import Palette from '@/components/Palette/Palette'
import ColorPicker from '@/components/ColorPicker/ColorPicker'
import ColorInput from '@/components/ColorInput/ColorInput'
import { ColorPickerPopoverProps } from './ColorPickerPopover.types'

const ColorPickerPopover: FC<ColorPickerPopoverProps> = ({
  defaultColor,
  setColor
}) => {
  const [section, setSection] = useState<'palette' | 'picker'>('palette')

  return (
    <div>
      <div className='mb-1 md:mb-1.5 flex gap-1 md:gap-1.5'>
        <IconButton
          className={`shadow ${section === 'palette' ? '!bg-white' : '!text-neutral-400 !bg-neutral-50'}`}
          color='white'
          onClick={() => setSection('palette')}
        >
          <SquaresIcon className='w-[22px] h-[22px]' />
        </IconButton>
        <IconButton
          className={`shadow ${section === 'picker' ? '!bg-white' : '!text-neutral-400 !bg-neutral-50'}`}
          color='white'
          onClick={() => setSection('picker')}
        >
          <BrushIcon className='w-5 h-5' />
        </IconButton>
        <ColorInput
          className='shadow'
          color={defaultColor}
          onChange={setColor}
        />
      </div>
      <div className='rounded-lg p-2 border bg-white shadow'>
        {section === 'picker' ? (
          <ColorPicker color={defaultColor} onChange={setColor} />
        ) : (
          <Palette color={defaultColor} onChange={setColor} />
        )}
      </div>
    </div>
  )
}

export default ColorPickerPopover
