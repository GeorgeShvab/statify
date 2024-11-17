"use client"

import { FC } from "react"
import { useSearchParams } from "next/navigation"
import IconButton from "@/ui/icon-button/IconButton"
import LeftChevronIcon from "@/ui/icons/LeftChevronIcon"
import RightChevronIcon from "@/ui/icons/RightChevronIcon"
import { PaginationProps } from "@/components/pagination/types"
import getPagesArray from "@/components/pagination/utils/get-pages-array/getPagesArray"
import cn from "@/utils/cn/cn"
import "@/components/pagination/styles.scss"

const Pagination: FC<PaginationProps> = ({ page, pages }) => {
  const searchParams = useSearchParams()

  const displayedPages = getPagesArray(page, pages)

  const showStartNavigation = displayedPages[0] != 1
  const showEndNavigation = displayedPages[displayedPages.length - 1] != pages

  const startNavigation = showStartNavigation && (
    <>
      <IconButton
        className="pagination__item pagination__item-edge"
        color="light"
        href={makeUrl(searchParams.toString(), 1)}
      >
        1
      </IconButton>
      <IconButton
        className="pagination__item pagination__item-rest"
        color="light"
      >
        ...
      </IconButton>
    </>
  )

  const endNavigation = showEndNavigation && (
    <>
      <IconButton
        className="pagination__item pagination__item-rest"
        color="light"
      >
        ...
      </IconButton>
      <IconButton
        className="pagination__item pagination__item-edge"
        color="light"
        href={makeUrl(searchParams.toString(), pages)}
      >
        {pages}
      </IconButton>
    </>
  )

  return (
    <div className="pagination">
      <div className="pagination__container">
        <IconButton
          className={cn("pagination__item", page === 1 && "disabled")}
          color="light"
          href={makeUrl(searchParams.toString(), page - 1)}
        >
          <LeftChevronIcon />
        </IconButton>

        {startNavigation}

        {displayedPages.map((item) => (
          <IconButton
            key={item}
            href={makeUrl(searchParams.toString(), item)}
            className={cn("pagination__item", item === page && "active")}
            color="light"
          >
            {item}
          </IconButton>
        ))}

        {endNavigation}

        <IconButton
          className={cn("pagination__item", page === pages && "disabled")}
          color="light"
          href={makeUrl(searchParams.toString(), page + 1)}
        >
          <RightChevronIcon />
        </IconButton>
      </div>
    </div>
  )
}

function makeUrl(params: string, page: number): string {
  const searchParams = new URLSearchParams(params)

  searchParams.set("page", String(page))

  return "?" + searchParams.toString()
}

export default Pagination
