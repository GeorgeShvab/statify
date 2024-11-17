import { ComponentProps, ReactNode } from "react"
import { UrlObject } from "url"
import { ExtendedColor, Size, Variant } from "@/types/general.types"

export interface ButtonDefaultProps {
  children: ReactNode
  className?: string
  href?: string | UrlObject
  variant?: Variant
  color?: ExtendedColor
  size?: Size
  startIcon?: ReactNode
  endIcon?: ReactNode
}

export type ButtonProps = ButtonDefaultProps &
  (ComponentProps<"button"> | ComponentProps<"a">)
