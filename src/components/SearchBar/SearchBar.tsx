'use client'

import { ChangeEvent, FC, FormEvent, useCallback, useRef, useState } from 'react'
import Button from '@/ui/Button/Button'
import axios from 'axios'
import { Indicator } from '@/types'
import Link from 'next/link'
import useOutsideClick from '@/hooks/useOutsideClick'
import IconButton from '@/ui/IconButton/IconButton'
import { useRouter, useSearchParams } from 'next/navigation'
import throttle from '@/utils/throttle'

interface AutocompleteState {
  data: Indicator[] | undefined
  isOpened: boolean
}

const SearchBar: FC = () => {
  const containerEl = useRef<HTMLDivElement>(null)

  const router = useRouter()

  const searchParams = useSearchParams()

  const [value, setValue] = useState<string>(searchParams.get('query') || '')

  const [autocomplete, setAutocomplete] = useState<AutocompleteState>({ data: undefined, isOpened: false })

  const navigate = (v: string = value) => {
    router.push(`/search?query=${v}`)

    setAutocomplete((prev) => ({ ...prev, isOpened: false }))
  }

  const fetchAutocomplete = useCallback(
    throttle(async (value: string) => {
      console.log('ahahaha')
      setAutocomplete((prev) => ({ ...prev, isOpened: true }))

      const { data } = await axios.get<Indicator[]>('/api/autocomplete?query=' + value)

      setAutocomplete((prev) => ({ ...prev, data }))
    }, 1000),
    []
  )

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)

    const query = e.target.value.trim()

    if (!query) {
      setAutocomplete({ isOpened: false, data: undefined })
    } else {
      fetchAutocomplete(query)
    }
  }

  const clearValue = () => {
    setValue('')
    setAutocomplete({ isOpened: false, data: undefined })
  }

  const handleInputClick = () => {
    setAutocomplete((prev) => ({ ...prev, isOpened: true }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    navigate()
  }

  useOutsideClick(() => {
    setAutocomplete((prev) => ({ ...prev, isOpened: false }))
  }, containerEl)

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-1.5 md:gap-2.5 items-center" ref={containerEl}>
        <div className="relative flex-1 z-20">
          <div
            className={`border ${autocomplete.isOpened && autocomplete.data?.length ? 'rounded-t-lg' : 'rounded-lg'}`}
          >
            <div className="flex bg-white overflow-hidden rounded-lg">
              <span className="text-neutral-400 h-10 w-10 flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </span>
              <input
                name="query"
                value={value}
                placeholder="Search..."
                autoComplete="off"
                className="h-10 flex-1 outline-none text-sm text-neutral-800"
                onInput={handleInput}
                onClick={handleInputClick}
              />
              {value && (
                <button
                  className="text-neutral-400 h-10 w-10 flex justify-center items-center"
                  aria-label="Clear Form"
                  type="button"
                  onClick={clearValue}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
          {autocomplete.isOpened && !!autocomplete.data?.length && (
            <div
              className="absolute w-full left-0 top-[calc(100%-1px)] rounded-b-lg bg-white border"
              onClick={() => setAutocomplete((prev) => ({ ...prev, isOpened: false }))}
            >
              <ul>
                {autocomplete.data?.map((item) => (
                  <li className="border-b last:border-none hover:bg-neutral-100 transition-colors" key={item.id}>
                    <Link href={`/indicator/${item.id}`} className="block px-4 py-2 w-full text-sm">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <Button type="submit" className="hidden md:flex">
          Search
        </Button>
        <IconButton type="submit" className="md:hidden" aria-label="Search">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </IconButton>
      </div>
    </form>
  )
}

export default SearchBar
