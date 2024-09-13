import Prisma, { Country } from "@prisma/client"
import { ComponentProps } from "react"
import { UrlObject } from "url"

export interface PageProps<
  TParams extends {} = {},
  TSearchParams extends {} = {}
> {
  params: TParams
  searchParams: TSearchParams
}

export interface Topic {
  id: string
  value: string
}

export interface ChartItem extends CountryWithValues {
  isSelected: boolean
  color?: string
}

export type RowValue = Pick<Prisma.Value, "id" | "year" | "value">

export type Value<T = {}> = T & RowValue

export type CountryRowValue = Value<Pick<Country, "id" | "name">>

export type Position =
  | "left-top"
  | "left-bottom"
  | "left-center"
  | "right-top"
  | "right-bottom"
  | "right-center"
  | "top-left"
  | "top-right"
  | "top-center"
  | "bottom-left"
  | "bottom-right"
  | "bottom-center"

export type PositionOptions = { [key: number]: Position; default?: Position }

export type IconProps = ComponentProps<"svg">

export type SortOrder = "asc" | "desc"

export interface CountryWithValues extends Country {
  values: Value[]
  maxValue: Value
}

export interface Credentials {
  email: string
  password: string
}

export type Size = "small" | "medium" | "large"

export type Color = "dark" | "light"

export type ExtendedColor = Color | "danger"

export type Variant = "contained" | "text"

export type Url = string | UrlObject

export type QueryParams = Record<string, string | null>
