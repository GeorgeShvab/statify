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
            data-testid="chart-legend-color-label"
            style={{ backgroundColor: item.color }}
          />
          <span
            className="chart-legend__label-text"
            data-testid="chart-legend-name-label"
          >
            {item.name}
          </span>
        </div>
      ))}
    </div>
  )
}

export default ChartLegend
