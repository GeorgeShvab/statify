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
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend, LinearScale, CategoryScale, PointElement, LineElement)

const chartColors = ['blue', 'red', 'yellow', 'green', 'gray']

interface Props {
  data: number[][]
  labels: string[]
  legend: string[]
}

const Chart: FC<Props> = (props) => {
  const data = {
    labels: props.labels,
    datasets: props.data.map((item, index) => ({
      data: item,
      borderColor: chartColors[index],
      fill: false,
      borderWidth: 1,
      pointRadius: window.screen.width > 768 ? 4 : 0,
      pointHover: window.screen.width > 768 ? 4 : 0,
    })),
  }

  const options: ChartOptions<'line'> = {
    animation: false,
    plugins: {
      legend: {
        position: 'bottom',
        title: { display: true },
        labels: {
          padding: 8,
          generateLabels: function (item) {
            return props.legend.map((item, index) => ({
              text: item,
              fillStyle: 'white',
              strokeStyle: chartColors[index],
              lineWidth: 1,
              hidden: false,
              index: 0,
              padding: 12,
            }))
          },
        },
      },
      tooltip: {
        animation: false,
      },
    },
    responsive: true,
    maintainAspectRatio: window.screen.width > 768 ? true : false,
  }

  return <Line data={data} options={options} className="country-row-chart !h-[300px] md:!h-[480px]" />
}

export default Chart
