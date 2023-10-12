'use client'

import useChart from './ChartContext'
import Slider from 'rc-slider'
import { FC } from 'react'
import 'rc-slider/assets/index.css'

const RangeSlider: FC = () => {
  const { range, setSelectedRange } = useChart()

  const handleChangeYears: any = (minMax: number[]) => {
    setSelectedRange(range.filter((item) => item >= minMax[0] && item <= minMax[1]))
  }

  return (
    <Slider
      className="mb-[18px] md:mb-4"
      min={range[0]}
      max={range[range.length - 1]}
      step={1}
      defaultValue={[range[0], range[range.length - 1]]}
      marks={
        window.screen.width > 768
          ? range
              .filter((item) => item % 2 === 0)
              .reduce((state, current) => {
                if (current in state) {
                  return state
                } else {
                  return { ...state, [current]: current }
                }
              }, {})
          : range
              .filter((item) => item % 5 === 0)
              .reduce((state, current) => {
                if (current in state) {
                  return state
                } else {
                  return { ...state, [current]: current }
                }
              }, {})
      }
      onChange={handleChangeYears}
      ariaLabelForHandle="Change years range"
      range
    />
  )
}

export default RangeSlider
