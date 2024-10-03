import {
  ComponentProps,
  ForwardRefRenderFunction,
  RefObject,
  forwardRef,
} from "react"
import Link from "next/link"
import { ButtonProps } from "@/ui/button/Button.types"
import cn from "@/utils/cn/cn"
import "@/ui/button/styles.scss"

const Button: ForwardRefRenderFunction<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
> = (
  {
    className = "",
    variant = "contained",
    color = "dark",
    size = "medium",
    startIcon,
    endIcon,
    children,
    href,
    ...props
  },
  ref
) => {
  const btnClassName = cn(
    "button",
    variant,
    color,
    size,
    className,
    startIcon && "start-icon",
    endIcon && "end-icon"
  )

  const contentWithIcons = (
    <>
      {startIcon}
      <span>{children}</span>
      {endIcon}
    </>
  )

  const content = startIcon || endIcon ? contentWithIcons : children

  if (href) {
    return (
      <Link
        className={btnClassName}
        href={href}
        {...(props as Omit<ComponentProps<"a">, "ref">)}
      >
        {content}
      </Link>
    )
  }

  return (
    <button
      className={btnClassName}
      ref={ref as RefObject<HTMLButtonElement>}
      {...(props as ComponentProps<"button">)}
    >
      {content}
    </button>
  )
}

export default forwardRef(Button)
