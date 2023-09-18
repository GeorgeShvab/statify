import { AnchorHTMLAttributes, ForwardRefRenderFunction, forwardRef, ButtonHTMLAttributes, ReactElement } from 'react'

interface Props {
  className?: string
  children: string | ReactElement | ReactElement[]
  href?: string
}

const Button: ForwardRefRenderFunction<
  HTMLButtonElement | HTMLAnchorElement,
  Props & (ButtonHTMLAttributes<HTMLButtonElement> | AnchorHTMLAttributes<HTMLAnchorElement>)
> = ({ className = '', href, children, ...props }, ref) => {
  const classname = `bg-black hover:bg-black-light transition-colors text-white rounded-lg px-6 py-2 flex justify-center items-center whitespace-nowrap block h-10 ${className}`

  if (href) {
    return (
      <a className={classname} {...(props as any)} ref={ref}>
        {children}
      </a>
    )
  }

  return (
    <button className={classname} {...(props as any)} ref={ref}>
      {children}
    </button>
  )
}

export default forwardRef(Button)
