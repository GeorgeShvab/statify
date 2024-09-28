import { signIn, SignInResponse } from "next-auth/react"
import { useState } from "react"
import { Credentials } from "@/types/types"

const useSignin = () => {
  const [status, setStatus] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [data, setData] = useState<SignInResponse | null>(null)

  const signin = async (data: Credentials) => {
    setIsLoading(true)

    const res = await signIn("credentials", {
      callbackUrl: "/admin/dashboard/indicators",
      ...data,
    })

    setData(res || null)
    setIsLoading(false)
    setStatus(res?.status || null)
  }

  const isSuccess = status === 200

  const reqData = {
    isSuccess,
    isError: !isSuccess,
    isLoading,
    status,
  }

  return [signin, { data, ...reqData }] as const
}

export default useSignin
