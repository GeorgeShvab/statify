import Link from 'next/link'
import { AnchorHTMLAttributes, ForwardRefRenderFunction, forwardRef, ButtonHTMLAttributes, ReactElement } from 'react'

interface Props {
  className?: string
  children: ReactElement
  href?: string
}

const IconButton: ForwardRefRenderFunction<
  HTMLButtonElement | HTMLAnchorElement,
  Props & (ButtonHTMLAttributes<HTMLButtonElement> | AnchorHTMLAttributes<HTMLAnchorElement>)
> = ({ className = '', href, children, ...props }, ref) => {
  const classname = `bg-black hover:bg-black-light transition-colors text-white rounded-lg flex justify-center items-center block h-10 w-10 ${className}`

  if (href) {
    return (
      <Link className={classname} href={href} {...(props as any)} ref={ref}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classname} {...(props as any)} ref={ref}>
      {children}
    </button>
  )
}

export default forwardRef(IconButton)
