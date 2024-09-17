import { FC } from "react"
import { TableRowProps } from "@/ui/table/components/table-row/TableRow.types"
import cn from "@/utils/cn/cn"
import "@/ui/table/components/table-row/styles.scss"

const TableRow: FC<TableRowProps> = ({ className, ...props }) => {
  return <tr className={cn("table__row", className)} {...props} />
}

export default TableRow
