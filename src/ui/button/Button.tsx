import Link from "next/link"
import {
  ComponentProps,
  ForwardRefRenderFunction,
  RefObject,
  forwardRef,
} from "react"
import { ButtonProps } from "./Button.types"
import "./styles.scss"
import cn from "@/utils/cn/cn"

const Button: ForwardRefRenderFunction<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
> = (
  { className = "", variant = "dark", size = "medium", href, ...props },
  ref
) => {
  const btnClassName = cn("button", variant, size, className)

  if (href) {
    return (
      <Link
        className={btnClassName}
        href={href}
        {...(props as Omit<ComponentProps<"a">, "ref">)}
      />
    )
  }

  const a = <Link href=""></Link>

  return (
    <button
      className={btnClassName}
      ref={ref as RefObject<HTMLButtonElement>}
      {...(props as ComponentProps<"button">)}
    />
  )
}

export default forwardRef(Button)
