"use client"

import IconButton from "@/ui/icon-button/IconButton"
import { FC, useRef, useState } from "react"
import VerticalMoreIcon from "@/ui/icons/VerticalMoreIcon"
import CsvFileIcon from "@/ui/icons/CsvFileIcon"
import XlsxFileIcon from "@/ui/icons/XlsxFileIcon"
import Dropdown from "@/ui/dropdown/Dropdown"
import DropdownItem from "@/ui/dropdown/DropdownItem"
import "@/components/indicator-options-button/styles.scss"
import BookmarkedIcon from "@/ui/icons/BookmarkedIcon"
import BookmarkIcon from "@/ui/icons/BookmarkIcon"
import useBookmark from "@/hooks/use-get-bookmark/useBookmark"
import getDatasetDonwloadLink from "@/utils/get-dataset-donwload-link/getDatasetDownloadLink"

interface Props {
  countryId?: string
  indicatorId: string
}

const IndicatorOptionsButton: FC<Props> = ({ indicatorId, countryId }) => {
  const anchor = useRef<HTMLButtonElement>(null)

  const { handleBookmark, isBookmarked } = useBookmark(indicatorId, countryId)

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)

  const handleCloseOptions = () => setIsDropdownOpen(false)

  const handleToggleOptions = () => setIsDropdownOpen((prev) => !prev)

  const bookmarkIcon = isBookmarked ? (
    <BookmarkedIcon className="w-5 h-5 transition-all" />
  ) : (
    <BookmarkIcon className="w-5 h-5 transition-all" />
  )

  return (
    <>
      <IconButton
        className="absolute right-2 top-2.5 md:right-5 md:top-4 !bg-transparent !text-black transition-all"
        onClick={handleToggleOptions}
        color="light"
        ref={anchor}
        aria-label="Open options"
      >
        <VerticalMoreIcon />
      </IconButton>
      <Dropdown
        anchor={anchor}
        position="bottom-end"
        isOpen={isDropdownOpen}
        onClose={handleCloseOptions}
      >
        <DropdownItem
          startIcon={bookmarkIcon}
          size="small"
          onClick={handleBookmark}
        >
          {isBookmarked ? "Unbookmark" : "Bookmark"}
        </DropdownItem>
        <DropdownItem className="indicator-options-dropdown__item" size="small">
          <a
            className="indicator-options-dropdown__item-link dropdown__item start-icon"
            href={getDatasetDonwloadLink({
              indicatorId,
              countryId,
              extension: "csv",
            })}
            download="true"
          >
            <CsvFileIcon />
            <span>Download as CSV</span>
          </a>
        </DropdownItem>
        <DropdownItem className="indicator-options-dropdown__item" size="small">
          <a
            className="indicator-options-dropdown__item-link dropdown__item start-icon"
            href={getDatasetDonwloadLink({
              indicatorId,
              countryId,
              extension: "xlsx",
            })}
            download="true"
          >
            <XlsxFileIcon />
            <span>Download as XLSX</span>
          </a>
        </DropdownItem>
      </Dropdown>
    </>
  )
}

export default IndicatorOptionsButton
