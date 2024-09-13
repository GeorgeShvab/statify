import { ExtendedColor, Size, Url, Variant } from "@/types/types"
import { ComponentProps, ReactNode } from "react"

export interface ButtonDefaultProps {
  children: ReactNode
  className?: string
  href?: Url
  variant?: Variant
  color?: ExtendedColor
  size?: Size
}

export type ButtonProps = ButtonDefaultProps &
  (ComponentProps<"button"> | ComponentProps<"a">)
