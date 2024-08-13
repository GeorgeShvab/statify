import TableSortIcon from '@/components/TableSortIcon/TableSortIcon'
import { ReactNode, ComponentProps, FC } from 'react'
import TableHeaderCell from '@/ui/TableHeaderCell/TableHeaderCell'

interface TableHeaderCellWithSortingProps extends ComponentProps<'th'> {
  children: ReactNode
  direction: 'asc' | 'desc'
  isSelected: boolean
  buttonProps?: ComponentProps<'button'>
  onSortChange: () => void
}

const TableHeaderCellWithSorting: FC<TableHeaderCellWithSortingProps> = ({
  children,
  className = '',
  direction,
  isSelected,
  onSortChange,
  ...props
}) => {
  const { className: buttonClassName, ...buttonProps } = props.buttonProps || {}

  const buttonComponentClassName = `flex items-center gap-1.5 md:gap-3 justify-start w-full text-right ${buttonClassName || ''}`

  return (
    <TableHeaderCell className={className} {...props}>
      <button
        onClick={onSortChange}
        className={buttonComponentClassName}
        {...buttonProps}
      >
        {children}
        <span className='w-4 h-4 flex items-center justify-center'>
          <TableSortIcon direction={direction} isSelected={isSelected} />
        </span>
      </button>
    </TableHeaderCell>
  )
}

export default TableHeaderCellWithSorting
