"use client"

import { ChangeEvent, FC, FormEvent, useRef, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import Button from "@/ui/button/Button"
import IconButton from "@/ui/icon-button/IconButton"
import ResetIcon from "@/ui/icons/ResetIcon"
import SearchIcon from "@/ui/icons/SearchIcon"
import DetectOutsideClick from "@/components/detect-outside-click/DetectOutsideClick"
import useAutocomplete from "@/components/search-bar/useAutocomplete"

interface Props {
  placeholder?: string
}

const SearchBar: FC<Props> = ({ placeholder }) => {
  const containerEl = useRef<HTMLDivElement>(null)

  const router = useRouter()

  const searchParams = useSearchParams()

  const [value, setValue] = useState<string>(searchParams.get("query") || "")

  const { autocomplete, setAutocomplete, abortController, fetch } =
    useAutocomplete()

  const navigate = (v: string = value) => {
    router.push(`/search?query=${v}`)

    setAutocomplete((prev) => ({ ...prev, isOpened: false }))
  }

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)

    const query = e.target.value.trim()

    if (!query) {
      abortController.current?.abort()
      setAutocomplete({ isOpened: false, data: undefined })
    } else {
      abortController.current?.abort()
      abortController.current = new AbortController()

      fetch(query)
    }
  }

  const clearValue = () => {
    setValue("")
    setAutocomplete({ isOpened: false, data: undefined })
  }

  const handleInputClick = () => {
    setAutocomplete((prev) => ({ ...prev, isOpened: true }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    abortController.current?.abort()

    navigate()
  }

  const handleOutsideClick = () => {
    setAutocomplete((prev) => ({ ...prev, isOpened: false }))
  }

  return (
    <DetectOutsideClick onOutsideClick={handleOutsideClick} isAbsolute={false}>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-1.5 md:gap-2.5 items-center" ref={containerEl}>
          <div className="relative flex-1 z-20">
            <div
              className={`border ${
                autocomplete.isOpened && autocomplete.data?.length
                  ? "rounded-t-lg"
                  : "rounded-lg"
              }`}
            >
              <div
                className={`flex bg-white overflow-hidden  ${
                  autocomplete.isOpened && autocomplete.data?.length
                    ? "rounded-t-lg"
                    : "rounded-lg"
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
            {autocomplete.isOpened && !!autocomplete.data?.length && (
              <div
                className="absolute w-full left-0 top-[calc(100%-1px)] rounded-b-lg bg-white border"
                onClick={() =>
                  setAutocomplete((prev) => ({ ...prev, isOpened: false }))
                }
              >
                <ul>
                  {autocomplete.data?.map((item) => (
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
