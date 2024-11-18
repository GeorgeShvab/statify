import { FC } from "react"
import SortAscIcon from "@/ui/icons/SortAscIcon"
import SortDescIcon from "@/ui/icons/SortDescIcon"
import SortIcon from "@/ui/icons/SortIcon"
import cn from "@/utils/cn/cn"
import { IconProps, SortOrder } from "@/types/general.types"
import "@/components/table-sort-icon/styles.scss"

interface TableSortIconProps extends IconProps {
  direction: SortOrder
  isSelected: boolean
}

const TableSortIcon: FC<TableSortIconProps> = ({
  direction,
  isSelected,
  className,
  ...props
}) => {
  if (!isSelected)
    return (
      <SortIcon className={cn("initial-sort-icon", className)} {...props} />
    )

  if (direction === "asc") return <SortAscIcon {...props} />
  if (direction === "desc") return <SortDescIcon {...props} />
}

export default TableSortIcon
