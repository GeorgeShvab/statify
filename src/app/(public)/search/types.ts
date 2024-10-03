import { PageProps } from "@/types/types"

interface SearchPageSearchParams {
  query: string
  topic?: string
  page?: string
}

export type SearchPageProps = PageProps<object, SearchPageSearchParams>
