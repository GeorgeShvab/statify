"use client"

import Slider from "rc-slider"
import { FC } from "react"
import "rc-slider/assets/index.css"
import { useChart } from "@/containers/chart/chart-provider/ChartProvider"

const RangeSlider: FC = () => {
  const { range, selectedRange, setSelectedRange } = useChart()

  const shortenedRange = range.filter(
    (item, index) => item % 5 === 0 || index === 0 || index === range.length - 1
  )

  const handleChangeYears = (minMax: number[] | number) => {
    if (Array.isArray(minMax)) {
      setSelectedRange([shortenedRange[minMax[0]], shortenedRange[minMax[1]]])
    }
    // In current implementation minMax is always array
  }

  return (
    <Slider
      className="mb-[18px] md:mb-4"
      min={0}
      max={shortenedRange.length - 1}
      value={[
        shortenedRange.indexOf(selectedRange[0]) !== -1
          ? shortenedRange.indexOf(selectedRange[0])
          : 0,
        shortenedRange.indexOf(selectedRange[1]) !== -1
          ? shortenedRange.indexOf(selectedRange[1])
          : shortenedRange.length - 1,
      ]}
      step={1}
      defaultValue={[0, shortenedRange.length - 1]}
      marks={shortenedRange.reduce(
        (acc, curr, index) => ({ ...acc, [index]: curr }),
        {}
      )}
      onChange={handleChangeYears}
      ariaLabelForHandle="Change years range"
      range
    />
  )
}

export default RangeSlider
