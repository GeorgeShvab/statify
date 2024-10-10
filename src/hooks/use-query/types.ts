import { DependencyList } from "react"

export interface QueryConfiguration<TData> {
  successMessage?: string
  errorMessage?: string
  onSuccess?: (arg: TData) => void
  onError?: (e: unknown) => void
  deps?: DependencyList
  fetchOnMount?: boolean
}
