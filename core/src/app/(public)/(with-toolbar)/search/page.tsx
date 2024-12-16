import IndicatorService from "@/services/indicator-service/IndicatorService"
import SearchIcon from "@/ui/icons/SearchIcon"
import IndicatorsListView from "@/containers/indicators-list-view/IndicatorsListView"
import InfoView from "@/containers/info-view/InfoView"
import { CommonValidations } from "@/utils/validation-schemas/common"
import pageValidationMiddleware from "@/middlewares/page-validation-middleware/pageValidationMiddleware"

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

  return (
    <IndicatorsListView
      data={result?.data}
      text={result ? `Search results for "${query}"` : <>&nbsp;</>}
      pages={result?.pages}
      page={result?.page}
      fallback={
        <InfoView
          icon={<SearchIcon />}
          text={
            result === null ? "Enter a keyword or phrase" : "No datasets found"
          }
        />
      }
    />
  )
}, CommonValidations.pageableSearchSchema)

export default SearchPage
