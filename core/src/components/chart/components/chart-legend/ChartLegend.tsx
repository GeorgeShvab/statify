import { FC } from "react"
import { ChartLegendProps } from "@/components/chart/components/chart-legend/types"
import cn from "@/utils/cn/cn"
import "@/components/chart/components/chart-legend/styles.scss"

const ChartLegend: FC<ChartLegendProps> = ({ items, className, ...props }) => {
  return (
    <div className={cn("chart-legend", className)} {...props}>
      {items.map((item) => (
        <div className="chart-legend__label" key={item.id}>
          <span
            className="chart-legend__label-color"
            style={{ backgroundColor: item.color }}
          />
          <span className="chart-legend__label-text">{item.name}</span>
        </div>
      ))}
    </div>
  )
}

export default ChartLegend
