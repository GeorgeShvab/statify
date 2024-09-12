import Link from "next/link"
import {
  ForwardRefRenderFunction,
  forwardRef,
  ComponentProps,
  RefObject,
} from "react"
import { ButtonProps } from "../button/Button.types"
import "./styles.scss"
import cn from "@/utils/cn/cn"

const IconButton: ForwardRefRenderFunction<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
> = (
  { className = "", variant = "dark", size = "medium", href, ...props },
  ref
) => {
  const btnClassName = cn("icon-button", variant, size, className)

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
