import IndicatorService from "@/services/indicator-service/IndicatorService"
import SearchIcon from "@/ui/icons/SearchIcon"
import IndicatorsListView from "@/containers/indicators-list-view/IndicatorsListView"
import InfoView from "@/containers/info-view/InfoView"
import { CommonValidations } from "@/utils/validation-schemas/common"
import pageValidationMiddleware from "@/middlewares/page-validation-middleware/pageValidationMiddleware"
import translate from "@/modules/i18n"

export { default as generateMetadata } from "@/app/(public)/(with-toolbar)/search/metadata"

const SearchPage = pageValidationMiddleware(async ({ searchParams }) => {
  const page = searchParams.page
  const query = searchParams.query

  const result = query
    ? await IndicatorService.search({
        query: query,
        page: page,
      })
    : null

  const heading =
    result && query ? (
      translate("pages.search.heading", { value: query })
    ) : (
      <>&nbsp;</>
    )

  return (
    <IndicatorsListView
      data={result?.data}
      text={heading}
      pages={result?.pages}
      page={result?.page}
      fallback={
        <InfoView
          icon={<SearchIcon />}
          text={translate(
            result === null
              ? "pages.search.no_query"
              : "pages.search.no_results"
          )}
        />
      }
    />
  )
}, CommonValidations.pageableSearchSchema)

export default SearchPage
