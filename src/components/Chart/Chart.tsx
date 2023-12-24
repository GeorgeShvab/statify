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

ChartJS.register(ArcElement, Tooltip, Legend, LinearScale, CategoryScale, PointElement, LineElement)

const Chart: FC = () => {
  const { regions, isError, removeError, selectedRange, isLoading, shortening } = useChart()

  const selectedRegions = useMemo(() => regions.filter((item) => item.isSelected), [regions])

  if (isLoading) return null

  let greatest = 0

  const data: ChartData<'line'> = {
    labels: selectedRange,
    datasets: selectedRegions.map((item) => {
      const arr = selectedRange.map((year) => {
        const value = item.values.find((item) => item.year === year)?.value || null
        if (value && value > greatest) greatest = value
        return value
      })

      return {
        data: arr,
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

  return (
    <div>
      <Alert show={isError} text="Up to 15 countries can be added to the chart" onClose={removeError} />
      <Line data={data} options={options} className="country-row-chart !h-[300px] md:!h-[480px] mb-3 md:mb-5" />
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
