import throttle from "@/utils/throttle/throttle"
import { Indicator } from "@prisma/client"
import axios from "axios"
import { useCallback, useRef, useState } from "react"

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
      const { data } = await axios
        .get<(Indicator & { countryName?: string; countryId?: string })[]>(
          "/api/autocomplete?query=" + value,
          {
            signal: abortController.current?.signal,
          }
        )
        .catch()

      setAutocomplete({ data, isOpened: true })
    }, 750),
    []
  )

  return { autocomplete, fetch, setAutocomplete, abortController } as const
}

export default useAutocomplete
