"use client"

import { useChart } from "@/containers/chart/chart-provider/ChartProvider"
import { FC } from "react"
import { ChartTitleProps } from "./ChartTitle.types"

const ChartTitle: FC<ChartTitleProps> = ({ label, unit }) => {
  const { data, shortening } = useChart()

  let shortened = null

  if (shortening === 1000000000000) {
    shortened = "Trillions of "
  } else if (shortening === 1000000000) {
    shortened = "Billions of "
  } else if (shortening === 1000000) {
    shortened = "Millions of "
  } else if (shortening === 1000) {
    shortened = "Thousands of "
  } else if (shortening) {
    shortened = ""
  }

  if (data.length === 0) return null

  const title: JSX.Element | string = shortening ? label : <>&nbsp;</>
  let subTitle: JSX.Element | string = <>&nbsp;</>

  if (shortening) {
    if (shortened) {
      subTitle = shortened + unit
    } else if (unit) {
      subTitle = unit?.charAt(0).toUpperCase() + unit?.slice(1, unit.length)
    }
  }

  return (
    <div className="mb-0.5 relative px-8" id="chart-header">
      <h2 className="text-center font-semibold text-sm md:text-lg mb-0.5">
        {title}
      </h2>
      <p className="text-center text-[10px] md:text-xs text-neutral-400">
        {subTitle}
      </p>
    </div>
  )
}

export default ChartTitle
