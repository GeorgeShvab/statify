import {
  ForwardRefRenderFunction,
  forwardRef,
  ComponentProps,
  RefObject,
} from "react"
import Link from "next/link"
import { ButtonProps } from "@/ui/button/Button.types"
import cn from "@/utils/cn/cn"
import "@/ui/icon-button/styles.scss"

const IconButton: ForwardRefRenderFunction<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
> = (
  {
    className = "",
    variant = "contained",
    color = "dark",
    size = "medium",
    href,
    ...props
  },
  ref
) => {
  const btnClassName = cn("icon-button", variant, color, size, className)

  if (href) {
    return (
      <Link
        className={btnClassName}
        href={href}
        {...(props as Omit<ComponentProps<"a">, "ref">)}
      />
    )
  }

  return (
    <button
      className={btnClassName}
      ref={ref as RefObject<HTMLButtonElement>}
      {...(props as ComponentProps<"button">)}
    />
  )
}

export default forwardRef(IconButton)
