import { FC } from "react"
import { TableBodyCellProps } from "@/ui/table/components/table-body-cell/TableBodyCell.types"
import cn from "@/utils/cn/cn"
import "@/ui/table/components/table-body-cell/styles.scss"

const TableBodyCell: FC<TableBodyCellProps> = ({
  children,
  className,
  semantic = true,
  size = "medium",
  ...props
}) => {
  if (semantic) {
    return (
      <td className={cn("table__body-cell light", size, className)} {...props}>
        {children}
      </td>
    )
  }

  return (
    <div className={cn("table__body-cell light", size, className)} {...props}>
      {children}
    </div>
  )
}

export default TableBodyCell
