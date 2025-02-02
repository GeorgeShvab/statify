"use client"

import { FC, useRef, useState } from "react"
import Dropdown from "@/ui/dropdown/Dropdown"
import DropdownItem from "@/ui/dropdown/components/dropdown-item/DropdownItem"
import IconButton from "@/ui/icon-button/IconButton"
import BookmarkIcon from "@/ui/icons/BookmarkIcon"
import BookmarkedIcon from "@/ui/icons/BookmarkedIcon"
import CsvFileIcon from "@/ui/icons/CsvFileIcon"
import VerticalMoreIcon from "@/ui/icons/VerticalMoreIcon"
import XlsxFileIcon from "@/ui/icons/XlsxFileIcon"
import { IndicatorOptionsProps } from "@/components/indicator-options-button/types"
import useBookmark from "@/hooks/use-get-bookmark/useBookmark"
import getDatasetDonwloadLink from "@/utils/get-dataset-donwload-link/getDatasetDownloadLink"
import translate from "@/modules/i18n"
import "@/components/indicator-options-button/styles.scss"

const IndicatorOptionsButton: FC<IndicatorOptionsProps> = ({
  indicatorId,
  countryId,
}) => {
  const anchor = useRef<HTMLButtonElement>(null)

  const { handleBookmark, isBookmarked } = useBookmark(indicatorId, countryId)

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)

  const handleCloseOptions = () => setIsDropdownOpen(false)

  const handleToggleOptions = () => setIsDropdownOpen((prev) => !prev)

  const bookmarkIcon = isBookmarked ? <BookmarkedIcon /> : <BookmarkIcon />

  return (
    <>
      <IconButton
        className="indicator-options__button"
        onClick={handleToggleOptions}
        color="light"
        ref={anchor}
        data-testid="indicator-actions-button"
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
          {translate(
            isBookmarked
              ? "pages.indicator.unbookmark"
              : "pages.indicator.bookmark"
          )}
        </DropdownItem>
        <DropdownItem className="indicator-options__dropdown-item" size="small">
          <a
            className="indicator-options__dropdown-item-link dropdown__item start-icon"
            href={getDatasetDonwloadLink({
              indicatorId,
              countryId,
              extension: "csv",
            })}
            download="true"
          >
            <CsvFileIcon />
            <span>{translate("pages.indicator.download_csv")}</span>
          </a>
        </DropdownItem>
        <DropdownItem className="indicator-options__dropdown-item" size="small">
          <a
            className="indicator-options__dropdown-item-link dropdown__item start-icon"
            href={getDatasetDonwloadLink({
              indicatorId,
              countryId,
              extension: "xlsx",
            })}
            download="true"
          >
            <XlsxFileIcon />
            <span>{translate("pages.indicator.download_xlsx")}</span>
          </a>
        </DropdownItem>
      </Dropdown>
    </>
  )
}

export default IndicatorOptionsButton
