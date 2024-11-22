import { useState } from "react"
import { AxiosResponse } from "axios"
import { useSearchParams } from "next/navigation"
import { InfiniteScrollConfig } from "@/hooks/use-infinite-scroll/types"
import useOnScrollTreshold from "@/hooks/use-on-scroll-treshold/useOnScrollTreshold"
import useQuery from "@/hooks/use-query/useQuery"
import { PageableResult } from "@/types/general.types"

const useInfiniteScroll = <T>(
  fn: (
    params: Record<string | number, string | number>,
    signal: AbortSignal
  ) => Promise<AxiosResponse<PageableResult<T>>>,
  merge: (data: T) => void,
  config?: InfiniteScrollConfig
) => {
  const [pageToLoad, setPageToLoad] = useState(config?.initialPage ?? 0)
  const [isEnd, setIsEnd] = useState(false)

  const params = useSearchParams()

  const searchParams = {
    ...Object.fromEntries(params.entries()),
    page: pageToLoad,
  }

  const fetch = (signal: AbortSignal) => fn(searchParams, signal)

  const onSuccess = (data: PageableResult<T>) => {
    if (data.page === data.pages) setIsEnd(true)

    setPageToLoad(data.page + 1)
    merge(data.data)
  }

  const { refetch } = useQuery(fetch, {
    fetchOnMount: pageToLoad === 0,
    onSuccess,
    ignoreIfLoading: true,
  })

  const handleScroll = () => !isEnd && refetch()

  const ref = useOnScrollTreshold<HTMLDivElement>(handleScroll, {
    treshold: 2500,
    ms: 2500,
    deps: [handleScroll],
    callLastIgnored: false,
  })

  return ref
}

export default useInfiniteScroll
