import { DependencyList } from "react"
import { MutationConfiguration } from "../use-mutation/types"

export interface OptimisticUpdateConfig<T> extends MutationConfiguration {
  initialValue?: T
  deps?: DependencyList
}
