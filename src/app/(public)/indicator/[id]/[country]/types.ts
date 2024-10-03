import { PageProps } from "@/types/types"

interface SearchParams {
  id: string
  country: string
}

export type IndicatorCountryPageProps = PageProps<SearchParams>
