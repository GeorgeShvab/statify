import { useEffect, useRef, useState } from "react"
import { AxiosResponse } from "axios"
import { isAbortError } from "next/dist/server/pipe-readable"
import { useAlert } from "@/providers/alert-provider/AlertProvider"
import { QueryConfiguration } from "@/hooks/use-query/types"

const useQuery = <TResponse>(
  fn: (signal: AbortSignal) => Promise<AxiosResponse<TResponse>>,
  {
    fetchOnMount = true,
    ignoreIfLoading = false,
    successMessage,
    errorMessage,
    onSuccess,
    onError,
    onFinal,
    deps = [],
  }: QueryConfiguration<TResponse> = {}
) => {
  const abortController = useRef<AbortController>()

  const isFirstRender = useRef(true)

  const [isLoading, setIsLoading] = useState(fetchOnMount)
  const [data, setData] = useState<TResponse>()
  const [error, setError] = useState<unknown>()

  const { openAlert } = useAlert()

  const fetch = async () => {
    if (isLoading && ignoreIfLoading) return

    try {
      setIsLoading(true)

      abortController.current?.abort()

      const controller = new AbortController()

      abortController.current = controller

      const res = await fn(controller.signal)

      setData(res.data)
      setError(null)
      setIsLoading(false)

      if (successMessage) {
        openAlert({ text: successMessage, severity: "success" })
      }

      if (onSuccess) {
        onSuccess(res.data)
      }

      if (onFinal) onFinal()
    } catch (e) {
      if (isAbortError(e)) {
        return // Means request 2 aborted request 1 (this request), request 2 will set right states
      }

      setError(e)
      setIsLoading(false)

      if (errorMessage) {
        openAlert({ text: errorMessage, severity: "danger" })
      }

      if (onError) {
        onError(e)
      }

      if (onFinal) onFinal()
    }
  }

  useEffect(() => {
    if (fetchOnMount || !isFirstRender.current) fetch()
    if (isFirstRender.current) isFirstRender.current = false
  }, deps)

  const isError = Boolean(error)
  const isSuccess = Boolean(data) && !isError

  const reqData = {
    isError,
    isSuccess,
    isLoading,
    data,
    error,
    refetch: fetch,
    setData,
  } as const

  return reqData
}

export default useQuery
