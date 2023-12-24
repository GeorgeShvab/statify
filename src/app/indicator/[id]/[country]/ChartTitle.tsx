'use client'

import useChart from '@/components/Chart/ChartContext'
import CopyChartButton from '@/components/Chart/CopyChartButton'
import { FC } from 'react'

interface Props {
  label: string
  unit: string | null
}

const ChartTitle: FC<Props> = ({ label, unit }) => {
  const { regions, shortening } = useChart()

  let shortened = null

  if (shortening === 1000000000000) {
    shortened = 'Trillions of '
  } else if (shortening === 1000000000) {
    shortened = 'Billions of '
  } else if (shortening === 1000000) {
    shortened = 'Millions of '
  } else if (shortening === 1000) {
    shortened = 'Thousands of '
  } else if (shortening) {
    shortened = ''
  }

  if (regions.length === 0) return null

  return (
    <div className="mb-0.5 relative px-8">
      <div className="absolute right-0 md:left-auto md:right-10 top-0">
        <CopyChartButton />
      </div>
      <h2 className="text-center font-semibold text-sm md:text-lg mb-0.5">{label}</h2>
      <p className="text-center text-[10px] md:text-xs text-neutral-400">
        {shortened ? shortened + unit : unit && unit?.at(0)?.toUpperCase() + unit?.slice(1, unit.length)}
      </p>
    </div>
  )
}

export default ChartTitle
