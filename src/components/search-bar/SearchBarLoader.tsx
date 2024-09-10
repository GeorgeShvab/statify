import Button from "@/ui/button/Button"
import IconButton from "@/ui/icon-button/IconButton"
import SearchIcon from "@/ui/bicons/SearchIcon"
import { FC } from "react"

interface Props {
  placeholder?: string
}

const SearchBarLoader: FC<Props> = ({ placeholder }) => {
  return (
    <form>
      <div className="flex gap-1.5 md:gap-2.5 items-center">
        <div className="relative flex-1 z-20">
          <div className="border rounded-lg">
            <div className="flex bg-white overflow-hidden rounded-lg">
              <span
                className="text-neutral-400 h-10 w-10 flex justify-center items-center"
                aria-hidden
              >
                <SearchIcon className="w-4 h-4" />
              </span>
              <input
                name="query"
                value=""
                placeholder={placeholder || "Search..."}
                autoComplete="off"
                className="h-10 flex-1 outline-none text-sm text-neutral-800"
              />
            </div>
          </div>
        </div>
        <Button type="submit" className="hidden md:flex">
          Search
        </Button>
        <IconButton type="submit" className="md:hidden" aria-label="Search">
          <SearchIcon className="w-5 h-5" />
        </IconButton>
      </div>
    </form>
  )
}

export default SearchBarLoader
