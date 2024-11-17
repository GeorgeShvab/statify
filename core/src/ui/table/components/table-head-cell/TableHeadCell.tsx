import { FC } from "react"
import { TableHeadCellProps } from "@/ui/table/components/table-head-cell/TableHeadCell.types"
import cn from "@/utils/cn/cn"
import "@/ui/table/components/table-head-cell/styles.scss"

const TableHeadCell: FC<TableHeadCellProps> = ({
  children,
  className,
  semantic = true,
  size = "medium",
  ...props
}) => {
  if (semantic) {
    return (
      <th className={cn("table__head-cell", size, className)} {...props}>
        {children}
      </th>
    )
  }

  return (
    <div className={cn("table__head-cell", size, className)} {...props}>
      {children}
    </div>
  )
}

export default TableHeadCell
