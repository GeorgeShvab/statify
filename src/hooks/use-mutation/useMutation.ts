import axios from "axios"
import { useState } from "react"

const useMutation = <TArguments, TResult>(
  fn: (args: TArguments) => Promise<TResult>
) => {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<TResult>()
  const [error, setError] = useState<unknown>()

  const makeRequest = async (args: TArguments) => {
    try {
      setIsLoading(true)

      const res = await fn(args)

      setData(res)
      setError(null)
    } catch (e) {
      setError(e)
    } finally {
      setIsLoading(false)
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
