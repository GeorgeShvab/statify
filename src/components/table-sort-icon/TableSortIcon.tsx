import { IconProps, SortOrder } from "@/types/types"
import SortAscIcon from "@/ui/Icons/SortAscIcon"
import SortDescIcon from "@/ui/Icons/SortDescIcon"
import SortIcon from "@/ui/Icons/SortIcon"
import { FC } from "react"

interface TableSortIconProps extends IconProps {
  direction: SortOrder
  isSelected: boolean
}

const TableSortIcon: FC<TableSortIconProps> = ({
  direction,
  isSelected,
  ...props
}) => {
  if (!isSelected) return <SortIcon />

  if (direction === "asc") return <SortAscIcon {...props} />
  if (direction === "desc") return <SortDescIcon {...props} />
}

export default TableSortIcon
