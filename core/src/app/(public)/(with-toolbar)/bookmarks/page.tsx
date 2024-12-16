import { cookies } from "next/headers"
import BookmarkService from "@/services/bookmark-service/BookmarkService"
import BookmarkIcon from "@/ui/icons/BookmarkIcon"
import IndicatorsListView from "@/containers/indicators-list-view/IndicatorsListView"
import InfoView from "@/containers/info-view/InfoView"
import { CommonValidations } from "@/utils/validation-schemas/common"
import pageValidationMiddleware from "@/middlewares/page-validation-middleware/pageValidationMiddleware"

export { default as metadata } from "@/app/(public)/(with-toolbar)/bookmarks/metadata"

const Bookmarks = pageValidationMiddleware(async ({ searchParams }) => {
  const client = cookies().get("client_id")?.value

  const data = client
    ? await BookmarkService.getByUser({ client, page: searchParams.page })
    : null

  return (
    <IndicatorsListView
      data={data?.data}
      text="Your Bookmarks"
      pages={data?.pages}
      page={data?.page}
      fallback={
        <InfoView icon={<BookmarkIcon />} text={"You have no bookmarks yet"} />
      }
    />
  )
}, CommonValidations.pageableSchema)
export default Bookmarks
