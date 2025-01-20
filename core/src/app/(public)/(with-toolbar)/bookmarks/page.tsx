import { cookies } from "next/headers"
import BookmarkService from "@/services/bookmark-service/BookmarkService"
import BookmarkIcon from "@/ui/icons/BookmarkIcon"
import IndicatorsListView from "@/containers/indicators-list-view/IndicatorsListView"
import InfoView from "@/containers/info-view/InfoView"
import { CommonValidations } from "@/utils/validation-schemas/common"
import pageValidationMiddleware from "@/middlewares/page-validation-middleware/pageValidationMiddleware"
import translate from "@/modules/i18n"

export { default as metadata } from "@/app/(public)/(with-toolbar)/bookmarks/metadata"

const Bookmarks = pageValidationMiddleware(async ({ searchParams }) => {
  const client = cookies().get("client_id")?.value

  const data = client
    ? await BookmarkService.getByUser({ client, page: searchParams.page })
    : null

  return (
    <IndicatorsListView
      data={data?.data}
      text={translate("pages.bookmarks.heading")}
      pages={data?.pages}
      page={data?.page}
      fallback={
        <InfoView
          icon={<BookmarkIcon />}
          text={translate("pages.bookmarks.empty_fallback")}
        />
      }
    />
  )
}, CommonValidations.pageableSchema)
export default Bookmarks
