import Link from 'next/link'
import { AnchorHTMLAttributes, ForwardRefRenderFunction, forwardRef, ButtonHTMLAttributes, ReactElement } from 'react'

interface Props {
  className?: string
  children: string | ReactElement | ReactElement[]
  href?: string
  color?: 'white' | 'black'
}

const Button: ForwardRefRenderFunction<
  HTMLButtonElement | HTMLAnchorElement,
  Props & (ButtonHTMLAttributes<HTMLButtonElement> | AnchorHTMLAttributes<HTMLAnchorElement>)
> = ({ className = '', href, children, color = 'black', ...props }, ref) => {
  let btnClassName =
    'transition-colors rounded-lg px-6 py-2 flex justify-center items-center whitespace-nowrap block h-10 '

  if (color === 'white') {
    btnClassName += 'bg-white border hover:bg-neutral-50 text-neutral-700 '
  } else {
    btnClassName += 'bg-black hover:bg-black-light text-white '
  }

  btnClassName += className

  if (href) {
    return (
      <Link className={btnClassName} href={href} {...(props as any)} ref={ref}>
        {children}
      </Link>
    )
  }

  return (
    <button className={btnClassName} {...(props as any)} ref={ref}>
      {children}
    </button>
  )
}

export default forwardRef(Button)
