import Link from "next/link"
import {
  ComponentProps,
  ForwardRefRenderFunction,
  RefObject,
  forwardRef,
} from "react"
import { ButtonProps } from "@/ui/button/Button.types"
import "@/ui/button/styles.scss"
import cn from "@/utils/cn/cn"

const Button: ForwardRefRenderFunction<
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
  const btnClassName = cn("button", variant, color, size, className)

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

export default forwardRef(Button)
