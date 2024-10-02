import { FC } from "react"
import { TableBodyCellProps } from "@/ui/table/components/table-body-cell/TableBodyCell.types"
import cn from "@/utils/cn/cn"
import "@/ui/table/components/table-body-cell/styles.scss"

const TableBodyCell: FC<TableBodyCellProps> = ({
  children,
  className,
  size = "medium",
  ...props
}) => {
  return (
    <td className={cn("table__body-cell light", size, className)} {...props}>
      {children}
    </td>
  )
}

export default TableBodyCell
