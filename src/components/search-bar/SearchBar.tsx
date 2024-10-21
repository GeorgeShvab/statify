"use client"

import { ChangeEvent, FC, FormEvent, useRef, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import Button from "@/ui/button/Button"
import IconButton from "@/ui/icon-button/IconButton"
import ResetIcon from "@/ui/icons/ResetIcon"
import SearchIcon from "@/ui/icons/SearchIcon"
import DetectOutsideClick from "@/components/detect-outside-click/DetectOutsideClick"
import useDebounce from "@/hooks/use-debounce/useDebounce"
import useQuery from "@/hooks/use-query/useQuery"
import { getSearchAutocomplete } from "@/api/public"

interface Props {
  placeholder?: string
}

const SearchBar: FC<Props> = ({ placeholder }) => {
  const containerEl = useRef<HTMLDivElement>(null)

  const [isAutoCompleteOpen, setIsAutocompleteOpen] = useState(false)

  const router = useRouter()

  const searchParams = useSearchParams()

  const initialValue = searchParams.get("query") || ""

  const [value, setValue] = useState(initialValue)

  const [debouncedValue, setDebouncedValue] = useState("")

  const { data, setData } = useQuery(
    (signal) => getSearchAutocomplete(debouncedValue, signal),
    {
      fetchOnMount: false,
      deps: [debouncedValue],
      onSuccess: () => setIsAutocompleteOpen(true),
    }
  )

  const navigate = (v: string = value) => {
    router.push(`/search?query=${v}`)

    setIsAutocompleteOpen(false)
  }

  const debouncedRefetch = useDebounce(
    (value: string) => setDebouncedValue(value),
    350
  )

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)

    const query = e.target.value.trim()

    if (!query) {
      setIsAutocompleteOpen(false)
      setData([])
    } else {
      debouncedRefetch(query)
    }
  }

  const clearValue = () => {
    setValue("")
    setIsAutocompleteOpen(false)
  }

  const handleInputClick = () => setIsAutocompleteOpen(true)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    navigate()
  }

  const handleOutsideClick = () => setIsAutocompleteOpen(false)

  const showAutocomplete = isAutoCompleteOpen && Boolean(data?.length) && value

  return (
    <DetectOutsideClick onOutsideClick={handleOutsideClick} isAbsolute={false}>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-1.5 md:gap-2.5 items-center" ref={containerEl}>
          <div className="relative flex-1 z-20">
            <div
              className={`border ${
                showAutocomplete ? "rounded-t-lg" : "rounded-lg"
              }`}
            >
              <div
                className={`flex bg-white overflow-hidden  ${
                  showAutocomplete ? "rounded-t-lg" : "rounded-lg"
                }`}
              >
                <span
                  className="text-neutral-400 h-10 w-10 flex justify-center items-center"
                  aria-hidden
                >
                  <SearchIcon className="w-4 h-4" />
                </span>
                <input
                  name="query"
                  value={value}
                  placeholder={placeholder || "Search..."}
                  autoComplete="off"
                  className="h-10 flex-1 outline-none text-sm text-neutral-800"
                  onChange={handleInput}
                  onClick={handleInputClick}
                />
                {value && (
                  <button
                    className="text-neutral-400 h-10 w-10 flex justify-center items-center hover:text-neutral-500 transition-colors"
                    aria-label="Clear Form"
                    type="button"
                    onClick={clearValue}
                  >
                    <ResetIcon className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
            {showAutocomplete && (
              <div
                className="absolute w-full left-0 top-[calc(100%-1px)] rounded-b-lg bg-white border"
                onClick={() => setIsAutocompleteOpen(false)}
              >
                <ul>
                  {data?.map((item) => (
                    <li
                      className="border-b last:border-none hover:bg-neutral-100 transition-colors"
                      key={item.id}
                    >
                      <Link
                        href={`/indicator/${item.id}${
                          item.countryId ? "/" + item.countryId : ""
                        }`}
                        className="block px-4 py-2 w-full text-sm"
                      >
                        {item.countryId ? item.countryName + " - " : ""}
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <Button type="submit" className="!hidden md:!flex">
            Search
          </Button>
          <IconButton type="submit" className="md:!hidden" aria-label="Search">
            <SearchIcon className="w-5 h-5" />
          </IconButton>
        </div>
      </form>
    </DetectOutsideClick>
  )
}

export default SearchBar
