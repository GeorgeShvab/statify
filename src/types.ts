import Prisma, { Country } from '@prisma/client'

export interface PageProps<TParams extends {} = {}, TSearchParams extends {} = {}> {
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
