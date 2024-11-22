import { FC } from "react"
import { IndicatorDataSectionProps } from "@/containers/indicator-data/components/indicator-data-section/types"
import cn from "@/utils/cn/cn"
import "@/containers/indicator-data/components/indicator-data-section/styles.scss"

const IndicatorDataSection: FC<IndicatorDataSectionProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <section className="indicator-data-section container">
      <div
        className={cn("indicator-data-section__container", className)}
        {...props}
      >
        {children}
      </div>
    </section>
  )
}

export default IndicatorDataSection
