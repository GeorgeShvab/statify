import { FC } from "react"
import { ChartTitleProps } from "@/components/chart/components/chart-title/types"
import cn from "@/utils/cn/cn"
import "@/components/chart/components/chart-title/styles.scss"

const ChartTitle: FC<ChartTitleProps> = ({
  title,
  subtitle,
  className,
  ...props
}) => {
  return (
    <div className={cn("chart-header", className)} id="chart-header" {...props}>
      <h2 className="chart-header__title">{title}</h2>
      <p className="chart-header__subtitle">{subtitle}</p>
    </div>
  )
}

export default ChartTitle
