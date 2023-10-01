'use client'

import { FC } from 'react'
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

const chartColors = ['#3484F0', 'red', 'orange', 'green', 'purple']

const Chart: FC = () => {
  const { data: countries, isError, removeError, selectedRange } = useChart()

  const data: ChartData<'line'> = {
    labels: selectedRange,
    datasets: countries.map((item, index) => {
      const arr = selectedRange.map((year) => item.values.find((item) => item.year === year)?.value || null)

      return {
        data: arr,
        borderColor: chartColors[index],
        fill: false,
        borderWidth: 1,
        pointRadius: window.screen.width > 768 ? 2 : 0,
        pointHover: window.screen.width > 768 ? 2 : 0,
        pointBackgroundColor: chartColors[index],
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
    responsive: true,
    maintainAspectRatio: window.screen.width > 768 ? true : false,
  }

  return (
    <div>
      <Alert show={isError} text="Up to 5 countries can be added to the chart" onClose={removeError} />
      <Line data={data} options={options} className="country-row-chart !h-[300px] md:!h-[480px] mb-3 md:mb-5" />
      <div className="flex gap-3 md:gap-8 justify-center flex-wrap">
        {countries.map((item, index) => (
          <div className="flex items-center gap-1.5 md:gap-2.5" key={item.id}>
            <span className="h-[2px] w-3 md:w-4 block" style={{ backgroundColor: chartColors[index] }}></span>
            <span className="rounded-lg text-xs md:text-sm text-neutral-500 whitespace-nowrap">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Chart
