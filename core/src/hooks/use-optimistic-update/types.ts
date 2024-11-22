import { DependencyList } from "react"
import { MutationConfiguration } from "@/hooks/use-mutation/types"

export interface OptimisticUpdateConfig<T, TArguments>
  extends MutationConfiguration<TArguments> {
  initialValue?: T
  deps?: DependencyList
}
