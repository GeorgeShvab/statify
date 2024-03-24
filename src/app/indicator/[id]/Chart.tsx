'use client'

import { ChartProvider } from '@/components/Chart/ChartContext'
import { Indicator } from '@prisma/client'
import dynamic from 'next/dynamic'
import { FC } from 'react'
import ChartTitle from '../../../components/Chart/ChartTitle'
import useGetChartData from '@/components/Chart/useGetChartData'
import { RangeProvider } from '@/components/Chart/RangeContext'
import CopyChartButton from '@/components/Chart/CopyChartButton'
import ManageRegionsButton from '@/components/Chart/ChartManager/ChartManagerButton'

const ChartComponent = dynamic(() => import('@/components/Chart/Chart'), { ssr: false })
const RangeSlider = dynamic(() => import('@/components/Chart/RangeSlider'), { ssr: false })

interface Props {
  indicator: Indicator
}

const Chart: FC<Props> = ({ indicator }) => {
  const data = useGetChartData(indicator.id)

  if (!data) {
    return (
      <>
        <div className="container mb-2 md:mb-3.5">
          <div className="px-2 pr-3 pt-4 pb-4 md:pt-6 md:px-7 md:pb-3 rounded-lg bg-white border relative" id="chart">
            <div className="mb-0.5 px-8">
              <h2 className="text-center font-semibold text-sm md:text-lg mb-0.5">&nbsp;</h2>
              <p className="text-center text-[10px] md:text-xs text-neutral-400">&nbsp;</p>
            </div>
            <div className="!min-h-[328px] md:!min-h-[520px] overflow-hidden"></div>
          </div>
        </div>
        <div className="container mb-2 md:mb-3.5 overflow-hidden">
          <div className="px-6 py-4 md:px-9 md:py-6 rounded-lg bg-white border">
            <div className="h-[32px] md:h-[30px]"></div>
          </div>
        </div>
      </>
    )
  }

  return (
    <ChartProvider regions={data?.map((item) => ({ ...item }))}>
      <RangeProvider>
        <>
          <div className="container mb-2 md:mb-3.5">
            <div className="px-3 pr-3 pt-4 pb-4 md:pt-6 md:px-7 md:pb-4 rounded-lg bg-white border relative" id="chart">
              <div className="absolute z-10 left-3 md:left-auto md:right-[68px] md:top-6">
                <CopyChartButton />
              </div>
              <div className="absolute z-10 right-3 md:right-7 md:top-6">
                <ManageRegionsButton />
              </div>
              <ChartTitle label={indicator.label} unit={indicator.unit} />
              <div className="!min-h-[328px] md:!min-h-[520px] overflow-hidden">
                <ChartComponent />
              </div>
            </div>
          </div>
          <div className="container mb-2 md:mb-3.5 overflow-hidden">
            <div className="px-6 py-4 md:px-9 md:py-6 rounded-lg bg-white border">
              <div className="h-[32px] md:h-[30px]">
                <RangeSlider />
              </div>
            </div>
          </div>
        </>
      </RangeProvider>
    </ChartProvider>
  )
}

export default Chart
