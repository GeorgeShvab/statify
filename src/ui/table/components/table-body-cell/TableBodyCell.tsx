import { FC } from "react"
import { TableBodyCellProps } from "@/ui/table/components/table-body-cell/TableBodyCell.types"
import "@/ui/table/components/table-body-cell/styles.scss"
import cn from "@/utils/cn/cn"

const TableCell: FC<TableBodyCellProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <td className={cn("table__body-cell light", className)} {...props}>
      {children}
    </td>
  )
}

export default TableCell
