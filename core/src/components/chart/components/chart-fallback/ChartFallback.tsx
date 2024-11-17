import { FC } from "react"
import { ChartFallbackProps } from "@/components/chart/components/chart-fallback/types"
import cn from "@/utils/cn/cn"
import "@/components/chart/components/chart-fallback/styles.scss"

const ChartFallback: FC<ChartFallbackProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn("chart-fallback", className)} {...props}>
      <p className="chart-fallback__text">{children}</p>
    </div>
  )
}

export default ChartFallback
