import { PageProps } from "@/types/general.types"

interface SearchParams {
  page: number
}

export type BookmarksPageProps = PageProps<object, SearchParams>
