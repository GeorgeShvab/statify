import { useEffect, useState } from "react"
import { AxiosResponse } from "axios"
import { useAlert } from "@/providers/alert-provider/AlertProvider"
import { QueryConfiguration } from "@/hooks/use-query/types"

const useQuery = <TResponse>(
  fn: () => Promise<AxiosResponse<TResponse>>,
  config?: QueryConfiguration<TResponse>
) => {
  const [isLoading, setIsLoading] = useState(
    (config?.fetchOnMount ?? true) ? true : false
  )
  const [data, setData] = useState<TResponse>()
  const [error, setError] = useState<unknown>()

  const { openAlert } = useAlert()

  const fetch = async () => {
    try {
      setIsLoading(true)

      const res = await fn()

      setData(res.data)
      setError(null)
      setIsLoading(false)

      if (config?.successMessage) {
        openAlert({ text: config.successMessage, severity: "success" })
      }

      if (config?.onSuccess) {
        config.onSuccess(res.data)
      }
    } catch (e) {
      setError(e)
      setIsLoading(false)

      if (config?.errorMessage) {
        openAlert({ text: config.errorMessage, severity: "danger" })
      }

      if (config?.onError) {
        config.onError(e)
      }
    }
  }

  useEffect(() => {
    if (config?.fetchOnMount ?? true) fetch()
  }, config?.deps || [])

  const isError = Boolean(error)
  const isSuccess = Boolean(data) && !isError

  const reqData = {
    isError,
    isSuccess,
    isLoading,
    data,
    error,
    refetch: fetch,
  } as const

  return reqData
}

export default useQuery
