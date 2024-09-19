import { useAlert } from "@/providers/alert-provider/AlertProvider"
import axios from "axios"
import { useState } from "react"
import { MutationConfiguration } from "./types"

const useMutation = <TArguments, TResult>(
  fn: (args: TArguments) => Promise<TResult>,
  config?: MutationConfiguration
) => {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<TResult>()
  const [error, setError] = useState<unknown>()

  const { openAlert } = useAlert()

  const makeRequest = async (args: TArguments) => {
    try {
      setIsLoading(true)

      const res = await fn(args)

      setData(res)
      setError(null)
      setIsLoading(false)

      if (config?.successMessage) {
        openAlert({ text: config.successMessage, severity: "success" })
      }
    } catch (e) {
      setError(e)
      setIsLoading(false)

      if (config?.errorMessage) {
        openAlert({ text: config.errorMessage, severity: "danger" })
      }

      throw e
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
