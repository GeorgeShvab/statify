"use client"

import { ChangeEvent, FC, FormEvent, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Button from "@/ui/button/Button"
import IconButton from "@/ui/icon-button/IconButton"
import ResetIcon from "@/ui/icons/ResetIcon"
import SearchIcon from "@/ui/icons/SearchIcon"
import DetectOutsideClick from "@/components/detect-outside-click/DetectOutsideClick"
import SearchbarAutocompleteItem from "@/components/searchbar/components/searchbar-autocomplete-item/SearchbarAutocompleteItem"
import { SearchBarProps } from "@/components/searchbar/types"
import useDebounce from "@/hooks/use-debounce/useDebounce"
import useQuery from "@/hooks/use-query/useQuery"
import cn from "@/utils/cn/cn"
import { getSearchAutocomplete } from "@/api/public"
import "@/components/searchbar/styles.scss"

const SearchBar: FC<SearchBarProps> = ({ placeholder }) => {
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

  const autocomplete = showAutocomplete && (
    <div
      className="searchbar__autocomplete"
      onClick={() => setIsAutocompleteOpen(false)}
    >
      <ul>
        {data?.map((item) => (
          <SearchbarAutocompleteItem key={item.id} {...item} />
        ))}
      </ul>
    </div>
  )

  const clearValueButton = value && (
    <IconButton
      variant="text"
      className="searchbar__clear-button"
      aria-label="Clear Form"
      type="button"
      onClick={clearValue}
    >
      <ResetIcon />
    </IconButton>
  )

  return (
    <DetectOutsideClick onOutsideClick={handleOutsideClick} isAbsolute={false}>
      <form onSubmit={handleSubmit}>
        <div
          className={cn("searchbar", showAutocomplete && "show-autocomplete")}
          ref={containerEl}
        >
          <div className="searchbar__container">
            <div className="searchbar__input-container">
              <span className="searchbar__search-icon">
                <SearchIcon />
              </span>
              <input
                name="query"
                value={value}
                placeholder={placeholder || "Search..."}
                autoComplete="off"
                className="searchbar__input"
                onChange={handleInput}
                onClick={handleInputClick}
              />
              {clearValueButton}
            </div>
            {autocomplete}
          </div>
          <Button type="submit" className="searchbar__button desktop">
            Search
          </Button>
          <IconButton
            type="submit"
            className="searchbar__button mobile"
            aria-label="Search"
          >
            <SearchIcon />
          </IconButton>
        </div>
      </form>
    </DetectOutsideClick>
  )
}

export default SearchBar
