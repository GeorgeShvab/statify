import { FC } from "react"
import { TableHeadCellProps } from "@/ui/table/components/table-head-cell/TableHeadCell.types"
import cn from "@/utils/cn/cn"
import "@/ui/table/components/table-head-cell/styles.scss"

const TableHeadCell: FC<TableHeadCellProps> = ({
  children,
  className,
  size = "medium",
  ...props
}) => {
  return (
    <th className={cn("table__head-cell light", size, className)} {...props}>
      {children}
    </th>
  )
}

export default TableHeadCell
