'use client'

import { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from 'react'
import Button from '@/ui/Button/Button'
import axios from 'axios'
import { Indicator, Topic } from '@/types'
import Link from 'next/link'
import useOutsideClick from '@/hooks/useOutsideClick'
import IconButton from '@/ui/IconButton/IconButton'
import { useRouter, useSearchParams } from 'next/navigation'
import Dropdown from '@/ui/Dropdown/Dropdown'

interface AutocompleteState {
  data: Indicator[] | undefined
  isOpened: boolean
}

const topics = [
  {
    id: '1',
    value: 'All Topics',
  },
  {
    id: '11',
    value: 'Poverty ',
  },
  {
    id: '4',
    value: 'Education ',
  },
  {
    id: '10',
    value: 'Social Protection & Labor',
  },
  {
    id: '3',
    value: 'Economy & Growth',
  },
  {
    id: '1',
    value: 'Agriculture & Rural Development  ',
  },
  {
    id: '19',
    value: 'Climate Change',
  },
  {
    id: '6',
    value: 'Environment ',
  },
  {
    id: '16',
    value: 'Urban Development ',
  },
  {
    id: '12',
    value: 'Private Sector',
  },
  {
    id: '21',
    value: 'Trade',
  },
  {
    id: '14',
    value: 'Science & Technology ',
  },
  {
    id: '20',
    value: 'External Debt',
  },
  {
    id: '7',
    value: 'Financial Sector ',
  },
  {
    id: '2',
    value: 'Aid Effectiveness ',
  },
  {
    id: '9',
    value: 'Infrastructure ',
  },
  {
    id: '13',
    value: 'Public Sector ',
  },
  {
    id: '18',
    value: 'Millenium development goals',
  },
  {
    id: '5',
    value: 'Energy & Mining ',
  },
  {
    id: '17',
    value: 'Gender',
  },
]

const SearchBar: FC = () => {
  const containerEl = useRef<HTMLDivElement>(null)

  const router = useRouter()

  const searchParams = useSearchParams()

  const [value, setValue] = useState<string>(searchParams.get('query') || '')

  const [autocomplete, setAutocomplete] = useState<AutocompleteState>({ data: undefined, isOpened: false })

  const [topic, setTopic] = useState<string>(searchParams.get('topic') || 'All Topics')

  const navigate = (v: string = value, t: string = topic) => {
    router.push(`/search?query=${v}&topic=${t}`)

    setAutocomplete((prev) => ({ ...prev, isOpened: false }))
  }

  const handleSelectTopic = (topic: string) => {
    setTopic(topic)

    value && navigate(value, topic)
  }

  const fetchAutocomplete = async (value: string) => {
    const { data } = await axios.get<Indicator[]>('/api/autocomplete?query=' + value)

    setAutocomplete({ isOpened: true, data })
  }

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
    if (autocomplete.data?.length) {
      setAutocomplete((prev) => ({ ...prev, isOpened: true }))
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    navigate()
  }

  useOutsideClick(() => setAutocomplete((prev) => ({ ...prev, isOpened: false })), containerEl)

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-1.5 md:gap-2.5 items-center" ref={containerEl}>
        <div className="relative flex-1 z-10">
          <div className={`border ${autocomplete.isOpened ? 'rounded-t-lg' : 'rounded-lg'}`}>
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
        <Dropdown data={topics.map((item) => item.value.trim())} onSelect={handleSelectTopic} selected={topic}>
          <div>
            <Button type="button" className={`gap-2 pr-3.5 hidden md:flex`}>
              <span>{topic}</span>
              <span>
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
                    d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                  />
                </svg>
              </span>
            </Button>
            <IconButton className="flex md:hidden" type="button" aria-label="Select Topic">
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
                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </IconButton>
          </div>
        </Dropdown>
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
