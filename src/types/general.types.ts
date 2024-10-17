import { ComponentProps } from "react"

export interface PageableResult<TData> {
  page: number
  pages: number
  data: TData
}

export interface PageableParams {
  page?: number
  size?: number
}

export type SortOrder = "asc" | "desc"

export type Size = "small" | "medium" | "large"

export type Color = "dark" | "light"

export type ExtendedColor = Color | "danger"

export type Variant = "contained" | "text"

export type SupportedDatasetDownloadExtension = "xlsx" | "csv"

export interface PageProps<
  TParams extends object = object,
  TSearchParams extends object = object,
> {
  params: TParams
  searchParams: TSearchParams
}

export type IconProps = ComponentProps<"svg">

export type QueryParams = Record<string, string | null>
