import Prisma, { Country } from '@prisma/client'
import { ComponentProps } from 'react'

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

export interface ChartItem extends Country {
  values: Value[]
  isSelected: boolean
  color: string | undefined
}

export type RowValue = Pick<Prisma.Value, 'id' | 'year' | 'value'>

export type Value<T = {}> = T & RowValue

export type CountryRowValue = Value<Pick<Country, 'id' | 'name'>>

export type Position =
  | 'left-top'
  | 'left-bottom'
  | 'left-center'
  | 'right-top'
  | 'right-bottom'
  | 'right-center'
  | 'top-left'
  | 'top-right'
  | 'top-center'
  | 'bottom-left'
  | 'bottom-right'
  | 'bottom-center'

export type PositionOptions = { [key: number]: Position; default?: Position }

export type IconProps = ComponentProps<'svg'>

export type SortOrder = 'asc' | 'desc'
