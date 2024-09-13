import { QueryParams } from "@/types/types"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

const useQueryParams = <TParams extends QueryParams = QueryParams>() => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const setParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value.trim()) {
      params.set(key, value)
    } else {
      params.delete(key)
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  const paramsObject = Object.fromEntries(searchParams.entries())

  return [
    paramsObject as Record<keyof TParams, string | null>,
    setParam,
  ] as const
}

export default useQueryParams
