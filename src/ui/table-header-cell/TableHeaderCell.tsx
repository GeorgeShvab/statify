import { ReactNode, ComponentProps, FC } from 'react'

interface TableHeaderCellProps extends ComponentProps<'th'> {
  children: ReactNode
}

const TableHeaderCell: FC<TableHeaderCellProps> = ({
  children,
  className = '',
  ...props
}) => {
  const componentClassName = `border-b text-[10px] font-medium md:text-base py-4 md:py-3 px-2 md:px-3 px-2 md:px-6 text-left text-neutral-500 bg-neutral-50 ${className}`

  return (
    <th className={componentClassName} {...props}>
      {children}
    </th>
  )
}

export default TableHeaderCell
