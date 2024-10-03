import { useCallback, useRef, useState } from "react"
import { Indicator } from "@prisma/client"
import throttle from "@/utils/throttle/throttle"
import { getSearchAutocomplete } from "@/api/public"

interface AutocompleteState {
  data: (Indicator & { countryName?: string; countryId?: string })[] | undefined
  isOpened: boolean
}

const useAutocomplete = () => {
  const abortController = useRef<AbortController>()

  const [autocomplete, setAutocomplete] = useState<AutocompleteState>({
    data: undefined,
    isOpened: false,
  })

  const fetch = useCallback(
    throttle(async (value: string) => {
      const { data } = await getSearchAutocomplete(value, {
        signal: abortController.current?.signal,
      }).catch()

      setAutocomplete({ data, isOpened: true })
    }, 750),
    []
  )

  return { autocomplete, fetch, setAutocomplete, abortController } as const
}

export default useAutocomplete
