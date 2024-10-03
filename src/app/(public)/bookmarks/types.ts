import { PageProps } from "@/types/types"

interface SearchParams {
  page: number
}

export type BookmarksPageProps = PageProps<object, SearchParams>
