import { ChartProvider } from '@/components/Chart/ChartContext'
import { Indicator } from '@prisma/client'
import dynamic from 'next/dynamic'
import { FC } from 'react'
import ChartTitle from './ChartTitle'

const ChartComponent = dynamic(() => import('@/components/Chart/Chart'), { ssr: false })
const RangeSlider = dynamic(() => import('@/components/Chart/RangeSlider'), { ssr: false })

interface Props {
  initial: string[]
  indicator: Indicator
  country: string
}

const Chart: FC<Props> = ({ initial, indicator, country }) => {
  return (
    <ChartProvider initial={initial} indicator={indicator.id} country={country}>
      <>
        <div className="container mb-2 md:mb-3.5">
          <div className="px-2 pr-3 pt-4 pb-2 pt-4 md:pt-6 md:px-7 md:pb-3 rounded-lg bg-white border relative">
            <ChartTitle label={indicator.label} unit={indicator.unit} />
            <div className="!min-h-[336px] md:!min-h-[528px] overflow-hidden pb-2" id="chart">
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
    </ChartProvider>
  )
}

export default Chart
