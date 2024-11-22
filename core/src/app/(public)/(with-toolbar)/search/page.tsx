import { FC } from "react"
import { SearchPageProps } from "@/app/(public)/(with-toolbar)/search/types"
import IndicatorService from "@/services/indicator-service/IndicatorService"
import SearchIcon from "@/ui/icons/SearchIcon"
import IndicatorsListView from "@/containers/indicators-list-view/IndicatorsListView"
import InfoView from "@/containers/info-view/InfoView"
import replaceSpecialCharacters from "@/utils/replace-special-characters/replaceSpecialCharacters"
import validatePositiveNumber from "@/utils/validate-positive-number/validatePositiveNumber"

export { default as generateMetadata } from "@/app/(public)/(with-toolbar)/search/metadata"

const SearchPage: FC<SearchPageProps> = async ({ searchParams }) => {
  const page = searchParams.page
  const query = searchParams.query

  const result = query
    ? await IndicatorService.search({
        query: replaceSpecialCharacters(query),
        page: validatePositiveNumber(page, 1),
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
}

export default SearchPage
