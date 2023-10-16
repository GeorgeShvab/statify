export interface PageProps<TParams extends {} = {}, TSearchParams extends {} = {}> {
  params: TParams
  searchParams: TSearchParams
}

export interface Indicator {
  label: string
  description: string | null
  source: string
  unit: string | null
  dataset: string
  id: string
  unitSymbol: string | null
}

export interface Topic {
  id: string
  value: string
}

export type ApiResponse<T extends {} = {}> = [
  {
    page: number
    pages: number
    per_page: string
    total: number
  },
  T[]
]

export interface IMFResponseIndicator {
  label: string
  description: string
  source: string

  unit: string
  dataset: string
}

export interface IMFResponse {
  indicators: { [key: string]: IMFResponseIndicator }
  api: {
    version: string
    'output-method': string
  }
}

export interface IMFValuesResponse {
  values: {
    [key: string]: {
      [key: string]: Value
    }
  }
  api: {
    version: '1'
    'output-method': string
  }
}

export type Value<T = {}> = T & {
  value: number
  indicatorId: string | null
  countryId: string
  year: number
  id: number
}

export interface Country {
  id: string
  name: string
}

export interface ChartCountry extends Country {
  values: Value[]
  isSelected: boolean
  color: string | undefined
}

export interface RowCountry extends Country {
  year: number
  value: number
}
