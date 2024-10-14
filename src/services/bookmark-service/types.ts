import { Bookmark, Indicator } from "@prisma/client"
import { PageableParams, PageableResult } from "@/types/types"

export type BookmarkActionParams = Pick<
  Bookmark,
  "countryId" | "indicatorId" | "client"
>

export interface GetBookmarsByUserParams extends PageableParams {
  client: string
}

export type GetByUserResult = PageableResult<
  (Pick<Indicator, "id" | "label" | "description" | "source"> & {
    countryName?: string
    countryId?: string
  })[]
>

export interface BookmarkServiceInterface {
  createOne: (params: BookmarkActionParams) => Promise<Bookmark>
  deleteOne: (id: number) => Promise<void>
  getByUser: (params: GetBookmarsByUserParams) => Promise<GetByUserResult>
  getOne: (params: BookmarkActionParams) => Promise<Bookmark | null>
}
