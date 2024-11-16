import { FC } from "react"
import Slider, { SliderProps } from "rc-slider"
import "rc-slider/assets/index.css"
import {
  Range,
  RangeSliderProps,
} from "@/components/chart/components/range-slider/types"
import cn from "@/utils/cn/cn"
import "@/components/chart/components/range-slider/styles.scss"

const RangeSlider: FC<RangeSliderProps> = ({
  range,
  className,
  selectedRange,
  handleSelectRange,
}) => {
  const shortenedRange = range.filter(
    (item, index) => item % 5 === 0 || index === 0 || index === range.length - 1
  )

  const handleSelect = ((range: Range) => {
    const newRange: Range = [shortenedRange[range[0]], shortenedRange[range[1]]]

    handleSelectRange(newRange)
  }) as SliderProps["onChange"]

  const sliderDefaultValue = [0, shortenedRange.length - 1]

  const sliderValue = [
    shortenedRange.indexOf(selectedRange[0]),
    shortenedRange.indexOf(selectedRange[selectedRange.length - 1]),
  ]

  const marks = shortenedRange.reduce(
    (acc, curr, index) => ({ ...acc, [index]: curr }),
    {}
  )

  return (
    <div className={cn(className, "range-slider")}>
      <Slider
        min={0}
        max={shortenedRange.length - 1}
        value={sliderValue}
        step={1}
        defaultValue={sliderDefaultValue}
        marks={marks}
        onChange={handleSelect}
        ariaLabelForHandle="Change years range"
        range
      />
    </div>
  )
}

export default RangeSlider
