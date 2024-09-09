import { ReactNode, ComponentProps, FC } from 'react'

interface TableCellProps extends ComponentProps<'th'> {
  children: ReactNode
}

const TableCell: FC<TableCellProps> = ({
  children,
  className = '',
  ...props
}) => {
  const componentClassName = `border-b py-4 md:py-3 px-2 md:px-6 text-[10px] md:text-base font-normal text-left text-gray-400 ${className}`

  return (
    <th className={componentClassName} {...props}>
      {children}
    </th>
  )
}

export default TableCell
