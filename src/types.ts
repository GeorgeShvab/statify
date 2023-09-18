export interface PageProps<TParams extends {} = {}, TSearchParams extends {} = {}> {
  params: TParams
  searchParams: TSearchParams
}

export interface Indicator {
  label: string
  description: string
  source: string
  unit: string
  dataset: string
  id: string
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

/*export interface Value {
  indicator: {
    id: string
    value: string
  }
  country: {
    id: string
    value: string
  }
  countryiso3code: string
  date: string
  value: number
  unit: string
  obs_status: string
  decimal: number
}*/

export interface IMFResponseIndicator {
  label: string
  description: string
  source: string
  unit: string
  dataset: string
}

export interface Value {
  [key: string]: number
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
