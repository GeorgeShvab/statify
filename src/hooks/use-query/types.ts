import { DependencyList } from "react"

export interface QueryConfiguration {
  successMessage?: string
  errorMessage?: string
  onSuccess?: () => void
  onError?: () => void
  deps?: DependencyList
}
