import { FC } from "react"
import { cookies } from "next/headers"
import { BookmarksPageProps } from "@/app/(public)/(with-toolbar)/bookmarks/types"
import BookmarkService from "@/services/bookmark-service/BookmarkService"
import BookmarkIcon from "@/ui/icons/BookmarkIcon"
import IndicatorsListView from "@/containers/indicators-list-view/IndicatorsListView"
import InfoView from "@/containers/info-view/InfoView"
import validatePositiveNumber from "@/utils/validate-positive-number/validatePositiveNumber"

export { default as metadata } from "@/app/(public)/(with-toolbar)/bookmarks/metadata"

const defaultData = {}

const Bookmarks: FC<BookmarksPageProps> = async ({ searchParams }) => {
  const client = cookies().get("client_id")?.value

  const page = validatePositiveNumber(searchParams.page, 0)

  const dbOptimizedPage = page > 0 ? page - 1 : 0

  const data = client
    ? await BookmarkService.getByUser({ client, page: dbOptimizedPage })
    : null

  return (
    <IndicatorsListView
      data={data?.data}
      text="Your Bookmarks"
      pages={data?.pages}
      page={page + 1}
      fallback={
        <InfoView icon={<BookmarkIcon />} text={"You have no bookmarks yet"} />
      }
    />
  )
}

export default Bookmarks
