import TableSortIcon from "@/components/table-sort-icon/TableSortIcon"
import { FC } from "react"
import TableHeadCell from "@/ui/table/components/table-head-cell/TableHeadCell"
import { TableHeadSortingCellProps } from "@/ui/table/components/table-head-sorting-cell/TableHeadSortingCell.types"
import "@/ui/table/components/table-head-sorting-cell/styles.scss"
import cn from "@/utils/cn/cn"

const TableHeadCellWithSorting: FC<TableHeadSortingCellProps> = ({
  children,
  className = "",
  direction,
  isSelected,
  onSortChange,
  buttonProps,
  ...props
}) => {
  return (
    <TableHeadCell className={className} {...props}>
      <button
        onClick={onSortChange}
        {...buttonProps}
        className={cn("table__head-sorting-button", buttonProps?.className)}
      >
        {children}
        <span className="table__head-sorting-icon">
          <TableSortIcon direction={direction} isSelected={isSelected} />
        </span>
      </button>
    </TableHeadCell>
  )
}

export default TableHeadCellWithSorting
