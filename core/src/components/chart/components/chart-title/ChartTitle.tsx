import { FC } from "react"
import { ChartTitleProps } from "@/components/chart/components/chart-title/types"
import cn from "@/utils/cn/cn"

const ChartTitle: FC<ChartTitleProps> = ({
  title,
  subtitle,
  className,
  ...props
}) => {
  return (
    <div
      className={cn("mb-0.5 relative px-8", className)}
      id="chart-header"
      {...props}
    >
      <h2 className="text-center font-semibold text-sm md:text-lg mb-0.5">
        {title}
      </h2>
      <p className="text-center text-[10px] md:text-xs text-neutral-400">
        {subtitle}
      </p>
    </div>
  )
}

export default ChartTitle
