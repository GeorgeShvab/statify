import { useState } from "react"
import useMutation from "../use-mutation/useMutation"
import { OptimisticUpdateConfig } from "./types"

const useOptimisticUpdate = <TArguments, TResult, TValue>(
  fn: (args: TArguments) => Promise<TResult>,
  config: OptimisticUpdateConfig<TValue>
) => {
  const [data, mutate] = useMutation(fn, config)
  const [value, setValue] = useState(config.initialValue)

  const makeMutation = async (args: TArguments, optimisticValue: TValue) => {
    const prevValue = value

    try {
      setValue(optimisticValue)

      await mutate(args)
    } catch (e) {
      setValue(prevValue)

      throw e
    }
  }

  return [{ ...data, value }, makeMutation] as const
}

export default useOptimisticUpdate
