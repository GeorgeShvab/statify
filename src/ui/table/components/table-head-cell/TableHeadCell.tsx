import { FC } from "react"
import { TableHeadCellProps } from "@/ui/table/components/table-head-cell/TableHeadCell.types"
import "@/ui/table/components/table-head-cell/styles.scss"
import cn from "@/utils/cn/cn"

const TableHeadCell: FC<TableHeadCellProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <th className={cn("table__head-cell light", className)} {...props}>
      {children}
    </th>
  )
}

export default TableHeadCell
