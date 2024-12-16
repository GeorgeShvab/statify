import { PageProps } from "@/types/general.types"

interface SearchPageSearchParams {
  query: string
  page: string
}

export type SearchPageProps = PageProps<
  Record<string, string>,
  SearchPageSearchParams
>
