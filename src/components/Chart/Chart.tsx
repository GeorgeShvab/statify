'use client'

import { FC, useMemo } from 'react'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  ChartOptions,
  ChartData,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import useChart from './ChartContext'
import Alert from '@/ui/Alert/Alert'
import { useRange } from './RangeContext'
import { ChartItem } from '@/types'

ChartJS.register(ArcElement, Tooltip, Legend, LinearScale, CategoryScale, PointElement, LineElement)

const Chart: FC = () => {
  const { regions, isError, removeError, shortening } = useChart()
  const { range, selectedRange } = useRange()

  const selectedRegions = useMemo(() => regions.filter((item) => item.isSelected), [regions])

  const filteredRange = range.filter((item) => item >= selectedRange[0] && item <= selectedRange[1])

  const data: ChartData<'line'> = {
    labels: filteredRange.filter((item) => item >= selectedRange[0] && item <= selectedRange[1]),
    datasets: selectedRegions.map((item: ChartItem) => {
      const values = item.values.filter((item) => item.year >= selectedRange[0] && item.year <= selectedRange[1])

      let data = []
      let i = 0,
        j = 0

      while (i < filteredRange.length) {
        if (filteredRange[i] === values[j]?.year) {
          data.push(values[j]?.value)
          i++, j++
        } else {
          data.push(null)
          i++
        }
      }

      return {
        data: data,
        borderColor: item.color,
        fill: false,
        borderWidth: 1,
        pointRadius: window.screen.width > 768 ? 2 : 0,
        pointHover: window.screen.width > 768 ? 2 : 0,
        pointBackgroundColor: item.color,
      }
    }),
  }

  const options: ChartOptions<'line'> = {
    animation: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        animation: false,
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value) => {
            const label = Number(shortening ? Number(value) / shortening : value)
            if (label % 1 !== 0) return label.toFixed(1)
            return label
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: window.screen.width > 768 ? true : false,
  }

  if (!shortening) return null

  if (!data.datasets.length) {
    return (
      <div className="!h-[300px] md:!h-[480px] mb-3 md:mb-5 flex justify-center items-center">
        <p className="text-sm md:text-base text-neutral-400">Please add a region to the chart</p>
      </div>
    )
  }

  if (selectedRange[0] === selectedRange[1]) {
    return (
      <div className="!h-[300px] md:!h-[480px] mb-3 md:mb-5 flex justify-center items-center">
        <p className="text-sm md:text-base text-neutral-400">Please choose a wider time range</p>
      </div>
    )
  }

  return (
    <div>
      <Alert show={isError} text="Up to 15 countries can be added to the chart" onClose={removeError} />
      <Line data={data} options={options} className="country-row-chart !h-[300px] md:!h-[480px] mb-3 md:mb-4" />
      <div className="flex gap-3 md:gap-6 justify-center flex-wrap">
        {selectedRegions.map((item, index) => (
          <div className="flex items-center gap-1.5 md:gap-2" key={item.id}>
            <span className="chart-label-color h-[2px] w-3 md:w-4 block" style={{ backgroundColor: item.color }}></span>
            <span className="rounded-lg text-xs md:text-sm text-neutral-500 whitespace-nowrap">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Chart
