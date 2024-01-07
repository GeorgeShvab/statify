import { FC, LiHTMLAttributes, ReactElement, ReactNode } from 'react'

interface Props extends LiHTMLAttributes<HTMLLIElement> {
  className?: string
  children: ReactElement | string
  icon?: ReactNode
}

const DropdownItem: FC<Props> = ({ children, icon, className = '', ...rest }) => {
  return (
    <li
      role="button"
      className={`text-sm h-10 px-4 py-1.5 first:pt-2 last:pb-2 whitespace-nowrap flex items-center gap-4 justify-between active:bg-neutral-100 md:hover:bg-neutral-100 ${className}`}
      {...rest}
    >
      {icon ? (
        <>
          <span>{icon}</span>
          {children ? <span>{children}</span> : null}
        </>
      ) : (
        children
      )}
    </li>
  )
}

export default DropdownItem
