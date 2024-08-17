'use client'

import Slider from 'rc-slider'
import { FC } from 'react'
import 'rc-slider/assets/index.css'
import { useRange } from '@/containers/Chart/RangeProvider/RangeProvider'

const RangeSlider: FC = () => {
  const { range, selectedRange, setSelectedRange } = useRange()

  let shortenedRange = range.filter(
    (item, index) => item % 5 === 0 || index === 0 || index === range.length - 1
  )

  const handleChangeYears: any = (minMax: [number, number]) => {
    setSelectedRange([shortenedRange[minMax[0]], shortenedRange[minMax[1]]])
  }

  return (
    <Slider
      className='mb-[18px] md:mb-4'
      min={0}
      max={shortenedRange.length - 1}
      value={[
        shortenedRange.indexOf(selectedRange[0]) !== -1
          ? shortenedRange.indexOf(selectedRange[0])
          : 0,
        shortenedRange.indexOf(selectedRange[1]) !== -1
          ? shortenedRange.indexOf(selectedRange[1])
          : shortenedRange.length - 1
      ]}
      step={1}
      defaultValue={[0, shortenedRange.length - 1]}
      marks={shortenedRange.reduce(
        (acc, curr, index) => ({ ...acc, [index]: curr }),
        {}
      )}
      onChange={handleChangeYears}
      ariaLabelForHandle='Change years range'
      range
    />
  )
}

export default RangeSlider
