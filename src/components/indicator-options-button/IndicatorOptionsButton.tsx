"use client"

import IconButton from "@/ui/icon-button/IconButton"
import { FC, useRef, useState } from "react"
import BookmarkButton from "@/components/bookmark-button/BookmarkButton"
import DropdownItem from "@/ui/dropdown/DropdownItem"
import Dropdown from "@/ui/dropdown/Dropdown"
import VerticalMoreIcon from "@/ui/icons/VerticalMoreIcon"
import CsvFileIcon from "@/ui/icons/CsvFileIcon"
import XlsxFileIcon from "@/ui/icons/XlsxFileIcon"

interface Props {
  countryId?: string
  indicatorId: string
}

const IndicatorOptionsButton: FC<Props> = (props) => {
  const anchor = useRef<HTMLButtonElement>(null)

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)

  const handleCloseOptions = () => setIsDropdownOpen(false)

  const handleToggleOptions = () => setIsDropdownOpen((prev) => !prev)

  return (
    <>
      <IconButton
        className="absolute right-2 top-2.5 md:right-5 md:top-4 !bg-transparent !text-black transition-all"
        onClick={handleToggleOptions}
        ref={anchor}
        aria-label="Open options"
      >
        <VerticalMoreIcon />
      </IconButton>
      <Dropdown
        anchor={anchor}
        isOpen={isDropdownOpen}
        onClose={handleCloseOptions}
        renderHidden
      >
        <BookmarkButton {...props} />
        <DropdownItem
          containerEl="a"
          containerProps={{
            href: `/api/download/${props.indicatorId}${
              props.countryId ? `/${props.countryId}` : ""
            }?format=csv`,
            download: true,
          }}
          icon={<CsvFileIcon className="w-5 h-5 transition-all" />}
        >
          Download as CSV
        </DropdownItem>
        <DropdownItem
          containerEl="a"
          containerProps={{
            href: `/api/download/${props.indicatorId}${
              props.countryId ? `/${props.countryId}` : ""
            }?format=xlsx`,
            download: true,
          }}
          icon={<XlsxFileIcon className="w-5 h-5 transition-all" />}
        >
          Download as XLSX
        </DropdownItem>
      </Dropdown>
    </>
  )
}

export default IndicatorOptionsButton
