import { FC } from "react"
import { SearchPageProps } from "@/app/(public)/(with-toolbar)/search/types"
import IndicatorService from "@/services/indicator-service/IndicatorService"
import SearchIcon from "@/ui/icons/SearchIcon"
import IndicatorsListView from "@/containers/indicators-list-view/IndicatorsListView"
import InfoView from "@/containers/info-view/InfoView"

export { default as generateMetadata } from "@/app/(public)/(with-toolbar)/search/metadata"

const SearchPage: FC<SearchPageProps> = async ({ searchParams }) => {
  const result = searchParams.query
    ? await IndicatorService.search({
        query: searchParams.query,
        page: searchParams.page ? Number(searchParams.page) : 1,
      })
    : null

  return (
    <IndicatorsListView
      data={result!.data}
      text={result ? `Search results for "${searchParams.query}"` : <>&nbsp;</>}
      pages={result!.pages}
      page={result!.page}
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
