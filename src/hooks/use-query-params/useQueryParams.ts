import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { QueryParams } from "@/types/types"

const useQueryParams = <TParams extends QueryParams = QueryParams>() => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const setParam = (...args: string[]) => {
    const params = new URLSearchParams(searchParams.toString())

    for (let i = 0; i < args.length; i = i + 2) {
      if (args[i].trim()) {
        params.set(args[i], args[i + 1])
      } else {
        params.delete(args[i + 1])
      }
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  const clearAllParams = () => router.push(pathname)

  const paramsObject = Object.fromEntries(searchParams.entries())

  return [
    paramsObject as Record<keyof TParams, string | null>,
    setParam,
    clearAllParams,
  ] as const
}

export default useQueryParams
