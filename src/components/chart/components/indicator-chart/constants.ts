import { ChartOptions } from "chart.js"

const options: ChartOptions<"line"> = {
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

export const getInitialOptions = (
  ticksCallback: (value: number) => number | string
): ChartOptions<"line"> => {
  return {
    ...options,
    scales: {
      y: {
        ticks: {
          callback: ticksCallback as (value: number | string) => number,
        },
      },
    },
  }
}
