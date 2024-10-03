import { ComponentProps, ReactNode } from "react"
import { ExtendedColor, Size, Url, Variant } from "@/types/types"

export interface ButtonDefaultProps {
  children: ReactNode
  className?: string
  href?: Url
  variant?: Variant
  color?: ExtendedColor
  size?: Size
  startIcon?: ReactNode
  endIcon?: ReactNode
}

export type ButtonProps = ButtonDefaultProps &
  (ComponentProps<"button"> | ComponentProps<"a">)
