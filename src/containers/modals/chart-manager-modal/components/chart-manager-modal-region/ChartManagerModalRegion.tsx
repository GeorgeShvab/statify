import { FC, memo } from "react"
import MinusIcon from "@/ui/icons/MinusIcon"
import PlusIcon from "@/ui/icons/PlusIcon"
import { ChartManagerModalRegionProps } from "@/containers/modals/chart-manager-modal/components/chart-manager-modal-region/types"
import cn from "@/utils/cn/cn"
import "@/containers/modals/chart-manager-modal/components/chart-manager-modal-region/styles.scss"

const ChartManagerModalRegion: FC<ChartManagerModalRegionProps> = ({
  region: { name, isSelected },
  ...props
}) => {
  return (
    <li
      className={cn(
        "chart-manager-modal__region",
        isSelected && "chart-manager-modal__region--selected"
      )}
      role="button"
      {...props}
    >
      <div className="chart-manager-modal__region-name">{name}</div>
      <div className="chart-manager-modal__region-icon">
        {isSelected ? <MinusIcon /> : <PlusIcon />}
      </div>
    </li>
  )
}

export default memo(ChartManagerModalRegion)
