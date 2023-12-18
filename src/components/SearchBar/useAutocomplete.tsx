import throttle from '@/utils/throttle'
import { Indicator } from '@prisma/client'
import axios from 'axios'
import { useCallback, useRef, useState } from 'react'

interface AutocompleteState {
  data: Indicator[] | undefined
  isOpened: boolean
}

const useAutocomplete = () => {
  const abortController = useRef<AbortController>()

  const [autocomplete, setAutocomplete] = useState<AutocompleteState>({ data: undefined, isOpened: false })

  const fetch = useCallback(
    throttle(async (value: string) => {
      try {
        const { data } = await axios.get<Indicator[]>('/api/autocomplete?query=' + value, {
          signal: abortController.current?.signal,
        })

        setAutocomplete({ data, isOpened: true })
      } catch (e) {}
    }, 750),
    []
  )

  return { autocomplete, fetch, setAutocomplete, abortController } as const
}

export default useAutocomplete
