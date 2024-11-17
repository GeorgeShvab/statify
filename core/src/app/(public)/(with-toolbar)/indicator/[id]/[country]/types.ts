import { PageProps } from "@/types/general.types"

interface SearchParams {
  id: string
  country: string
}

export type IndicatorCountryPageProps = PageProps<SearchParams>
