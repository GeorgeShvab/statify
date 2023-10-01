'use client'

import { FC, memo } from 'react'
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
} from 'chart.js'
import { Line } from 'react-chartjs-2'

const options: ChartOptions<'line'> = {
  scales: {
    x: {
      grid: {
        display: false,
      },
      display: false,
    },
    y: {
      grid: {
        display: false,
      },
      display: false,
      beginAtZero: false,
    },
  },
  animation: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  responsive: true,
  maintainAspectRatio: true,
}

ChartJS.register(ArcElement, Tooltip, Legend, LinearScale, CategoryScale, PointElement, LineElement)

interface Props {
  data: number[]
}

const LineChart: FC<Props> = (props) => {
  const data = {
    labels: props.data,
    datasets: [
      {
        data: props.data,
        borderColor: '#3484F0',
        fill: false,
        borderWidth: 1,
        pointRadius: 0,
        pointHoverRadius: 0,
      },
    ],
  }

  return <Line data={data} options={options} className="country-row-chart !w-20 !h-7 md:!w-24 md:!h-10" />
}

export default memo(LineChart)
