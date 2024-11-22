import { useState } from "react"
import { AxiosResponse } from "axios"
import { useAlert } from "@/providers/alert-provider/AlertProvider"
import { MutationConfiguration } from "@/hooks/use-mutation/types"

const useMutation = <TArguments, TResult>(
  fn: (args: TArguments) => Promise<AxiosResponse<TResult>>,
  config?: MutationConfiguration<TArguments>
) => {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<TResult>()
  const [error, setError] = useState<unknown>()

  const { openAlert } = useAlert()

  const makeRequest = async (args: TArguments) => {
    try {
      setIsLoading(true)

      const res = await fn(args)

      setData(res.data)
      setError(null)
      setIsLoading(false)

      if (config?.successMessage) {
        openAlert({ text: config.successMessage, severity: "success" })
      }

      if (config?.onSuccess) {
        config.onSuccess(args)
      }
    } catch (e) {
      setError(e)
      setIsLoading(false)

      if (config?.errorMessage) {
        openAlert({ text: config.errorMessage, severity: "danger" })
      }

      if (config?.onError) {
        config.onError(args)
      }
    }
  }

  const isError = Boolean(error)
  const isSuccess = Boolean(data) && !isError

  const reqData = {
    isError,
    isSuccess,
    isLoading,
    data,
    error,
  }

  return [reqData, makeRequest] as const
}

export default useMutation
