import { ExtendedVariant, Size, Url } from "@/types/types"
import { ComponentProps, ReactNode } from "react"

export interface ButtonDefaultProps {
  children: ReactNode
  className?: string
  href?: Url
  variant?: ExtendedVariant
  size?: Size
}

export type ButtonProps = ButtonDefaultProps &
  (ComponentProps<"button"> | ComponentProps<"a">)
