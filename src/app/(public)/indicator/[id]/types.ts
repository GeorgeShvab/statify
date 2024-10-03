import { PageProps } from "@/types/types"

interface Params {
  id: string
}

interface SearchParams {
  chart_items: string
}

export type IndicatorPageProps = PageProps<Params, SearchParams>
