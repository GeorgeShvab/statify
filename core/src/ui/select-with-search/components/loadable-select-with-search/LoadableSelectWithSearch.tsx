import { FC } from "react"
import SelectWithSearch from "@/ui/select-with-search/SelectWithSearch"
import { LoadableSelectWithSearchProps } from "@/ui/select-with-search/components/loadable-select-with-search/types"
import SelectWithSearchLoader from "@/ui/select-with-search/components/select-with-search-loader/SelectWithSearchLoader"
import useQuery from "@/hooks/use-query/useQuery"

const LoadableSelectWithSearch: FC<LoadableSelectWithSearchProps> = ({
  apiService,
  ...props
}) => {
  const { data = [], isLoading } = useQuery(apiService, { deps: [] })

  if (isLoading && !data.length) return <SelectWithSearchLoader />

  return <SelectWithSearch options={data} {...props} />
}

export default LoadableSelectWithSearch
