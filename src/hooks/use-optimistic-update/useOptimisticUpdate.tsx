import { useEffect, useRef, useState } from "react"
import { AxiosResponse } from "axios"
import useMutation from "@/hooks/use-mutation/useMutation"
import { OptimisticUpdateConfig } from "@/hooks/use-optimistic-update/types"

const useOptimisticUpdate = <TArguments, TResult, TValue>(
  fn: (args: TArguments) => Promise<AxiosResponse<TResult>>,
  config: OptimisticUpdateConfig<TValue>
) => {
  const prevValue = useRef<TValue>()

  const [value, setValue] = useState(config.initialValue)

  const handleError = () => {
    setValue(prevValue.current)

    if (config.onError) config.onError()
  }

  const [data, mutate] = useMutation(fn, { ...config, onError: handleError })

  useEffect(() => {
    setValue(config.initialValue)
  }, config.deps || [])

  const makeMutation = async (args: TArguments, optimisticValue: TValue) => {
    prevValue.current = value

    setValue(optimisticValue)

    await mutate(args)
  }

  return [{ ...data, value }, makeMutation] as const
}

export default useOptimisticUpdate
