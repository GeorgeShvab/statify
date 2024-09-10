import { FC, LiHTMLAttributes, ReactElement, ReactNode, createElement } from 'react'

interface Props extends LiHTMLAttributes<HTMLLIElement> {
  className?: string
  containerClassName?: string
  containerProps?: any
  children: ReactElement | string
  icon?: ReactNode
  containerEl?: keyof JSX.IntrinsicElements
}

const DropdownItem: FC<Props> = ({
  children,
  icon,
  containerProps,
  containerEl = 'div',
  className = '',
  containerClassName = '',
  ...rest
}) => {
  const container = createElement(
    containerEl,
    { ...containerProps, className: `text-sm whitespace-nowrap flex items-center gap-4 ${containerClassName}` },
    icon ? (
      <>
        <span>{icon}</span>
        {children ? <span>{children}</span> : null}
      </>
    ) : (
      children
    )
  )

  return (
    <li
      role="button"
      className={`h-10 px-4 py-1.5 first:pt-2 last:pb-2 active:bg-neutral-100 md:hover:bg-neutral-100 flex items-center ${className}`}
      {...rest}
    >
      {container}
    </li>
  )
}

export default DropdownItem
