import { signIn, SignInResponse } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Credentials } from "@/hooks/use-signin/types"
import routes from "@/constants/routes"

const useSignin = () => {
  const [status, setStatus] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [data, setData] = useState<SignInResponse | null>(null)

  const router = useRouter()

  const signin = async (data: Credentials) => {
    setIsLoading(true)

    const res = await signIn("credentials", {
      callbackUrl: "/admin/dashboard/indicators",
      redirect: false,
      ...data,
    })

    setData(res || null)
    setIsLoading(false)
    setStatus(res?.status || null)

    if (res?.status === 200) {
      router.push(routes.admin.indicators)
    }
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
